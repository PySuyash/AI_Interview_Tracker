import './ProgressSection.css'

const ProgressSection = ({ current, total }) => {

    const interview = JSON.parse(localStorage.getItem('currentInterview'));

  return (
    <div className='progressSection'>
        <h4>Question {current} of {total}</h4>
        <h5>{interview.interviewDuration} minutes</h5>
    </div>
  )
}

export default ProgressSection