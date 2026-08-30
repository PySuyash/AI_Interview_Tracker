import './AiQuestions.css';

const AiQuestions = ({ question, number }) => {
  if (!question) return null;

  return (
    <div className='AiQuestionsBox'>
      <h4>Question {number}</h4>
      <p>{question.question}</p>
    </div>
  )
}

export default AiQuestions