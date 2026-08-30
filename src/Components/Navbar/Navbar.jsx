import './Navbar.css';
import { BrushCleaning } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <header className="navbar-header">
      <h1 className="navbar-title">AI Interview Tracker</h1>
      <div className="navbar-options" title='Clear Local Storage'>
        <Link to='/clearlocalstorage'>
        <BrushCleaning className="navbar-icon" /></Link>
      </div>
    </header>
  );
};

export default Navbar;