# Ambika — AI Interview Platform

Ambika is a full-stack AI interview platform for recruiters and candidates. A recruiter creates an interview record, shares the generated token link with a candidate, and the candidate completes an AI-generated technical interview. Each answer is evaluated immediately, the answers are stored, and the recruiter can review the interview from the results console.

The project is currently a prototype. Recruiter authentication, invitation email delivery, and real-time cross-browser updates are not implemented.

---

## Table of Contents

1. [Features](#features)
2. [End-to-End Flows](#end-to-end-flows)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [API Reference](#api-reference)
8. [Data Model](#data-model)
9. [Scripts and Verification](#scripts-and-verification)
10. [Current Limitations](#current-limitations)
11. [Folder Structure](#folder-structure)
12. [Contributing](#contributing)

---

## Features

### Recruiter side

- **Recruiter dashboard** (`/dashboard`) — displays total, completed, in-progress, and pending counts, plus the eight newest interviews.
- **Create interview** — opens from the header on recruiter pages and collects an interview title, candidate name, candidate email, job role, and experience.
- **Shareable token link** — creates a unique candidate URL and provides a clipboard action after creation. Email is stored as interview data but no email is sent.
- **Interview results** (`/results`) — shows interviews in all statuses, including candidate, role, experience, status, average score, and creation date.
- **Interview detail** (`/results/:id`) — shows the candidate profile, saved answers, per-answer feedback, and the completed arithmetic evaluation.
- **Manual refresh** — the dashboard can reload its data on demand. Creating an interview also refreshes mounted recruiter pages in the same browser window.

### Candidate side

- **Public interview** (`/interview/:token`) — loads a candidate-facing interview without the recruiter layout.
- **AI question generation** — the start action requests five technical, practical, and scenario-based questions based on the job role and experience.
- **Answer evaluation** — non-empty answers are evaluated by the AI service and receive a score and written feedback.
- **Completion summary** — finishing stores the final total and average score and shows the candidate a summary.
- **Completed-link protection** — a completed interview cannot accept more answers or another completion request.

### AI capabilities

- Question generation through LangGraph and Google Gemini.
- Per-answer scoring requested on a 0–10 scale with written feedback.
- Arithmetic aggregate scoring after completion.
- A separate qualitative final-evaluation endpoint is available, but the current candidate UI does not call it.

### UI / UX

- Dark, blue/purple-gradient MUI theme.
- Recruiter and candidate layouts share reusable cards, chips, score displays, tables, modals, and progress indicators.
- Responsive React Router pages for dashboard, results, detail, and candidate flows.

---

## End-to-End Flows

### Recruiter flow

1. Open `/dashboard`.
2. The client requests `GET /api/interviews` through the gateway.
3. The dashboard derives status counts from the returned list and displays the newest eight records.
4. Select **New Interview** and submit the required fields.
5. The interview service creates a MongoDB document with status `PENDING` and a random 16-byte hexadecimal token.
6. The service returns the token and a link based on the interview service's `CLIENT_URL`.
7. Copy the link and send it to the candidate manually.
8. Open `/results` to see all interview statuses.
9. Select an interview to open `/results/:id` and review its saved answers and feedback.

### Candidate flow

1. Open `/interview/:token`.
2. The client requests the public interview projection. It includes the title, candidate name, role, experience, token, status, and any completed evaluation, but not the candidate email, questions, or answers.
3. For a `PENDING` or `IN_PROGRESS` interview, select **Start Interview**.
4. The client requests five questions from the AI service. The questions are held in browser state and are not persisted by the current flow.
5. Enter a non-empty answer and submit it.
6. The client first requests AI evaluation, then saves the question, answer, score, and feedback through the interview service.
7. The first saved answer changes the database status to `IN_PROGRESS`.
8. Continue through the generated questions. On the final generated question, select **Finish Interview**.
9. The interview service calculates the arithmetic average from saved answers, rounds it to two decimals, and changes the status to `COMPLETED`.
10. The candidate sees the average, answered count, and total score. Reopening a completed link shows the stored summary.

### Interview lifecycle

```text
PENDING ──first answer saved──> IN_PROGRESS ──completion requested──> COMPLETED
```

Starting the interview does not change the database status. Completion requires at least one saved answer. Once an interview is `COMPLETED`, further answer and completion requests are rejected.

### Refresh and sharing behavior

- Creating an interview dispatches a `interview:created` window event.
- The event refreshes hook consumers in the same browser window; it does not synchronize other tabs or browsers.
- Candidate completion does not push updates to an already-open recruiter page.
- The application does not send invitation emails. The generated link must be copied and shared manually.

---

## Tech Stack

| Layer            | Technology |
| ---------------- | ---------- |
| Frontend         | React 19, React Router 7, Vite 8 |
| UI library       | Material UI 9, MUI Icons, Emotion |
| Forms            | React Hook Form |
| Backend          | Node.js, Express 5 |
| Database         | MongoDB with Mongoose 9 |
| AI               | LangChain, LangGraph, Google Gemini |
| API architecture | Express gateway with `http-proxy-middleware` |
| Language         | JavaScript ES modules |

---

## Architecture

```text
┌──────────────────────────────────────────────────────────┐
│                    React client                          │
│              http://localhost:5173                       │
│      Dashboard · Results · Detail · Candidate           │
└──────────────────────────┬───────────────────────────────┘
                           │ VITE_API_URL
                           ▼
┌──────────────────────────────────────────────────────────┐
│                    API Gateway                           │
│                    port 5000                             │
│                    CORS and proxying                     │
└───────────────┬──────────────────────────┬───────────────┘
                │                          │
                ▼                          ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│   Interview service      │  │       AI service         │
│   port 5002              │  │       port 5003          │
│   Interviews and answers │  │   LangGraph and Gemini   │
└──────────────┬───────────┘  └──────────────────────────┘
               │
               ▼
┌──────────────────────────┐
│          MongoDB         │
└──────────────────────────┘

Auth service (port 5001) is a standalone health/test stub.
Its gateway proxy is currently disabled and it is not part of
the active recruiter or candidate flow.
```

### Active request path

1. The browser calls the gateway at `VITE_API_URL`, normally `http://localhost:5000/api`.
2. The gateway strips the service prefix and forwards requests:
   - `/api/interviews/*` to `INTERVIEW_SERVICE_URL`
   - `/api/ai/*` to `AI_SERVICE_URL`
3. The interview service reads and writes MongoDB.
4. The AI service calls Gemini for question generation and answer evaluation.

No active API route requires authentication. Possession of a valid interview token is the only candidate-side access control.

---

## Getting Started

### Prerequisites

- **Node.js 20.19+ or 22.13+**; Node.js 24 is recommended.
- **npm**
- **MongoDB** running locally or an Atlas connection string.
- **Google Gemini API key** for the AI service.
- A browser for the recruiter and candidate interfaces.

### 1. Install dependencies

Run these commands from the repository root. Each package has its own `package.json`.

```bash
npm --prefix client install
npm --prefix services/gateway install
npm --prefix services/interview-service install
npm --prefix services/ai-service install
npm --prefix services/auth-service install
```

The auth service is optional for the current application flow, but installing it is useful if the standalone stub will be run.

### 2. Create environment files

Environment files are ignored by Git. Create the following files locally.

#### `client/.env`

```dotenv
VITE_API_URL=http://localhost:5000/api
```

#### `services/gateway/.env`

```dotenv
PORT=5000
CLIENT_URL=http://localhost:5173
INTERVIEW_SERVICE_URL=http://localhost:5002
AI_SERVICE_URL=http://localhost:5003
```

#### `services/interview-service/.env`

```dotenv
PORT=5002
MONGO_URI=mongodb://127.0.0.1:27017/ai-interview-platform
CLIENT_URL=http://localhost:5173
```

#### `services/ai-service/.env`

```dotenv
PORT=5003
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your-gemini-api-key
```

Depending on the installed LangChain Google GenAI integration, `GOOGLE_API_KEY` may be used instead of `GEMINI_API_KEY`. Keep the key local and never commit it.

#### `services/auth-service/.env` (optional)

```dotenv
PORT=5001
```

### 3. Start the services

Use a separate terminal for each active service. Start MongoDB before starting the interview service.

```bash
npm --prefix services/gateway run dev
npm --prefix services/interview-service run dev
npm --prefix services/ai-service run dev
npm --prefix client run dev
```

The optional auth stub can be started separately:

```bash
npm --prefix services/auth-service run dev
```

Open `http://localhost:5173`. The default route redirects to `/dashboard`.

### 4. Check health endpoints

```bash
curl http://localhost:5000/health
curl http://localhost:5002/health
curl http://localhost:5003/health
```

The optional auth stub can be checked directly at `http://localhost:5001/health`.

---

## Environment Variables

| Location | Variable | Required | Default | Purpose |
| -------- | -------- | -------- | ------- | ------- |
| `client/.env` | `VITE_API_URL` | **yes** | — | Gateway base URL used by every client API request |
| `services/gateway/.env` | `PORT` | no | `5000` | Gateway listen port |
| `services/gateway/.env` | `CLIENT_URL` | **yes** | — | Allowed browser origin for CORS |
| `services/gateway/.env` | `INTERVIEW_SERVICE_URL` | **yes** | — | Interview service proxy target |
| `services/gateway/.env` | `AI_SERVICE_URL` | **yes** | — | AI service proxy target |
| `services/interview-service/.env` | `PORT` | no | `5002` | Interview service listen port |
| `services/interview-service/.env` | `MONGO_URI` | **yes** | — | MongoDB connection string |
| `services/interview-service/.env` | `CLIENT_URL` | **yes** | — | Base URL used to create candidate links |
| `services/ai-service/.env` | `PORT` | no | `5003` | AI service listen port |
| `services/ai-service/.env` | `CLIENT_URL` | **yes** | — | Allowed browser origin for CORS |
| `services/ai-service/.env` | `GEMINI_API_KEY` or `GOOGLE_API_KEY` | **yes** | — | Google Gemini API credential |
| `services/auth-service/.env` | `PORT` | no | `5001` | Optional auth stub listen port |

`PORT` variables have code defaults, but the gateway target URLs, MongoDB URI, client URL, and AI credential do not.

---

## API Reference

The client uses the gateway base URL, normally `http://localhost:5000/api`. The gateway strips `/api/interviews` or `/api/ai` before forwarding a request. Requests currently do not include an authentication token.

### Endpoints used by the current UI

| Method | Endpoint | Purpose |
| ------ | -------- | ------- |
| `POST` | `/api/interviews` | Create an interview and generate its candidate link |
| `GET` | `/api/interviews` | List interviews, newest first |
| `GET` | `/api/interviews/:id` | Get full recruiter interview details |
| `GET` | `/api/interviews/public/:token` | Get the candidate-facing interview projection |
| `POST` | `/api/interviews/:token/answers` | Save one evaluated answer |
| `POST` | `/api/interviews/:token/complete` | Compute the stored final evaluation and complete the interview |
| `POST` | `/api/ai/generate-questions` | Generate questions for a role and experience level |
| `POST` | `/api/ai/evaluate-answer` | Score one answer and return feedback |

### Create an interview

`POST /api/interviews`

```json
{
  "title": "Frontend Engineer Interview",
  "candidateName": "Jane Doe",
  "candidateEmail": "jane@example.com",
  "jobRole": "React Developer",
  "experience": "3+ years"
}
```

A successful response contains the created record's fields, `token`, `status`, and `interviewLink`.

### Generate questions

`POST /api/ai/generate-questions`

```json
{
  "jobRole": "React Developer",
  "experience": "3+ years"
}
```

The response contains a `questions` array. The prompt requests five questions, but the client and API do not enforce exactly five returned items.

### Evaluate an answer

`POST /api/ai/evaluate-answer`

```json
{
  "jobRole": "React Developer",
  "question": "Explain how React state updates are scheduled.",
  "answer": "React batches updates within an event..."
}
```

The response contains an `evaluation` object with a numeric `score` and `feedback`. The AI prompt requests a score from 0 to 10, but the persisted model does not independently enforce that range.

### Save an answer

`POST /api/interviews/:token/answers`

```json
{
  "question": "Explain how React state updates are scheduled.",
  "answer": "React batches updates within an event...",
  "score": 8,
  "feedback": "Correct explanation with a minor omission..."
}
```

The request is rejected for a completed interview. Saving the first answer changes a pending interview to `IN_PROGRESS`.

### Complete an interview

`POST /api/interviews/:token/complete`

The request has no body. A successful response contains the stored evaluation:

```json
{
  "success": true,
  "message": "Interview completed successfully",
  "evaluation": {
    "totalQuestions": 5,
    "totalScore": 39,
    "averageScore": 7.8
  }
}
```

The server rejects completion when the token is unknown, the interview is already completed, or no answers have been saved.

### Qualitative final evaluation

`POST /api/ai/final-evaluation` is implemented but is not called by the current UI.

Request body:

```json
{
  "jobRole": "React Developer",
  "answers": [
    {
      "question": "Explain a React component lifecycle.",
      "answer": "..."
    }
  ]
}
```

The response evaluation can contain `overallScore`, `summary`, `strengths`, and `improvements`. This endpoint is separate from the deterministic arithmetic evaluation stored by the interview service.

### Error responses

Application errors generally use this shape:

```json
{
  "success": false,
  "message": "Human-readable error message"
}
```

Typical statuses are `400` for missing fields or invalid interview state, `404` for an unknown interview, and `500` for an unexpected service or AI failure.

### Auth service status

The auth service exposes standalone `GET /health` and `GET /test` endpoints. Its gateway proxy block is currently disabled, so there is no active `/api/auth` route.

---

## Data Model

The interview service stores records in one `Interview` collection:

```js
{
  title: String,
  candidateName: String,
  candidateEmail: String,
  jobRole: String,
  experience: String,
  token: String,
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED",
  questions: [],
  answers: [
    {
      question: String,
      answer: String,
      score: Number,
      feedback: String
    }
  ],
  evaluation: {
    totalQuestions: Number,
    totalScore: Number,
    averageScore: Number
  } | null,
  createdAt: Date,
  updatedAt: Date
}
```

Notes:

- `token` is generated from 16 random bytes encoded as hexadecimal and has no configured expiry.
- The schema declares `questions`, but the current controllers do not write generated questions to it.
- `evaluation.totalQuestions` is the number of saved answers, not necessarily the number of questions generated in the browser.
- `evaluation.averageScore` is the arithmetic mean of saved answer scores, rounded to two decimals.
- List responses intentionally omit the answers array; detail responses include it.
- Public responses omit the candidate email and answers.
- The recruiter detail view displays the stored average and percentage, while the candidate completion card displays the average as a score out of 10.

### Lifecycle rules

- A new record starts as `PENDING`.
- Saving any answer changes it to `IN_PROGRESS`.
- Completing requires at least one saved answer and writes the aggregate evaluation.
- `COMPLETED` records are locked against additional answers and completion requests.
- An `IN_PROGRESS` record is not resumable: generated questions live in browser state, so reloading the link starts a new question set and can append more saved answers.

---

## Scripts and Verification

### Frontend

Run from the repository root or inside `client/`:

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Serve the production build locally |

### Backend services

Each service supports:

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start with `nodemon` reload |
| `npm start` | Start with Node.js |

### Current verification status

- Client ESLint is configured through `npm --prefix client run lint`.
- The client production build is available through `npm --prefix client run build`.
- There is currently no automated test runner or project test suite.
- There is no TypeScript configuration or typecheck script.
- Backend linting, backend typechecking, and backend tests are not configured.

---

## Current Limitations

- No recruiter authentication, authorization, or protected routes are implemented.
- Candidate links are bearer tokens; there is no candidate identity verification or token expiry.
- The application does not send invitation emails. Sharing is manual.
- Recruiter pages do not receive real-time candidate updates. Use the dashboard refresh action or reload the results page.
- Generated questions are not persisted, so an in-progress interview cannot resume after a page reload.
- The database `questions` field is currently unused.
- Completion uses arithmetic aggregation of saved answer scores. The qualitative AI final-evaluation endpoint is not wired into the UI.
- The model configuration is hard-coded in the AI service to `gemini-3.5-flash-lite` with temperature `0.4`.
- No Docker Compose workflow is included; local npm-based startup is the supported setup documented here.

---

## Folder Structure

```text
ai-interview-platform/
├── README.md
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── theme.js
│   └── package.json
└── services/
    ├── gateway/
    │   └── src/server.js
    ├── auth-service/
    │   └── src/server.js
    ├── interview-service/
    │   └── src/
    │       ├── config/
    │       ├── controllers/
    │       ├── models/
    │       ├── routes/
    │       └── server.js
    └── ai-service/
        └── src/
            ├── controllers/
            ├── graph/
            ├── routes/
            ├── services/
            └── server.js
```

---

## Contributing

1. Create a focused branch for the change.
2. Keep API documentation and this README aligned with route, request, response, and lifecycle changes.
3. Run `npm --prefix client run lint` and `npm --prefix client run build` before submitting changes.
4. Add automated tests when a test runner is introduced.
5. Commit with a clear message and open a pull request.
