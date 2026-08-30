import model from "../config/gemini.js";
import {
  buildQuestionsPrompt,
  buildEvaluationPrompt,
  buildSummaryPrompt,
} from "../utils/promptBuilder.js";

const DURATION_TO_QUESTION_COUNT = {
  15: 4,
  30: 7,
  45: 10,
  60: 12,
};

/** Strips accidental markdown fences and parses the model's JSON text. */
function parseModelJson(rawText) {
  const cleaned = rawText.replace(/^```json\s*|^```\s*|```$/gm, "").trim();
  return JSON.parse(cleaned);
}

export async function generateQuestions(req, res, next) {
  try {
    const {
      jobRole,
      experienceLevel,
      skills,
      difficultyLevel,
      interviewDuration,
      interviewType,
    } = req.body;

    if (!jobRole || !experienceLevel || !difficultyLevel || !interviewDuration) {
      return res.status(400).json({
        error:
          "jobRole, experienceLevel, difficultyLevel, and interviewDuration are required.",
      });
    }

    const questionCount = DURATION_TO_QUESTION_COUNT[interviewDuration] || 7;

    const prompt = buildQuestionsPrompt({
      jobRole,
      experienceLevel,
      skills,
      difficultyLevel,
      interviewDuration,
      interviewType,
      questionCount,
    });

    const result = await model.generateContent(prompt);
    const parsed = parseModelJson(result.response.text());

    return res.status(200).json(parsed);
  } catch (err) {
    return next(err);
  }
}

export async function evaluateAnswer(req, res, next) {
  try {
    const { question, answer, jobRole, experienceLevel } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: "question and answer are required." });
    }

    const prompt = buildEvaluationPrompt({
      question,
      answer,
      jobRole: jobRole || "the target role",
      experienceLevel: experienceLevel || "unspecified",
    });

    const result = await model.generateContent(prompt);
    const parsed = parseModelJson(result.response.text());

    return res.status(200).json(parsed);
  } catch (err) {
    return next(err);
  }
}

export async function summarizeInterview(req, res, next) {
  try {
    const { jobRole, experienceLevel, results } = req.body;

    if (!Array.isArray(results) || results.length === 0) {
      return res.status(400).json({ error: "results must be a non-empty array." });
    }

    const prompt = buildSummaryPrompt({
      jobRole: jobRole || "the target role",
      experienceLevel: experienceLevel || "unspecified",
      results,
    });

    const result = await model.generateContent(prompt);
    const parsed = parseModelJson(result.response.text());

    return res.status(200).json(parsed);
  } catch (err) {
    return next(err);
  }
}