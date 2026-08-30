# AI Interview Tracker

AI Interview Tracker is a full-stack web app that helps students and entry-level job
seekers practice for technical, behavioral, and mixed interviews. It generates
role-specific interview questions with Google's Gemini AI, evaluates typed answers with
instant AI feedback, and keeps a local history and dashboard of past sessions — all
without requiring an account or a database.

## Features

- **Configurable mock interviews** — pick a target job role, experience level, skills
  (React, JavaScript, Python, SQL, etc.), difficulty, and duration before starting.
- **Interview type selection** — Technical, Behavioral, or Mixed. The AI is instructed
  to generate only the question style you chose.
- **AI-generated questions** — questions are generated fresh for every session via the
  Gemini API, tailored to your configuration.
- **Instant AI feedback** — after each answer, get a score out of 10, a correctness
  verdict, strengths, areas to improve, and a summary of what a strong answer looks like.
- **Interview history** — every completed or stopped interview is saved locally
  (`localStorage`) and browsable/filterable on the History page.
- **Dashboard** — total interviews, average score, practice time, daily streak,
  interview readiness, and a per-skill performance breakdown, all computed from your
  real local history.
- **Clear local data** — a dedicated page to wipe saved interview data from the browser
  at any time.
- **Secure by design** — the Gemini API key never touches the browser. All AI calls are
  proxied through a small backend that holds the key server-side.

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- lucide-react (icons)
- Plain CSS (no framework)

**Backend**
- Node.js + Express
- Google Gemini API (`@google/generative-ai`)
- helmet (security headers)
- express-rate-limit (abuse protection)
- cors (locked to the frontend origin)
- dotenv (environment config)

**Data storage**
- No database. Interview configuration and history are stored in the browser's
  `localStorage`. The backend is stateless — it only proxies AI requests.

## Project Structure

```
AI_Interview_Tracker/
├── backend/                     # Express server — the only thing holding the API key
│   ├── server.js                # Entry point (CORS, rate limiting, routes)
│   ├── .env.example              # Template for backend environment variables
│   └── src/
│       ├── config/gemini.js      # Gemini client setup
│       ├── controllers/          # Request handlers per endpoint
│       ├── routes/               # Express route definitions
│       ├── middleware/           # Error handling
│       └── utils/promptBuilder.js # Builds the actual prompts sent to Gemini
│
├── src/                          # React frontend
│   ├── Pages/
│   │   ├── Dashboard/            # Stats, readiness, skill performance
│   │   ├── InterviewConfiguration/ # Pick interview type
│   │   ├── CreateInterview/      # Configure role, skills, difficulty, duration
│   │   ├── MockInterview/        # Live Q&A flow with AI feedback
│   │   ├── History/              # Browsable/filterable past interviews
│   │   └── ClearLocalStorage/    # Wipe saved data
│   ├── Components/               # Reusable UI pieces (cards, forms, headers, etc.)
│   ├── Services/
│   │   ├── interviewApi.js       # Fetch client for the backend
│   │   ├── historyStorage.js     # Read/write interview history in localStorage
│   │   └── dashboardStats.js     # Derives dashboard stats from history
│   └── main.jsx / App.jsx
│
├── .env.example                  # Template for frontend environment variables
└── index.html
```

## Setup and Installation

### Prerequisites
- Node.js v18 or higher
- npm
- A free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### 1. Clone the repository
```bash
git clone https://github.com/PySuyash/AI_Interview_Tracker.git
cd AI_Interview_Tracker
```

### 2. Set up the backend
```bash
cd backend
npm install
cp .env.example .env
```
Open `backend/.env` and add your Gemini key:
```
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-3.6-flash
PORT=5000
CORS_ORIGIN=http://localhost:5173
```
Start the server:
```bash
npm start
```
It runs on `http://localhost:5000`. See `backend/README.md` for full endpoint
documentation.

### 3. Set up the frontend
In the project root:
```bash
npm install
cp .env.example .env
```
Confirm `.env` points to your backend:
```
VITE_API_BASE_URL=http://localhost:5000/api
```
Start the dev server:
```bash
npm run dev
```
Open the printed local URL (typically `http://localhost:5173`).

> Both the backend (`npm start` in `backend/`) and the frontend (`npm run dev` in the
> root) need to be running at the same time.

## How It Works

1. **Configure** — choose an interview type (Technical / Behavioral / Mixed), then a
   job role, experience level, skills, difficulty, and duration. This is saved to
   `localStorage` under `currentInterview`.
2. **Generate** — the Mock Interview page sends that configuration to the backend,
   which builds a tailored prompt and asks Gemini for a set of questions.
3. **Answer** — type a response to each question (press **Enter** to submit, **Shift +
   Enter** for a new line) and get instant AI-scored feedback before moving on.
4. **Finish or Stop** — completing all questions or stopping early saves a record (job
   role, type, score, date, duration, skills used) to `localStorage` under
   `interviewHistory`.
5. **Review** — the History page lists and filters past sessions; the Dashboard
   aggregates them into stats, readiness scores, and a skill-by-skill breakdown.

## Environment Variables

**Backend (`backend/.env`)**

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Your Gemini API key (required) |
| `GEMINI_MODEL` | Gemini model to use (default: `gemini-3.6-flash`) |
| `PORT` | Port the backend runs on (default: `5000`) |
| `CORS_ORIGIN` | Comma-separated list of allowed frontend origins |

**Frontend (`.env`)**

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | URL of the backend API (default: `http://localhost:5000/api`) |

## Security Notes

- The Gemini API key lives only in `backend/.env`, which is gitignored — it is never
  sent to or readable from the browser.
- CORS on the backend is restricted to the origin(s) listed in `CORS_ORIGIN`.
- Each IP is rate-limited to 30 AI requests per 15 minutes to prevent abuse of the key.
- All interview data lives in the user's own browser `localStorage` — nothing is sent
  to or stored on any server beyond the momentary AI request/response.

## Roadmap / Known Limitations

- Interview readiness currently reuses the overall average score for dimensions the AI
  doesn't separately score (e.g. "Confidence"), since each answer only receives a
  single aggregate score today.
- Skill performance on the Dashboard only reflects interviews completed *after* skill
  tracking was added to history records — older sessions won't retroactively appear.
- No accounts or cloud sync — data is local to one browser. Clearing browser storage
  (or using the in-app "Clear Local Storage" page) permanently deletes history.

## License

Add your preferred license here (e.g. MIT).