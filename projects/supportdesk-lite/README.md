# SupportDesk Lite

A compact local service desk for tracking hardware and software support requests. A dependency-free Python API, durable SQLite storage, and a responsive browser workspace keep the project small enough to understand end to end.

## Run

Requires Python 3.10+ and a modern browser. No package installation or external API keys needed.

```bash
python server.py
```

Open **http://127.0.0.1:8080**. First launch creates `tickets.sqlite3`. The workspace starts empty; use **New ticket**. Stop the server with Ctrl+C.

```bash
python server.py --port 8090 --db /path/to/my-tickets.sqlite3
python -m unittest -v
```

## Features

- Create, read, edit, and permanently delete tickets.
- Track open, in-progress, and resolved requests with three priorities.
- Search title, requester, and description; combine with a status filter.
- Show workload statistics, including unresolved high-priority requests.
- Persist data across restarts, validate fields on the server, and display useful errors.
- Use native form controls, keyboard focus, modal dialogs, and responsive layouts.

## Architecture

| File | Responsibility |
| --- | --- |
| `server.py` | HTTP routing, validation, SQLite repository, static delivery |
| `static/index.html` | Workspace and ticket editor |
| `static/app.js` | Fetch API, safe rendering, forms, filters, stale-response protection |
| `static/style.css` | Responsive visual system |
| `test_server.py` | API integration tests with a temporary database |
| `INTERVIEW_GUIDE_RU.md` | Questions and explanations for discussing the implementation |

Browser actions call the API; validated fields are written in a SQLite transaction. Each database operation owns a separate connection, avoiding shared-connection threading problems. Queries use bound parameters. User text uses `textContent`, never HTML interpolation. Static files come from an explicit allowlist; database files are not served. Local Host validation and same-origin checks reject external browser writes.

## API

| Method | Route | Behavior |
| --- | --- | --- |
| GET | `/api/tickets?q=display&status=open` | Search and filter |
| POST | `/api/tickets` | Create; title and requester required |
| GET | `/api/tickets/{id}` | Read one request |
| PATCH | `/api/tickets/{id}` | Update selected fields |
| DELETE | `/api/tickets/{id}` | Permanently delete |
| GET | `/api/stats` | Global counts independent of filters |

```json
{"title":"Laptop display flickers","requester":"Operations","description":"Occurs after waking from sleep.","priority":"high","status":"open"}
```

Responses: `201` creation, `200` successful operations, `400` invalid input, `404` missing tickets. Limits: title 140, requester 120, description 5,000 characters; JSON bodies 20 KB.

## Scope and limitations

A **local, single-user portfolio demo**, not a production service. It binds to loopback only and has no authentication, roles, audit history, attachments, notifications, or multi-user conflict detection. Do not expose publicly or store sensitive support data. A larger application would need pagination, SQL aggregate statistics, migrations, and deployment hardening. SQLite LIKE case folding is primarily ASCII.

## Verification

`python -m unittest -v` verifies creation, validation, storage persistence, partial updates, missing records, literal wildcard search, status filtering, statistics, deletion, external hosts/origins, and database exposure. These are behavioral API tests; they do not claim browser or accessibility coverage.

## Portfolio description

> Built a local support-ticket tracker with a Python HTTP API, SQLite persistence, and a responsive JavaScript workspace. Implemented server-side validation, CRUD operations, combined search and filtering, workload statistics, and automated API integration tests.

Use after reviewing the code and being able to explain its behavior. This project does not represent commercial employment or client work.
