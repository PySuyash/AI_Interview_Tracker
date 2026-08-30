import './UserAnswer.css';

const UserAnswer = ({ userResponse, setUserResponse, onSubmit }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  }
  return (
    <div className='userAnswers'>
      <textarea value={userResponse} placeholder='Your Response Here ...' onChange={(e) => {setUserResponse(e.target.value)}} onKeyDown={handleKeyDown} rows={4} />
    </div>
  )
}

export default UserAnswer