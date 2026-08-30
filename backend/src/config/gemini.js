import { GoogleGenerativeAI } from "@google/generative-ai";

const { GEMINI_API_KEY, GEMINI_MODEL } = process.env;

if (!GEMINI_API_KEY) {
  // Fail loudly at startup rather than failing mysteriously on the first request.
  console.error(
    "[FATAL] GEMINI_API_KEY is not set. Copy .env.example to .env and add your key."
  );
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: GEMINI_MODEL || "gemini-3.6-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

export default model;
