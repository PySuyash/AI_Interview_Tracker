import './UserAnswer.css';

const UserAnswer = ({ userResponse, setUserResponse }) => {
  return (
    <div className='userAnswers'>
      <textarea value={userResponse} placeholder='Your Response Here ...' onChange={(e) => {setUserResponse(e.target.value)}} rows={4} />
    </div>
  )
}

export default UserAnswer