const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function post(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }

  return data;
}

export function generateQuestions(config) {
  return post("/questions/generate", config);
}

export function evaluateAnswer({ question, answer, jobRole, experienceLevel }) {
  return post("/answers/evaluate", { question, answer, jobRole, experienceLevel });
}

export function summarizeInterview({ jobRole, experienceLevel, results }) {
  return post("/interview/summary", { jobRole, experienceLevel, results });
}