import './Navbar.css';

function Navbar({ sections, current, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">Ed-Platform</div>
        <ul className="navbar-list">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                className={`navbar-button ${section.id === current ? 'active' : ''}`}
                onClick={() => onNavigate(section.id)}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
