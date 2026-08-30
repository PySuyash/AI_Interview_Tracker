const HISTORY_KEY = "interviewHistory";

export function getInterviewHistory() {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveInterviewRecord(record) {
  const history = getInterviewHistory();
  history.unshift(record); // newest first
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}