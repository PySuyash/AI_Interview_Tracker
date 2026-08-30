# AI Interview Tracker — Backend

A small Express server that keeps your Gemini API key on the server (never sent to the
browser) and exposes endpoints the frontend calls to generate interview questions and
evaluate answers.

## Why this exists

The frontend can't safely hold an AI API key — anything bundled into a React app is
visible in the browser's network tab / source, so the key would be stealable. This
backend is the only thing that talks to Gemini; the frontend only talks to this backend.

## Setup

1. Get a free Gemini API key: https://aistudio.google.com/app/apikey
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and paste your key into `GEMINI_API_KEY`.
4. Start the server:
   ```bash
   npm start
   ```
   or, for auto-restart on changes:
   ```bash
   npm run dev
   ```

The server runs on `http://localhost:5000` by default (`PORT` in `.env`).

## Endpoints

### `GET /api/health`
Returns `{ "status": "ok" }`. Useful for confirming the server is up.

### `POST /api/questions/generate`
Generates interview questions for a configured mock interview.

Request body:
```json
{
  "jobRole": "frontendDeveloper",
  "experienceLevel": "fresher",
  "skills": ["react", "javaScript"],
  "difficultyLevel": "medium",
  "interviewDuration": "30"
}
```

Response:
```json
{
  "questions": [
    { "id": 1, "type": "technical", "question": "..." }
  ]
}
```

### `POST /api/answers/evaluate`
Evaluates a single answer to a question.

Request body:
```json
{
  "question": "What is the virtual DOM?",
  "answer": "It's ...",
  "jobRole": "frontendDeveloper",
  "experienceLevel": "fresher"
}
```

Response:
```json
{
  "score": 7,
  "correctness": "Mostly correct",
  "strengths": ["..."],
  "improvements": ["..."],
  "modelAnswerSummary": "..."
}
```

### `POST /api/interview/summary`
Summarizes a full interview from its per-question results.

Request body:
```json
{
  "jobRole": "frontendDeveloper",
  "experienceLevel": "fresher",
  "results": [
    { "question": "...", "score": 7, "correctness": "..." }
  ]
}
```

Response:
```json
{
  "overallScore": 7,
  "summary": "...",
  "topStrengths": ["..."],
  "priorityImprovements": ["..."],
  "readiness": "Almost there"
}
```

## Security notes

- **CORS** is locked to the origin(s) listed in `CORS_ORIGIN` (comma-separated). Only
  your frontend can call this API from a browser.
- **Rate limiting**: each IP is capped at 30 AI requests per 15 minutes, so a leaked
  frontend URL can't be used to run up your Gemini bill.
- **`.env` is gitignored** — never commit your real API key. `.env.example` is the
  template that's safe to commit.
- If you deploy this, set `CORS_ORIGIN` to your real frontend domain (e.g.
  `https://yourapp.vercel.app`) instead of localhost.

## Connecting the frontend

In the project root (not `backend/`), create a `.env` from `.env.example` and set:
```
VITE_API_BASE_URL=http://localhost:5000/api
```
When you deploy, point this at your deployed backend URL instead.
