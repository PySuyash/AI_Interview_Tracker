import './Dashboard.css'
import { Plus, NotebookPen, BrushCleaning, Menu, X, UserCheck, ChartColumn, ClockFading, Flame } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Stats from '../../Components/StatsCard/Stats'
import QuickActions from '../../Components/QuickActions/QuickActions'
import InterviewReadiness from '../../Components/IR&SP/IRandSP'
import Footer from '../../Components/Footer/Footer'
import { computeStats, computeReadiness, computeSkillPerformance } from '../../Services/dashboardStats'

const Dashboard = () => {
  // const [text, setText] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [dashboardData] = useState(() => {
    const stats = computeStats();
    const readiness = computeReadiness(stats.history);
    const skillMetrics = computeSkillPerformance(stats.history);
    return { stats, readiness, skillMetrics };
  });

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  const { stats, readiness, skillMetrics } = dashboardData;

  const statsData = [
    {
      id: 1,
      title: 'Total Interviews',
      value: String(stats.totalInterviews),
      description: 'from last month',
      change: stats.totalInterviewsChange,
      changeUnit: '',
      icon: UserCheck,
    },
    {
      id: 2,
      title: 'Average Score',
      value: `${stats.avgScoreOverall}%`,
      description: 'from last month',
      change: stats.avgScoreChange,
      changeUnit: '%',
      icon: ChartColumn,
    },
    {
      id: 3,
      title: 'Practice Time',
      value: stats.practiceTimeValue,
      description: 'this month',
      change: stats.practiceTimeChangeHours,
      changeUnit: 'h',
      icon: ClockFading,
    },
    {
      id: 4,
      title: 'Current Streak',
      value: `${stats.streak} Day${stats.streak === 1 ? '' : 's'}`,
      description: stats.streak > 0 ? 'Keep your momentum going!' : 'Start an interview today!',
      change: 0,
      changeUnit: '',
      icon: Flame,
    },
  ];

  return (
    <div className="dashboardPage">
      <header className="dashboardHeader">
        <h1 className="logo">Dashboard</h1>

        {/* Desktop Search Bar */}
        {/* <div className="search desktopSearch">
          <Search size={18} className="searchIcon" />
          <input
            type="text"
            placeholder="Search in page..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <ArrowUpFromLine size={18} className="uploadIcon" />
        </div> */}

        {/* Mobile Menu Toggle Button */}
        <button 
          className="menuToggleBtn" 
          onClick={toggleMenu} 
          aria-label="Toggle Navigation"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Navigation Drawer */}
        <nav className={`dashboardNav ${isMenuOpen ? 'open' : ''}`}>
          {/* Mobile Search Bar (Inside Toggle Menu) */}
          {/* <div className="search mobileSearch">
            <Search size={18} className="searchIcon" />
            <input
              type="text"
              placeholder="Search in page..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <ArrowUpFromLine size={18} className="uploadIcon" />
          </div> */}

          <ul>
            <li>
              <NavLink 
                to="/createinterview" 
                className="ctaLink"
                onClick={handleLinkClick}
              >
                <Plus size={18} />
                <span>Create Interview</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/history" 
                className="navLink"
                onClick={handleLinkClick}
              >
                <NotebookPen size={18} />
                <span>History</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/clearlocalstorage" 
                className="navLink"
                onClick={handleLinkClick}
              >
                <BrushCleaning size={18}/>
                <span>Clear Storage</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className='mainportion'>
      <Stats statsData={statsData} />
      </main>
      <QuickActions/>
      <InterviewReadiness
        overallScore={readiness.overall}
        status={readiness.status}
        readinessMetrics={readiness.metrics}
        skillMetrics={skillMetrics}
      />
      <Footer/>
    </div>
  )
}

export default Dashboard