import { TriangleAlert, Check } from 'lucide-react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Warning.css';

const Warning = () => {

  const navigate = useNavigate();
  const [cleared, setCleared] = useState(false);

  const handleClearStorage = () => {
    localStorage.removeItem('currentInterview');
    localStorage.removeItem('interviewHistory');
    setCleared(true);
  };

  return (
    <div className='warningWrapper'>

        <header className='warningCardHeader'>
            <TriangleAlert className='alertTriangle' size={22}/>
            <h5>Warning !</h5>
        </header>

        <main className='main-content-warning-card'>

            <section className='sec-1'>
                <p>Clear your local data ?</p>
                <p>This will permanently remove your saved interview data from this browser</p>
            </section>

            <section className='sec-2'>

                <div className="whatDeleted">
                    <h5>Data that will be removed</h5>
                    <p><Check size={22}/> Interview history</p>
                    <p><Check size={22}/> Completed interview results</p>
                    <p><Check size={22}/> Terminated interview records</p>
                    <p><Check size={22}/> Saved interview session data</p>
                </div>

                <div className="whatNotDeleted">
                    <h5>What won't happen</h5>
                    <p>This data is stored locally in your browser. Clearing it will not affect your browser, other websites, or files on your device.</p>
                </div>

            </section>

            {cleared ? (
              <section className='sec-3'>
                <p className='clearedMessage'><Check size={20}/> Local storage cleared successfully.</p>
                <button className='cancel' onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
              </section>
            ) : (
              <section className='sec-3'>
                <button className='confirm' onClick={handleClearStorage}>Clear Local Storage</button>
                <button className='cancel' onClick={() => {navigate(-1)}}>Cancel</button>
              </section>
            )}
        
        </main>

    </div>
  )
}

export default Warning