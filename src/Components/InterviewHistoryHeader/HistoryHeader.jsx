import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HistoryHeader.css';

const HistoryHeader = () => {

  const navigate = useNavigate();

  return (
    <div className='H_Head'>

        <div className="main-heading">
            <h1>History</h1>
        </div>

        <div className="createInterviewBtn">
            <div className="button" onClick={() => {navigate('/createinterview')}}><Plus size={24}/> <p>Create Interview</p></div>
        </div>

    </div>
  )
}

export default HistoryHeader
