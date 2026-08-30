import "./MockInterview.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressSection from "../../Components/ProgressSectionMockInterview/ProgressSection";
import AiQuestions from "../../Components/AI_Questions/AiQuestions";
import UserAnswer from "../../Components/UserAnswer/UserAnswer";
import { generateQuestions, evaluateAnswer } from "../../Services/interviewApi";
import { saveInterviewRecord } from "../../Services/historyStorage";

const MockInterview = () => {
  const navigate = useNavigate();

  const [interview] = useState(() => {
    const stored = localStorage.getItem("currentInterview");
    return stored ? JSON.parse(stored) : null;
  });

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const [userResponse, setUserResponse] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!interview) {
      navigate("/createinterview");
      return;
    }

    generateQuestions(interview)
      .then((data) => {
        setQuestions(data.questions || []);
        setStatus("active");
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setStatus("error");
      });
  }, [interview, navigate]);

  if (status === "loading") {
    return <p>Generating your interview questions...</p>;
  }

  if (status === "error") {
    return <p>Something went wrong: {errorMessage}</p>;
  }

  if (!interview) {
    return <p>No interview data found</p>;
  }

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex + 1 >= questions.length;

  const handleSubmitResponse = async () => {
    if (!userResponse.trim() || !currentQuestion) return;

    setSubmitting(true);
    try {
      const result = await evaluateAnswer({
        question: currentQuestion.question,
        answer: userResponse,
        jobRole: interview.jobRole,
        experienceLevel: interview.experienceLevel,
      });
      setFeedback(result);
      setResults((prev) => [
        ...prev,
        { question: currentQuestion.question, score: result.score },
      ]);
    } catch (err) {
      setErrorMessage(err.message);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    setUserResponse("");
    setFeedback(null);
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const buildHistoryRecord = (recordStatus) => {
    const answered = results.length;
    const total = questions.length;
    const avgScore10 =
      answered > 0 ? results.reduce((sum, r) => sum + (r.score || 0), 0) / answered : 0;

    return {
      id: Date.now(),
      jobRole: interview.jobRole,
      interviewType: interview.interviewType || "Mixed Interview",
      status: recordStatus,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      duration: `${interview.interviewDuration} min`,
      score: Math.round(avgScore10 * 10),
      questions: `${answered} / ${total}`,
    };
  };

  const handleFinishInterview = () => {
    saveInterviewRecord(buildHistoryRecord("Completed"));
    localStorage.removeItem("currentInterview");
    navigate("/history");
  };

  const handleStopInterview = () => {
    if (results.length > 0) {
      saveInterviewRecord(buildHistoryRecord("Terminated"));
    }
    localStorage.removeItem("currentInterview");
    navigate("/history");
  };

  return (
    <div className="MIPageWrapper">
      <header className="MIPH">
        <div className="mainHeadingMI">
          <h2>AI Mock Interview</h2>
          <p>{interview.type}</p>
        </div>

        <div className="stopBTN">
          <button
            title="Stop Interview"
            className="stopInterviewButton"
            onClick={handleStopInterview}
          >
            Stop Interview
          </button>
        </div>
      </header>

      <ProgressSection current={currentIndex + 1} total={questions.length} />
      <AiQuestions question={currentQuestion} number={currentIndex + 1} />
      <UserAnswer
        userResponse={userResponse}
        setUserResponse={setUserResponse}
      />

      {!feedback && (
        <button
          className="submitResponse"
          onClick={handleSubmitResponse}
          disabled={submitting}
        >
          {submitting ? "Evaluating..." : "Submit Response"}
        </button>
      )}

      {feedback && (
        <div className="feedbackBox">
          <p className="feedbackScore">
            Score: {feedback.score}/10 — {feedback.correctness}
          </p>
          <h4>Strengths</h4>
          <ul>
            {feedback.strengths?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <h4>Improvements</h4>
          <ul>
            {feedback.improvements?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <p className="modelAnswerSummary">{feedback.modelAnswerSummary}</p>

          {isLastQuestion ? (
            <button className="finishInterviewBtn" onClick={handleFinishInterview}>
              Finish Interview
            </button>
          ) : (
            <button className="nextQuestionBtn" onClick={handleNextQuestion}>
              Next Question
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MockInterview;