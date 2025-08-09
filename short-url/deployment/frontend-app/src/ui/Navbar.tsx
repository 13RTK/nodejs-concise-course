import { useNavigate } from 'react-router';
import ThemeToggle from './ThemeToggle';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar shadow-sm bg-primary text-primary-content">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl" onClick={() => navigate('/')}>
          Alex Short URL
        </a>
      </div>

      <div className="navbar-end">
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
