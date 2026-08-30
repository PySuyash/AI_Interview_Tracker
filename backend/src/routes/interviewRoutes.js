import { Router } from "express";
import {
  generateQuestions,
  evaluateAnswer,
  summarizeInterview,
} from "../controllers/interviewController.js";

const router = Router();

router.post("/questions/generate", generateQuestions);
router.post("/answers/evaluate", evaluateAnswer);
router.post("/interview/summary", summarizeInterview);

export default router;
