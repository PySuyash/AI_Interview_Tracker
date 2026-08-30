import Warning from '../../Components/WarningCardClearStorage/Warning';
import './CLS.css';

const CLS = () => {
  return (
    <div className='clsWrapper'>

      <header className='clsHeader'>
        <h1>Clear Local Storage</h1>
        <p>Manage and remove the interview data stored locally in this browser</p>
      </header>

      <main>
        <Warning/>
      </main>

    </div>
  )
}

export default CLS
