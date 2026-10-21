# MeetingIntel — Frontend (login + workspace)

React + Vite app for the signed-in part of the AI Meeting Intelligence Platform:
login, registration, role-based dashboards (Member / Manager / Admin) and the meeting workspace.

## Run

From the repository root, make sure `.env` exists (see the root README), then:

```powershell
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 (it opens on the login page).

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | Run ESLint |

## Login (temporary, until backend JWT auth is ready)

- **Member:** create an account on `/register`.
- **Admin / Manager:** add these to the **root** `.env` (this app reads `.env` from the repo root via `envDir: '..'` in `vite.config.js`). Get the values from the team lead and never commit them:

```
VITE_ADMIN_EMAIL=
VITE_ADMIN_PASSWORD=
VITE_MANAGER_EMAIL=
VITE_MANAGER_PASSWORD=
```

`VITE_*` values are built into the browser bundle, so this is for local development only. Remove it once `/api/auth` is implemented.

## Pages

| Area | Routes |
|---|---|
| Auth | `/login`, `/register`, `/forgot-password` |
| Dashboards | `/app` (Member, Manager or Admin view by role) |
| Meetings | `/meetings`, `/meeting/:id`, `/upload` |
| Workspace | `/actions`, `/analytics`, `/calendar`, `/compare`, `/settings`, `/users` (Admin only) |

All data is sample data stored in the browser until the backend API is connected.

## Structure

```
frontend/src/
├── main.jsx                 # entry: router + theme + styles
├── App.jsx                  # routes
├── auth.js                  # temporary local auth (reads root .env)
├── data.js                  # sample data
├── pages/
│   ├── auth/                # AuthShell, Login, Register, ForgotPassword
│   ├── dashboard/           # Member / Manager / Admin dashboards
│   ├── meetings/            # MeetingsPage, UploadPage, MeetingDetail
│   └── workspace/           # ActionItems, Analytics, Calendar, Compare, Settings, Users
├── layouts/AppLayout.jsx    # sidebar + top bar
├── routes/                  # Protected (login/role guard), Workspace (page switch)
├── components/
│   ├── common/              # Brand, ThemeToggle, Field
│   └── ui/                  # PageHeading, StatCard, Status, MeetingRow
├── context/                 # theme (dark / light)
├── utils/                   # helpers, transcript exports (PDF/DOC/TXT/JSON/CSV/SRT/VTT)
└── styles/                  # base, auth, app, responsive CSS
```

Author: Panyala Avinash Reddy
