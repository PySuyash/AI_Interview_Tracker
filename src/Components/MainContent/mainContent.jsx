import './mainContent.css';
import { House, Plus, FileText, ArrowUpRight, BrushCleaning } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'View overall progress, performance metrics, and recent interview insights.',
    icon: House,
    path: '/dashboard',
  },
  {
    id: 'create-interview',
    title: 'Create Interview',
    description: 'Set up custom AI-driven mock interviews with tailored tech stacks.',
    icon: Plus,
    path: '/createinterview',
  },
  {
    id: 'interview-history',
    title: 'Interview History',
    description: 'Review transcripts, AI feedback reports, and area-of-improvement logs.',
    icon: FileText,
    path: '/history',
  },
  {
    id: 'clear-local-storage',
    title: 'Clear Local Storage',
    description: 'Clear your locally stored interview data from this browser. This action cannot be undone.',
    icon: BrushCleaning,
    path: './clearlocalstorage',
  }
];

const MainContent = () => {
  return (
    <div className="navContainer">
      <header className="navHeader">
        <h2>Welcome Back</h2>
        <p>Select a workspace to start practicing or reviewing your sessions.</p>
      </header>

      <div className="navPages">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link key={item.id} to={item.path} className="navCard">
              <div className="cardHeader">
                <div className="iconWrapper">
                  <IconComponent className="icon" size={28} />
                </div>
                <ArrowUpRight className="arrowIcon" size={20} />
              </div>
              
              <div className="cardBody">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MainContent;