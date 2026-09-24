# Ambika — AI Interview Platform

A full-stack, AI-powered interview platform for recruiters and candidates. Recruiters create interview invitations, and candidates take an AI-generated technical interview through a shareable link. The AI evaluates every answer in real time, produces a final score, and the recruiter can review results from a dedicated dashboard.

The frontend is a modern **React + Material UI (MUI)** application styled after micro1.ai's dark, blue/purple-gradient design language. The backend is built as a **microservice architecture** behind a single API gateway.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Folder Structure](#folder-structure)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [API Reference](#api-reference)
8. [Data Model](#data-model)
9. [Scripts](#scripts)
10. [Contributing](#contributing)

---

## Features

### Recruiter side
- **Recruiter Dashboard** (`/dashboard`) — overview with live stat cards (total / completed / in-progress / pending interviews) and a recent-interviews table.
- **Create Interview modal** — available globally from the header (`New Interview`); validates input, generates a shareable candidate link, and auto-refreshes data everywhere via a window event.
- **Interview Results** (`/results`) — full list of interviews with candidate, role, experience, status chip, and average score.
- **Interview Detail** (`/results/:id`) — candidate profile, final evaluation (score + progress bar), and per-question AI feedback panels.

### Candidate side
- **Public Interview** (`/interview/:token`) — branded invitation screen that generates 5 AI questions, walks the candidate through them one at a time, evaluates each answer live, and shows a final completion summary.
- **One-time completion** — once an interview is `COMPLETED`, the candidate cannot restart or re-answer; reopening the link shows their final summary.

### AI capabilities
- AI question generation tailored to job role + experience level.
- Per-answer scoring (0–10) with written feedback.
- Final aggregate scoring (average / total) computed after completion.

### UI / UX
- Dark, micro1.ai-inspired theme (MUI `ThemeProvider` + `CssBaseline`).
- Reusable component library (cards, chips, score bars, hero headers, modals, tables).
- Same design language applies to every recruiter and candidate page.

---

## Tech Stack

| Layer            | Technology |
| ---------------- | ---------- |
| Frontend         | React 19, React Router 7, Vite 8 |
| UI Library       | Material UI (MUI v9), MUI Icons, Emotion styled |
| Forms            | React Hook Form |
| Backend          | Node.js, Express 5 |
| Database         | MongoDB (Mongoose 9) |
| AI / LLM         | LangChain (`@langchain/langgraph`, `@langchain/google-genai`), Google Gemini |
| API Architecture | Microservices behind an Express API Gateway (`http-proxy-middleware`) |
| Language         | JavaScript (ES Modules) |

---

## Architecture

```
                    ┌─────────────────────────────────────────────────────┐
                    │                    Client (React)                   │
                    │               http://localhost:5173                 │
                    │  Dashboard · Results · Detail · Candidate Interview │
                    └──────────────────────────┬──────────────────────────┘
                                               │  HTTP (fetch) → http://localhost:5000/api
                                               ▼
                    ┌─────────────────────────────────────────────────────┐
                    │                API Gateway (port 5000)              │
                    │              CORS + request proxying                │
                    └──────┬──────────────┬──────────────┬────────────────┘
                           │              │              │
                 /api/auth │    /api/interviews │      │ /api/ai
                           ▼              ▼              ▼
              ┌─────────────────┐ ┌──────────────────┐ ┌─────────────────────┐
              │  Auth Service   │ │ Interview Service│ │    AI Service       │
              │    (port 5001)  │ │    (port 5002)   │ │      (port 5003)    │
              │  (auth stub)    │ │  Interview CRUD  │ │ LangGraph + Gemini  │
              │                 │ │   MongoDB        │ │ question generation │
              │                 │ │   answers, eval  │ │ answer evaluation   │
              └─────────────────┘ └────────┬─────────┘ └─────────────────────┘
                                           │
                                           ▼
                              ┌──────────────────────────┐
                              │         MongoDB          │
                              └──────────────────────────┘
```

Flow summary:

1. Recruiter creates an interview → `interview-service` stores it and returns a unique `token` + shareable link.
2. Candidate opens `/interview/:token` → the client calls `ai-service` to generate 5 questions based on `jobRole` + `experience`.
3. The candidate answers each question → `ai-service` scores it (0–10) + feedback → answers are persisted via `interview-service`.
4. On finish → `interview-service` computes the final evaluation (`totalScore`, `averageScore`) and marks the interview `COMPLETED`.
5. Recruiter reviews results in `/results` or `/results/:id`.

---

## Folder Structure

```
ai-interview-platform/
│
├── README.md                            # This file
│
├── client/                              # Frontend application (Vite + React + MUI)
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/                      # Static assets (hero.png, svg logos)
│   │   ├── components/                  # Reusable UI components
│   │   │   ├── AnswerCard.jsx           #   Q&A card w/ AI feedback (detail page)
│   │   │   ├── BrandHeader.jsx          #   Candidate page brand mark
│   │   │   ├── CompletionCard.jsx       #   Interview-finished summary
│   │   │   ├── DetailRow.jsx            #   Icon + label + value row
│   │   │   ├── EvaluationCallout.jsx    #   Live per-answer AI evaluation panel
│   │   │   ├── EvaluationCard.jsx       #   Final evaluation block (recruiter)
│   │   │   ├── InterviewForm.jsx        #   Create-interview form fields
│   │   │   ├── InterviewFormModal.jsx   #   MUI Dialog wrapper for the form
│   │   │   ├── InterviewInfoCard.jsx    #   Candidate summary card
│   │   │   ├── InterviewIntroCard.jsx   #   Candidate invitation/start card
│   │   │   ├── InterviewList.jsx        #   Interviews table (reusable)
│   │   │   ├── InterviewQuestionCard.jsx#   Question + answer + evaluation
│   │   │   ├── InterviewShell.jsx       #   Candidate page layout shell
│   │   │   ├── Layout.jsx               #   App header + footer + <Outlet/>
│   │   │   ├── PageHero.jsx             #   Centered hero (badge/title/subtitle)
│   │   │   ├── PanelCard.jsx            #   Glass-styled card wrapper
│   │   │   ├── ScoreDisplay.jsx         #   Gradient score + progress bar
│   │   │   ├── ScoreStat.jsx            #   Value + label stat block
│   │   │   ├── StatCard.jsx             #   Dashboard stat card
│   │   │   └── StatusChip.jsx           #   PENDING / IN_PROGRESS / COMPLETED chip
│   │   ├── constants/
│   │   │   └── nav.js                   # Header navigation config
│   │   ├── hooks/
│   │   │   └── useInterviews.js         # Fetch + auto-refresh on interview:created
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx            # Recruiter dashboard (stats + recent list)
│   │   │   ├── InterviewDetail.jsx      # Single-interview detail view
│   │   │   ├── InterviewResults.jsx     # All interviews + results
│   │   │   └── PublicInterview.jsx      # Candidate-facing interview flow
│   │   ├── services/
│   │   │   └── interviewApi.js          # API client (fetch wrappers)
│   │   ├── utils/
│   │   │   └── formatDate.js            # Date formatting helper
│   │   ├── App.jsx                      # Router + layout wiring
│   │   ├── index.css                    # Global styles / font import
│   │   ├── main.jsx                     # React entry + MUI ThemeProvider
│   │   └── theme.js                     # MUI dark theme (brand colors, gradients)
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
│
└── services/                            # Backend microservices
    ├── gateway/                         # API Gateway — single entry point
    │   └── src/
    │       └── server.js                #   CORS + proxy /api/* to services
    ├── auth-service/                    # Authentication service (stub)
    │   └── src/
    │       └── server.js                #   Health/test endpoints
    ├── interview-service/               # Interview data management
    │   └── src/
    │       ├── config/
    │       │   └── db.js                #   MongoDB connection
    │       ├── controllers/
    │       │   └── interviewController.js
    │       ├── models/
    │       │   └── interview.js         #   Mongoose schema
    │       ├── routes/
    │       │   └── interviewRoutes.js
    │       └── server.js                #   Express app (port 5002)
    └── ai-service/                      # AI / LLM integration
        └── src/
            ├── controllers/
            │   └── aiController.js
            ├── graph/
            │   └── interviewGraph.js    #   LangGraph state machine
            ├── routes/
            │   └── aiRoutes.js
            ├── services/
            │   └── aiService.js         #   Gemini prompts (questions/eval)
            └── server.js                #   Express app (port 5003)
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (ES modules used throughout)
- **npm**
- **MongoDB** — local instance or Atlas connection string
- **Google Gemini API key** — e.g. `GEMINI_API_KEY` (used by the AI service)

### 1. Clone & install

```bash
git clone <your-repo-url>
cd ai-interview-platform
```

Install dependencies for **each** package (there is no root workspace script):

```bash
# Frontend
cd client
npm install

# Backend services
cd ../services/gateway        && npm install
cd ../services/auth-service   && npm install
cd ../services/interview-service && npm install
cd ../services/ai-service     && npm install
```

### 2. Configure environment variables

Create a `.env` file in each service folder (see [Environment Variables](#environment-variables)).

### 3. Run everything

Start the backend services first (each in its own terminal):

```bash
# 1 - API Gateway
cd services/gateway && npm run dev        # http://localhost:5000

# 2 - Auth Service
cd services/auth-service && npm run dev   # http://localhost:5001

# 3 - Interview Service
cd services/interview-service && npm run dev  # http://localhost:5002

# 4 - AI Service (needs Gemini API key)
cd services/ai-service && npm run dev     # http://localhost:5003

# 5 - Frontend
cd client && npm run dev                  # http://localhost:5173
```

Open **http://localhost:5173** in your browser. You will land on the **Recruiter Dashboard**.

### 4. Verify health

```bash
curl http://localhost:5000/health         # API Gateway
curl http://localhost:5002/health         # Interview Service
curl http://localhost:5003/health         # AI Service
```

---

## Environment Variables

Create a `.env` in each service. All ports have sensible defaults.

| Service            | Variable    | Default | Required | Purpose                              |
| ------------------ | ----------- | ------- | -------- | ------------------------------------ |
| gateway            | `PORT`      | `5000`  | no       | Gateway listen port                  |
| auth-service       | `PORT`      | `5001`  | no       | Auth service listen port             |
| interview-service  | `PORT`      | `5002`  | no       | Interview service listen port        |
| interview-service  | `MONGO_URI` | —       | **yes**  | MongoDB connection string            |
| ai-service         | `PORT`      | `5003`  | no       | AI service listen port               |
| ai-service         | `GEMINI_API_KEY` | —  | **yes**  | Google Gemini API key                |

> `ai-service` uses `@langchain/google-genai`; it reads `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) from the environment by default.

---

## API Reference

All client requests go through the **gateway** at `http://localhost:5000/api`. The gateway rewrites `/api/<service>` and proxies to the underlying service.

### Auth

| Method | Endpoint      | Description            |
| ------ | ------------- | ---------------------- |
| GET    | `/api/auth/test` | Reach auth service via gateway |

### Interviews (`interview-service` → port 5002)

| Method | Endpoint                              | Description                                        |
| ------ | ------------------------------------- | -------------------------------------------------- |
| POST   | `/api/interviews`                     | Create an interview (returns `token` + link)       |
| GET    | `/api/interviews`                     | List interviews (sorted newest first)              |
| GET    | `/api/interviews/:id`                 | Get one interview (full detail)                    |
| GET    | `/api/interviews/public/:token`       | Public interview data for candidates               |
| POST   | `/api/interviews/:token/answers`      | Save a candidate answer (score + feedback)         |
| POST   | `/api/interviews/:token/complete`     | Complete interview → compute final evaluation      |

**`POST /api/interviews` body:**

```json
{
  "title": "Frontend Engineer Interview",
  "candidateName": "Jane Doe",
  "candidateEmail": "jane@example.com",
  "jobRole": "React Developer",
  "experience": "3+ years"
}
```

### AI (`ai-service` → port 5003)

| Method | Endpoint                          | Description                              |
| ------ | --------------------------------- | ---------------------------------------- |
| POST   | `/api/ai/generate-questions`      | Generate 5 questions for `jobRole`+`experience` |
| POST   | `/api/ai/evaluate-answer`         | Score one answer (0–10) + feedback        |
| POST   | `/api/ai/final-evaluation`        | Overall evaluation for a set of answers   |

---

## Data Model

The `interview-service` stores a single `Interview` collection:

```js
{
  title:            String,        // required
  candidateName:    String,        // required
  candidateEmail:   String,        // required
  jobRole:          String,        // required
  experience:       String,        // required, e.g. "2-4 years"
  token:            String,        // unique, generated (16 random bytes hex)
  status:           "PENDING" | "IN_PROGRESS" | "COMPLETED", // default: PENDING
  questions:        Array,         // generated question list (default [])
  answers: [
    {
      question:     String,
      answer:       String,
      score:        Number,        // 0–10
      feedback:     String
    }
  ],
  evaluation:       {              // set on completion (default null)
    totalQuestions: Number,
    totalScore:     Number,
    averageScore:   Number         // rounded to 2 decimals
  },
  createdAt:        Date,          // timestamps: true
  updatedAt:        Date
}
```

Lifecycle: `PENDING` → `IN_PROGRESS` (first answer saved) → `COMPLETED` (final evaluation written). Completed interviews are locked — no further answers can be saved.

---

## Scripts

### Frontend (`client/`)

| Command            | Description                           |
| ------------------ | ------------------------------------- |
| `npm run dev`      | Start Vite dev server (port 5173)     |
| `npm run build`    | Production build (`dist/`)            |
| `npm run preview`  | Preview the production build          |
| `npm run lint`     | Run ESLint                            |

### Backend (`services/<name>/`)

| Command            | Description                       |
| ------------------ | --------------------------------- |
| `npm run dev`      | Start service with nodemon reload |
| `npm start`        | Start service with node           |

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/my-feature`).
3. Make changes and verify with `npm run build` and `npm run lint` in the client.
4. Commit with a clear message and open a pull request.