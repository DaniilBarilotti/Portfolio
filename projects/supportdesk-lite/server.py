"""SupportDesk Lite: a local, single-user ticket tracker."""
import argparse
import json
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).parent
STATUSES = ('open', 'in_progress', 'resolved')
PRIORITIES = ('low', 'normal', 'high')


class TicketStore:
    def __init__(self, path):
        self.path = str(path)
        with self.connection() as db:
            db.execute('''CREATE TABLE IF NOT EXISTS tickets (
                id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL,
                description TEXT NOT NULL, requester TEXT NOT NULL,
                status TEXT NOT NULL, priority TEXT NOT NULL,
                created_at TEXT NOT NULL, updated_at TEXT NOT NULL)''')

    @contextmanager
    def connection(self):
        db = sqlite3.connect(self.path)
        db.row_factory = sqlite3.Row
        try:
            with db:
                yield db
        finally:
            db.close()

    @staticmethod
    def validate(data, partial=False):
        if not isinstance(data, dict):
            raise ValueError('Body must be a JSON object.')
        allowed = {'title', 'description', 'requester', 'status', 'priority'}
        if set(data) - allowed:
            raise ValueError('Unknown ticket field.')
        result = {}
        for field, limit in [('title', 140), ('description', 5000), ('requester', 120)]:
            if field not in data and partial:
                continue
            value = data.get(field, '' if field == 'description' else None)
            if not isinstance(value, str) or len(value.strip()) > limit:
                raise ValueError(f'{field} must be text with at most {limit} characters.')
            if field != 'description' and not value.strip():
                raise ValueError(f'{field} is required.')
            result[field] = value.strip()
        for field, choices, default in [('status', STATUSES, 'open'), ('priority', PRIORITIES, 'normal')]:
            if field not in data and partial:
                continue
            value = data.get(field, default)
            if value not in choices:
                raise ValueError(f'{field} must be one of: {", ".join(choices)}.')
            result[field] = value
        if not result:
            raise ValueError('Provide at least one ticket field.')
        return result

    def list(self, query='', status=''):
        clauses, values = [], []
        if query:
            # Escape LIKE wildcards so search input remains a literal substring.
            term = query.replace('\\', '\\\\').replace('%', '\\%').replace('_', '\\_')
            clauses.append("(title LIKE ? ESCAPE '\\' OR requester LIKE ? ESCAPE '\\' OR description LIKE ? ESCAPE '\\')")
            values.extend([f'%{term}%'] * 3)
        if status:
            if status not in STATUSES:
                raise ValueError('Invalid status filter.')
            clauses.append('status = ?')
            values.append(status)
        sql = 'SELECT * FROM tickets' + (' WHERE ' + ' AND '.join(clauses) if clauses else '') + ' ORDER BY id DESC'
        with self.connection() as db:
            return [dict(row) for row in db.execute(sql, values)]

    def get(self, ticket_id):
        with self.connection() as db:
            row = db.execute('SELECT * FROM tickets WHERE id = ?', (ticket_id,)).fetchone()
            return dict(row) if row else None

    def create(self, data):
        fields = self.validate(data)
        now = datetime.now(timezone.utc).isoformat(timespec='seconds')
        fields.update(created_at=now, updated_at=now)
        with self.connection() as db:
            cur = db.execute(f'INSERT INTO tickets ({", ".join(fields)}) VALUES ({", ".join("?" for _ in fields)})', list(fields.values()))
            ticket_id = cur.lastrowid
        return self.get(ticket_id)

    def update(self, ticket_id, data):
        fields = self.validate(data, partial=True)
        fields['updated_at'] = datetime.now(timezone.utc).isoformat(timespec='seconds')
        with self.connection() as db:
            cur = db.execute(f'UPDATE tickets SET {", ".join(key + " = ?" for key in fields)} WHERE id = ?', [*fields.values(), ticket_id])
            if not cur.rowcount:
                return None
        return self.get(ticket_id)

    def delete(self, ticket_id):
        with self.connection() as db:
            return bool(db.execute('DELETE FROM tickets WHERE id = ?', (ticket_id,)).rowcount)

    def stats(self):
        tickets = self.list()
        return {'total': len(tickets), **{status: sum(t['status'] == status for t in tickets) for status in STATUSES},
                'high_priority': sum(t['priority'] == 'high' and t['status'] != 'resolved' for t in tickets)}


