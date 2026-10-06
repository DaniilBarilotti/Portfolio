import json
import tempfile
import threading
import unittest
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen
from http.server import ThreadingHTTPServer
from server import TicketStore, make_handler

class APITests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.path = Path(self.temp.name) / 'test.sqlite3'
        self.store = TicketStore(self.path)
        self.server = ThreadingHTTPServer(('127.0.0.1', 0), make_handler(self.store))
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.url = f'http://127.0.0.1:{self.server.server_port}'
    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()
        self.temp.cleanup()
    def request(self, path='/api/tickets', method='GET', data=None):
        req = Request(self.url + path, data=json.dumps(data).encode() if data is not None else None,
                      headers={'Content-Type': 'application/json'}, method=method)
        try:
            response = urlopen(req)
        except HTTPError as error:
            response = error
        with response:
            return response.status, json.loads(response.read())
    def create(self, **extra):
        return self.request(method='POST', data={'title': 'Display flickers', 'requester': 'Operations', **extra})
    def test_create_and_persistence(self):
        code, ticket = self.create(priority='high')
        self.assertEqual(code, 201)
        self.assertEqual(ticket['status'], 'open')
        self.assertEqual(TicketStore(self.path).get(ticket['id'])['title'], 'Display flickers')
        self.assertEqual(self.request('/api/stats')[1]['high_priority'], 1)
    def test_validation_blocks_bad_or_unknown_fields(self):
        for data in [{'title': '', 'requester': 'A'}, {'title': 'A', 'requester': 'B', 'priority': 'urgent'},
                     {'title': 'A', 'requester': 'B', 'id': 9}, ['not an object']]:
            with self.subTest(data=data):
                code, response = self.request(method='POST', data=data)
                self.assertEqual(code, 400)
                self.assertIn('error', response)
        self.assertEqual(self.store.list(), [])
    def test_partial_update_keeps_other_fields(self):
        _, ticket = self.create(priority='high')
        code, updated = self.request('/api/tickets/' + str(ticket['id']), 'PATCH', {'status': 'resolved'})
        self.assertEqual(code, 200)
        self.assertEqual(updated['title'], ticket['title'])
        self.assertEqual(updated['status'], 'resolved')
        self.assertEqual(self.request('/api/stats')[1]['high_priority'], 0)
    def test_missing_ticket_get_update_delete(self):
        for method, data in [('GET', None), ('PATCH', {'title': 'Changed'}), ('DELETE', None)]:
            with self.subTest(method=method):
                code, response = self.request('/api/tickets/999', method, data)
                self.assertEqual(code, 404)
                self.assertIn('error', response)
    def test_rejects_external_host_and_origin(self):
        for headers in [{'Host': 'untrusted.example'}, {'Origin': 'https://untrusted.example', 'Content-Type': 'application/json'}]:
            req = Request(self.url + '/api/tickets', data=b'{"title":"A","requester":"B"}', headers=headers, method='POST')
            with self.assertRaises(HTTPError) as caught:
                urlopen(req)
            self.assertEqual(caught.exception.code, 403)
        self.assertEqual(self.store.list(), [])

    def test_static_files_do_not_expose_database(self):
        with self.assertRaises(HTTPError) as caught:
            urlopen(self.url + '/tickets.sqlite3')
        self.assertEqual(caught.exception.code, 404)

    def test_search_filter_and_delete(self):
        _, ticket = self.create(title='CPU 100% load', description='Check cooling')
        self.create(title='Another request', status='resolved')
        self.assertEqual(len(self.request('/api/tickets?q=100%25')[1]), 1)
        self.assertEqual(len(self.request('/api/tickets?status=resolved')[1]), 1)
        self.assertEqual(self.request('/api/tickets?status=invalid')[0], 400)
        self.assertEqual(self.request('/api/tickets/' + str(ticket['id']), 'DELETE')[0], 200)
        self.assertIsNone(self.store.get(ticket['id']))

if __name__ == '__main__':
    unittest.main()
