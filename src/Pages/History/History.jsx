import { useState, useEffect } from 'react';
import HistoryHeader from "../../Components/InterviewHistoryHeader/HistoryHeader"
import HistoryControls from "../../Components/HistoryControls/HistoryControls"
import Summary from "../../Components/SummaryHistory/Summary"
import HistoryCard from "../../Components/HistoryCard/HistoryCard"
import Footer from '../../Components/Footer/Footer'
import { getInterviewHistory } from '../../Services/historyStorage';

import './History.css'

const TYPE_FILTER_MAP = {
  technical: "Technical Interview",
  behavioural: "Behavioral Interview",
  mixed: "Mixed Interview",
};

const STATUS_FILTER_MAP = {
  completed: "Completed",
  stoped: "Terminated",
};

const History = () => {
  const [interviewHistory, setInterviewHistory] = useState([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setInterviewHistory(getInterviewHistory());
  }, []);

  const filteredHistory = interviewHistory.filter((interview) => {
    const typeMatches =
      typeFilter === 'all' || interview.interviewType === TYPE_FILTER_MAP[typeFilter];
    const roleMatches = roleFilter === 'all' || interview.jobRole === roleFilter;
    const statusMatches =
      statusFilter === 'all' || interview.status === STATUS_FILTER_MAP[statusFilter];
    return typeMatches && roleMatches && statusMatches;
  });

  const total = interviewHistory.length;
  const completed = interviewHistory.filter((i) => i.status === 'Completed').length;
  const avgScore =
    total > 0
      ? Math.round(interviewHistory.reduce((sum, i) => sum + i.score, 0) / total)
      : 0;

  return (
    <div className="HistoryPage">
        <header>
          <HistoryHeader/>
        </header>
        <main>
          <section>
            <HistoryControls
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              roleFilter={roleFilter}
              setRoleFilter={setRoleFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </section>
          <section>
            <Summary total={total} completed={completed} avgScore={avgScore} />
          </section>
          <section>
            <div id="pih-02">
              <h2>Previous Interviews</h2>
            </div>
            <div className="cards">
              {
                filteredHistory.length > 0 ? (
                  filteredHistory.map((interview) => (
                  <HistoryCard
                    key={interview.id}
                    interview={interview}
                  />
                ))
                ) : (
                  <p className="niyet">No Interviews yet !</p>
                )
              }
            </div>
          </section>
        </main>
        <footer className="historyFooter">
          <Footer/>
        </footer>
    </div>
  )
}

export default History