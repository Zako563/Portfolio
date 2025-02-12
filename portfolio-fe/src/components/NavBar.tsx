import React, { useState, useEffect } from 'react';
import { PathRoutes } from '../path.routes';
import { NavLink } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file

const navigationItems = [
  { label: 'Home', path: PathRoutes.HomePage },
  { label: 'Zakaria', path: '/zako' },
  { label: 'Contact', path: '/project' },
];

export const NavBar: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN'); // State to track current language

  // Check if a token exists in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, []);

  const handleLoginRedirect = () => {
    setLoading(true);
    const audience = 'https://dev-gvcipzccm8rh8aqe.us.auth0.com/api/v2/';
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

    window.location.href =
      `https://dev-gvcipzccm8rh8aqe.us.auth0.com/authorize?` +
      `response_type=token&` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `scope=openid profile email read:current_user read:roles&` +
      `audience=${audience}&` +
      `prompt=login`;
  };

  const handleLogoutRedirect = () => {
    // Clear local storage and cookies related to Auth0
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    document.cookie = 'auth0=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    // Update the login state
    setIsLoggedIn(false);

    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const returnTo = process.env.REACT_APP_URL || window.location.origin;

    window.location.href =
      `https://dev-gvcipzccm8rh8aqe.us.auth0.com/v2/logout?` +
      `client_id=${clientId}&` +
      `returnTo=${encodeURIComponent(returnTo)}`;
  };


  const handleLanguageChange = (lang: string) => {
    const googleTranslateElement = document.querySelector(
      '.goog-te-combo'
    ) as HTMLSelectElement;
    

    if (googleTranslateElement) {
      googleTranslateElement.value = lang;
      googleTranslateElement.dispatchEvent(new Event('change'));
      setCurrentLanguage(lang === 'en' ? 'EN' : 'FR'); // Update the language state
      
    } else {
      console.error('Google Translate dropdown not found');
    }
    
  };
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container" role="menubar">
      <div id="google_translate_element" style={{ display: 'none' }}></div>{' '}
      {/* Hidden Google Translate element */}
        {navigationItems.map(item => (
          <NavLink
            key={item.label}
            to={item.path}
            role="menuitem"
          >
            {item.label}
          </NavLink>
        ))}
        {isLoggedIn ? (
          <button onClick={handleLogoutRedirect}>
            Logout
          </button>
        ) : (
          <button
            onClick={handleLoginRedirect}
            disabled={loading}
          >
            {loading ? 'Redirecting to Auth0...' : 'Login'}
          </button>
        )}
      </div>

      <div className="dropdown">
            <button className="navItem">
              {currentLanguage} {/* Display current language */}
            </button>
            <div className="dropdownContent">
              <button onClick={() => handleLanguageChange('en')}>
                English
              </button>
              <button onClick={() => handleLanguageChange('fr')}>French</button>
            </div>
          </div>
    </nav>
  );
};