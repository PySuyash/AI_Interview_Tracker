import './QuickActions.css';
import { Plus, StickyNote } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  return (
    <div className="quickActions">
      <header className="top">
        <h3>Quick Actions</h3>
        <p>Start practicing and manage your interview journey</p>
      </header>

      <main className="main-part">
        <div className="card createInterview">
          <h3>Create Interview</h3>
          <p>Start a new AI interview</p>
          <Link to="/createinterview" className="btn btn-primary">
            <Plus size={20} />
            <span>Create Interview</span>
          </Link>
        </div>

        <div className="card interviewHistory">
          <h3>Interview History</h3>
          <p>Review your previous work</p>
          <Link to="/history" className="btn btn-secondary">
            <StickyNote size={20} />
            <span>View History</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default QuickActions;