import { NavLink } from 'react-router-dom';
import './Navbar.css';

const LINKS = [
  { to: '/', label: 'Главная', end: true },
  { to: '/about', label: 'О нас' },
  { to: '/lecturers', label: 'Лекторы' },
];

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">Ed-Platform</div>
        <ul className="navbar-list">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `navbar-button${isActive ? ' active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
