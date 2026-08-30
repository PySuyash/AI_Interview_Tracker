import { getInterviewHistory } from './historyStorage';

const SKILL_LABELS = {
  html: 'HTML',
  css: 'CSS',
  javaScript: 'JavaScript',
  typeScript: 'TypeScript',
  react: 'React',
  nodeJS: 'Node.js',
  python: 'Python',
  java: 'Java',
  sql: 'SQL',
  mongoDB: 'MongoDB',
};

function parseDurationToMinutes(durationStr) {
  const match = /^(\d+)/.exec(durationStr || '');
  return match ? parseInt(match[1], 10) : 0;
}

function isSameMonth(dateStr, month, year) {
  const d = new Date(dateStr);
  return d.getMonth() === month && d.getFullYear() === year;
}

function average(records) {
  if (records.length === 0) return 0;
  return records.reduce((sum, r) => sum + (r.score || 0), 0) / records.length;
}

export function computeStats() {
  const history = getInterviewHistory();

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  const lastMonthDate = new Date(thisYear, thisMonth - 1, 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastMonthYear = lastMonthDate.getFullYear();

  const thisMonthRecords = history.filter((r) => isSameMonth(r.date, thisMonth, thisYear));
  const lastMonthRecords = history.filter((r) => isSameMonth(r.date, lastMonth, lastMonthYear));

  const totalInterviews = history.length;
  const totalInterviewsChange = thisMonthRecords.length - lastMonthRecords.length;

  const avgScoreOverall = Math.round(average(history));
  const avgScoreChange = Math.round(average(thisMonthRecords) - average(lastMonthRecords));

  const minutesThisMonth = thisMonthRecords.reduce(
    (s, r) => s + parseDurationToMinutes(r.duration),
    0
  );
  const minutesLastMonth = lastMonthRecords.reduce(
    (s, r) => s + parseDurationToMinutes(r.duration),
    0
  );
  const practiceTimeValue = `${Math.floor(minutesThisMonth / 60)}h ${minutesThisMonth % 60}m`;
  const practiceTimeChangeHours = Math.round((minutesThisMonth - minutesLastMonth) / 60);

  // Streak: consecutive calendar days (ending today or yesterday) with >=1 interview
  const dateSet = new Set(history.map((r) => new Date(r.date).toDateString()));
  const countStreakFrom = (startDate) => {
    let streak = 0;
    const cursor = new Date(startDate);
    while (dateSet.has(cursor.toDateString())) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  };
  let streak = countStreakFrom(new Date());
  if (streak === 0) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    streak = countStreakFrom(yesterday);
  }

  return {
    totalInterviews,
    totalInterviewsChange,
    avgScoreOverall,
    avgScoreChange,
    practiceTimeValue,
    practiceTimeChangeHours,
    streak,
    history,
  };
}

export function computeReadiness(history) {
  const technicalRecords = history.filter((r) => r.interviewType === 'Technical Interview');
  const behavioralRecords = history.filter((r) => r.interviewType === 'Behavioral Interview');

  const overall = Math.round(average(history));
  const technical = technicalRecords.length > 0 ? Math.round(average(technicalRecords)) : overall;
  const behavioral = behavioralRecords.length > 0 ? Math.round(average(behavioralRecords)) : overall;

  const status =
    overall >= 85 ? 'Ready' :
    overall >= 70 ? 'Almost Ready' :
    overall >= 50 ? 'Needs Practice' :
    'Not Ready';

  return {
    overall,
    status,
    metrics: [
      { label: 'Technical Knowledge', value: technical },
      { label: 'Communication', value: behavioral },
      { label: 'Problem Solving', value: technical },
      { label: 'Confidence', value: overall },
    ],
  };
}

export function computeSkillPerformance(history) {
  const skillTotals = {};

  history.forEach((record) => {
    (record.skills || []).forEach((skill) => {
      if (skill === 'none' || !SKILL_LABELS[skill]) return;
      if (!skillTotals[skill]) skillTotals[skill] = { sum: 0, count: 0 };
      skillTotals[skill].sum += record.score || 0;
      skillTotals[skill].count += 1;
    });
  });

  return Object.entries(skillTotals).map(([skill, { sum, count }]) => ({
    skill: SKILL_LABELS[skill],
    value: Math.round(sum / count),
  }));
}