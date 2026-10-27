# Notes Review Lab

> ⚠ **Intentionally vulnerable teaching app.** Run it locally only. Never deploy it publicly.
> All users, notes and the "API key" are fictional. The app makes no external calls.

A small SvelteKit (JavaScript) notes app with login and an admin page, containing **four deliberate
security defects** for a hands-on security review exercise. Student instructions are in
[`STUDENT_EXERCISE.md`](STUDENT_EXERCISE.md). The instructor answer key is in
[`INSTRUCTOR_ANSWER_KEY.md`](INSTRUCTOR_ANSWER_KEY.md) — **do not share it with students.**

## Install and run

```sh
npm install
npm run dev        # http://127.0.0.1:5173
```

Requires Node 20+.

## Reset

Click **Reset practice data** in the page header (or `POST /api/reset`). This restores the original
users, notes and the deliberate defects' data. Data is stored **in memory**, so restarting the server
also resets everything. If you fix a defect in code, resetting does not undo your code change.

## Practice accounts

| Account | Password | Role | Notes |
|---|---|---|---|
| `alice@example.test` | `alice123` | User | Note 101: “Alice’s campaign ideas” |
| `bob@example.test` | `bob123` | User | Note 102: “Bob’s interview notes” |
| `admin@example.test` | `admin123` | Admin | Can view the admin page |

These weak passwords are practice credentials only.

## Routes

| Route | Purpose |
|---|---|
| `/login` | Sign in with a practice account |
| `/notes` | List the signed-in user’s notes |
| `/notes/101` | View and edit a note (loads via `GET /api/notes/101`, saves via `PUT`) |
| `/admin` | Admin interface (page restricted to admins) |
| `/hints` | Student hints and terminal (`curl`) instructions (no login needed) |
| `GET /api/notes/:id` | Read a note |
| `PUT /api/notes/:id` | Update a note (JSON `{ "title": "...", "body": "..." }`) |
| `GET /api/admin/users` | User list for the admin page |
| `POST /api/reset` | Reset practice data |

Session is an `httpOnly` cookie named `session`. For the `PUT` request via `curl`, SvelteKit's CSRF
protection requires an `Origin` header matching the app, e.g.:

```sh
curl -X PUT http://127.0.0.1:5173/api/notes/102 \
  -H 'content-type: application/json' -H 'Origin: http://127.0.0.1:5173' \
  -H 'Cookie: session=<value from DevTools>' \
  -d '{"title":"Test","body":"Fictional text"}'
```
