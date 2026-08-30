import './Summary.css'

const Summary = ({ total, completed, avgScore }) => {
  return (
    <div className='summary'>

        <div className="total">
            <h6>Total</h6>
            <p>{total}</p>
        </div>

        <div className="completed">
            <h6>Completed</h6>
            <p>{completed}</p>
        </div>

        <div className="avgScore">
            <h6>Avg. Score</h6>
            <p>{avgScore}%</p>
        </div>

    </div>
  )
}

export default Summary