/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/menuOrder');
  };

  return (
    <main className="homePage">
      {/* Left Section: Text Content */}
      <div className="welcomeText">
        <h4>Welcome</h4>
        <h1>
          Zakaria <br /> Boudboub
        </h1>
        <p className="paragraph}=">
       THIS IS MY PORTFOLIO
        </p>
        <button className="button" onClick={handleClick}>
          Order Now
        </button>
      </div>
    </main>
  );
};
