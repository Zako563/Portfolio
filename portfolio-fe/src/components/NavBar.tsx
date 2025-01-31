import React, { useState } from 'react';
import { PathRoutes } from '../path.routes';
import { NavLink } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file

const navigationItems = [
  { label: 'Home', path: PathRoutes.HomePage },
  { label: 'Account', path: '/zako' },
  { label: 'Projects', path: '/project' },
];

export const NavBar: React.FC = () => {
  const [loading, setLoading] = useState(false);

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

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container" role="menubar">
        {navigationItems.map(item => (
          <NavLink
            key={item.label}
            to={item.path}
            role="menuitem"
          >
            {item.label}
          </NavLink>
        ))}
        <button
          onClick={handleLoginRedirect}
          disabled={loading}
        >
          {loading ? 'Redirecting to Auth0...' : 'Login'}
        </button>
      </div>
    </nav>
  );
};