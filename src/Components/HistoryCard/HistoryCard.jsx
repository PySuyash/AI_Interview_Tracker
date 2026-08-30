import { Check, Calendar, Clock, X } from 'lucide-react';
import './HistoryCard.css';

const HistoryCard = ({interview}) => {
  return (
    <section className='historyCard'>

        <header className='historyCardHeader'>

            <div className="part1">
              <h3>{interview.jobRole}</h3>
              <h4>{interview.interviewType}</h4>
            </div>

            <div className="part2">
              {
                (interview.status === 'Completed') ? <p className='completedStatus'>{interview.status} <Check size={22}/></p> : <p className='Terminated'>{interview.status} <X size={22}/></p>
              }
            </div>

        </header>

        <main>

          <section className='DandT'>

            <div className="date">
              <Calendar size={20}/>
              <p>{interview.date}</p>
            </div>

            <div className="time">
              <Clock size={20}/>
              <p>{interview.duration}</p>
            </div>

          </section>

          <section className='SandQ'>
            <p>Score: {interview.score}%</p>
            <p>Questions: {interview.questions}</p>
          </section>

        </main>

    </section>
  )
}

export default HistoryCard
