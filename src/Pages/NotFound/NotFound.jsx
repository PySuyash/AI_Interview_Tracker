import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="NotFound">
      <div className="error">
        <h1>Page Not Found</h1>
        <p>The page you are trying to reach does not exist!</p>
        <button onClick={handleClick}>Back to homepage</button>
      </div>
    </div>
  );
};

export default NotFound;