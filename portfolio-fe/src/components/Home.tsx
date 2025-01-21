import React, { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './HomePage.css';

const MatrixColumn: React.FC<{ index: number, matrixDestroyed: boolean }> = memo(({ index, matrixDestroyed }) => {
  const randomLetters = Array.from({ length: 20 }, () =>
    String.fromCharCode(0x30a0 + Math.random() * (0x30ff - 0x30a0))
  ).join('');
  
  return (
    <div
      className={`matrixColumn ${matrixDestroyed ? 'destroyed' : ''}`} // Add destroyed class for animation
      style={{
        left: `${index * 3.5}%`,
        '--delay': Math.random(),
      } as React.CSSProperties}
    >
      {randomLetters.split('').map((char, idx) => (
        <span key={idx}>{char}</span>
      ))}
    </div>
  );
});

const MatrixRain: React.FC<{ matrixDestroyed: boolean }> = memo(({ matrixDestroyed }) => {
  const columns = [];
  for (let i = 0; i < 30; i++) {
    columns.push(<MatrixColumn key={i} index={i} matrixDestroyed={matrixDestroyed} />);
  }
  return <div className="matrixRain">{columns}</div>;
});

export const Home: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [matrixDestroyed, setMatrixDestroyed] = useState(false); // State to control matrix destruction
  const fullText = 'Zaakaria Boudboub'; // Full text to type

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    let typedLength = 0;

    const typingInterval = setInterval(() => {
      if (typedLength < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(typedLength));
        typedLength++;
      } else {
        clearInterval(typingInterval); // Stop typing when complete
      }
    }, 150); // Adjust typing speed

    return () => clearInterval(typingInterval); // Cleanup interval on unmount
  }, [fullText]);

  // Function to handle "Enter" button click and navigate
  const handleEnterClick = () => {
    setMatrixDestroyed(true); // Trigger matrix destruction effect
    setTimeout(() => {
      navigate('/zako'); // After animation completes, navigate to /zako
    }, 1000); // Adjust the timing (same duration as the animation)
  };

  return (
    <main className="homePage">
      {/* Falling Matrix Letters */}
      <MatrixRain matrixDestroyed={matrixDestroyed} />

      {/* Text Content with Typing Effect */}
      <div className="welcomeText">
        <h4>Welcome</h4>
        <h1 className="typing">{typedText}</h1>
        <p className="paragraph">THIS IS MY PORTFOLIO</p>
        <button className="button" onClick={handleEnterClick}>Enter</button>
      </div>
    </main>
  );
};
