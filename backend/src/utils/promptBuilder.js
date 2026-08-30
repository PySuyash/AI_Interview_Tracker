const INTERVIEW_TYPE_INSTRUCTIONS = {
  "Technical Interview": `Generate ONLY technical questions. Every question must test technical
knowledge, problem-solving, coding concepts, system design, or hands-on skills relevant to
the candidate's role and listed skills. Do NOT include behavioral, HR, or "tell me about a
time" style questions. Every question's "type" field must be "technical".`,

  "Behavioral Interview": `Generate ONLY behavioral and communication-focused questions —
things like past experiences, teamwork, conflict resolution, leadership, decision-making,
and soft skills relevant to the candidate's target role. Do NOT include any technical,
coding, or theory questions. Every question's "type" field must be "behavioral".`,

  "Mixed Interview": `Generate a mix of technical and behavioral questions — roughly half
technical (testing knowledge/problem-solving relevant to the role and skills) and half
behavioral (soft skills, past experience, teamwork). Mark each question's "type" field
accordingly as "technical" or "behavioral".`,
};

export function buildQuestionsPrompt({
  jobRole,
  experienceLevel,
  skills,
  difficultyLevel,
  interviewDuration,
  interviewType,
  questionCount,
}) {
  const skillsText =
    Array.isArray(skills) && skills.length > 0 ? skills.join(", ") : "general programming";

  const typeInstruction =
    INTERVIEW_TYPE_INSTRUCTIONS[interviewType] || INTERVIEW_TYPE_INSTRUCTIONS["Mixed Interview"];

  return `You are an experienced interviewer creating a mock interview.

Generate exactly ${questionCount} interview questions for the following candidate profile:
- Target role: ${jobRole}
- Experience level: ${experienceLevel}
- Skills/technologies to focus on: ${skillsText}
- Difficulty level: ${difficultyLevel}
- Interview duration: ${interviewDuration} minutes
- Interview type: ${interviewType || "Mixed Interview"}

${typeInstruction}

Each question should be answerable in a few minutes when spoken aloud.

Respond ONLY with valid JSON in exactly this shape, no markdown fences, no commentary:
{
  "questions": [
    { "id": 1, "type": "technical" | "behavioral", "question": "string" }
  ]
}`;
}

export function buildEvaluationPrompt({ question, answer, jobRole, experienceLevel }) {
  return `You are an experienced technical interviewer giving feedback to a candidate.

Role: ${jobRole}
Experience level: ${experienceLevel}
Question asked: "${question}"
Candidate's answer: "${answer}"

Evaluate the answer. Be honest but encouraging, and specific about what was missing.

Respond ONLY with valid JSON in exactly this shape, no markdown fences, no commentary:
{
  "score": 0-10 integer,
  "correctness": "short verdict, e.g. 'Mostly correct' or 'Missed the key concept'",
  "strengths": ["short bullet", "short bullet"],
  "improvements": ["short bullet", "short bullet"],
  "modelAnswerSummary": "1-3 sentence summary of what a strong answer would include"
}`;
}

export function buildSummaryPrompt({ jobRole, experienceLevel, results }) {
  const resultsText = results
    .map(
      (r, i) =>
        `${i + 1}. Q: ${r.question}\n   Score: ${r.score}/10\n   Notes: ${r.correctness}`
    )
    .join("\n");

  return `You are an interview coach summarizing a completed mock interview.

Role: ${jobRole}
Experience level: ${experienceLevel}

Per-question results:
${resultsText}

Respond ONLY with valid JSON in exactly this shape, no markdown fences, no commentary:
{
  "overallScore": 0-10 integer,
  "summary": "2-4 sentence overall summary",
  "topStrengths": ["short bullet", "short bullet"],
  "priorityImprovements": ["short bullet", "short bullet"],
  "readiness": "Not ready" | "Needs practice" | "Almost there" | "Ready"
}`;
}