def make_handler(store):
    class Handler(BaseHTTPRequestHandler):
        def reply(self, code, value):
            content = json.dumps(value).encode()
            self.send_response(code)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(content)))
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            self.wfile.write(content)

        def body(self):
            try:
                size = int(self.headers.get('Content-Length', '0'))
            except ValueError:
                raise ValueError('Invalid content length.')
            if size < 1 or size > 20000:
                raise ValueError('JSON body must be between 1 and 20000 bytes.')
            try:
                return json.loads(self.rfile.read(size))
            except (ValueError, UnicodeDecodeError):
                raise ValueError('Invalid JSON body.')

        def dispatch(self):
            url = urlparse(self.path)
            expected_host = f'127.0.0.1:{self.server.server_port}'
            allowed_hosts = {expected_host, f'localhost:{self.server.server_port}'}
            if self.headers.get('Host') not in allowed_hosts:
                return self.reply(403, {'error': 'Only local workspace hosts are allowed.'})
            if self.command in {'POST', 'PATCH', 'DELETE'}:
                origin = self.headers.get('Origin')
                if origin and origin not in {f'http://{host}' for host in allowed_hosts}:
                    return self.reply(403, {'error': 'Cross-origin writes are not allowed.'})
                if self.command in {'POST', 'PATCH'} and self.headers.get('Content-Type', '').split(';')[0].strip() != 'application/json':
                    return self.reply(415, {'error': 'Use application/json.'})
            if url.path.startswith('/api/'):
                try:
                    if url.path == '/api/stats' and self.command == 'GET':
                        return self.reply(200, store.stats())
                    if url.path == '/api/tickets':
                        if self.command == 'GET':
                            query = parse_qs(url.query)
                            return self.reply(200, store.list(query.get('q', [''])[0], query.get('status', [''])[0]))
                        if self.command == 'POST':
                            return self.reply(201, store.create(self.body()))
                    parts = url.path.strip('/').split('/')
                    if len(parts) == 3 and parts[:2] == ['api', 'tickets'] and parts[2].isdigit():
                        ticket_id = int(parts[2])
                        if self.command == 'GET':
                            ticket = store.get(ticket_id)
                        elif self.command == 'PATCH':
                            ticket = store.update(ticket_id, self.body())
                        elif self.command == 'DELETE':
                            deleted = store.delete(ticket_id)
                            return self.reply(200 if deleted else 404, {'message': 'Deleted.'} if deleted else {'error': 'Ticket not found.'})
                        else:
                            return self.reply(405, {'error': 'Method not allowed.'})
                        return self.reply(200 if ticket else 404, ticket if ticket else {'error': 'Ticket not found.'})
                    return self.reply(404, {'error': 'Endpoint not found.'})
                except ValueError as exc:
                    return self.reply(400, {'error': str(exc)})
            if self.command != 'GET':
                return self.reply(405, {'error': 'Method not allowed.'})
            static = {'/': ('index.html', 'text/html'), '/app.js': ('app.js', 'text/javascript'), '/style.css': ('style.css', 'text/css')}
            if url.path not in static:
                return self.reply(404, {'error': 'Not found.'})
            filename, mime = static[url.path]
            content = (ROOT / 'static' / filename).read_bytes()
            self.send_response(200)
            self.send_header('Content-Type', mime + '; charset=utf-8')
            self.send_header('Content-Length', str(len(content)))
            self.send_header('X-Content-Type-Options', 'nosniff')
            self.send_header('Content-Security-Policy', "default-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'")
            self.end_headers()
            self.wfile.write(content)

        do_GET = dispatch
        do_POST = dispatch
        do_PATCH = dispatch
        do_DELETE = dispatch
    return Handler


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8080)
    parser.add_argument('--db', default=str(ROOT / 'tickets.sqlite3'))
    args = parser.parse_args()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), make_handler(TicketStore(args.db)))
    print(f'SupportDesk Lite: http://127.0.0.1:{args.port}', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
