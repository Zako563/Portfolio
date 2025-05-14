import { useState, useEffect } from 'react';
import { PathRoutes } from '../path.routes';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const navigationItems = [
  { label: 'Home', path: PathRoutes.HomePage },
  { label: 'Zakaria', path: '/zako' },
  { label: 'Contact', path: '/project' },
];

export const NavBar = () => {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'EN' | 'FR'>('EN');
  const [menuOpen, setMenuOpen] = useState(false);          // NEW

  /* ──────────── Auth state ──────────── */
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('access_token'));
  }, []);

  const handleLoginRedirect = () => {
    setLoading(true);
    const audience = 'https://dev-gvcipzccm8rh8aqe.us.auth0.com/api/v2/';
    const clientId     = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const redirectUri  = process.env.REACT_APP_AUTH0_CALLBACK_URL;
    window.location.href =
      `https://dev-gvcipzccm8rh8aqe.us.auth0.com/authorize?` +
      `response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&` +
      `scope=openid profile email read:current_user read:roles&audience=${audience}&prompt=login`;
  };

  const handleLogoutRedirect = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    document.cookie = 'auth0=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setIsLoggedIn(false);
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const returnTo = process.env.REACT_APP_URL || window.location.origin;
    window.location.href =
      `https://dev-gvcipzccm8rh8aqe.us.auth0.com/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(returnTo)}`;
  };

  /* ──────────── Language toggle ──────────── */
  const handleLanguageChange = (lang: 'en' | 'fr') => {
    const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event('change'));
      setCurrentLanguage(lang === 'en' ? 'EN' : 'FR');
    } else {
      console.error('Google Translate dropdown not found');
    }
    setMenuOpen(false);        // close menu after click on mobile
  };

  /* ──────────── Render ──────────── */
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      {/* Hamburger button (only visible on small screens) */}
      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span /><span /><span />
      </button>

      {/* Collapsible menu */}
      <div className={`navbar-container ${menuOpen ? 'show' : ''}`} role="menubar">
        <div id="google_translate_element" style={{ display: 'none' }} />

        {navigationItems.map(item => (
          <NavLink
            key={item.label}
            to={item.path}
            role="menuitem"
            onClick={() => setMenuOpen(false)}   // close after navigation on mobile
          >
            {item.label}
          </NavLink>
        ))}

        {isLoggedIn ? (
          <button onClick={handleLogoutRedirect}>Logout</button>
        ) : (
          <button onClick={handleLoginRedirect} disabled={loading}>
            {loading ? 'Redirecting…' : 'Login'}
          </button>
        )}

        {/* Language dropdown */}
        <div className="dropdown">
          <button className="navItem">{currentLanguage}</button>
          <div className="dropdownContent">
            <button onClick={() => handleLanguageChange('en')}>English</button>
            <button onClick={() => handleLanguageChange('fr')}>Français</button>
          </div>
        </div>
      </div>
    </nav>
  );
};
