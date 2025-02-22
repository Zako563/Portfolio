import { useState, useEffect } from 'react';
import ZakoList from '../features/ZakoList';
import { NavBar } from '../components/NavBar';
import ProjectList from '../features/ProjectList';
import './Shared.css';
import Footer from '../components/Footer';
import AddReviewForm from '../features/AddReviewForm';
import ReviewList from '../features/ReviewList';

// Declare HyvorTalk as a valid JSX element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hyvor-talk-comments': any;
    }
  }
}

export default function ZakoPage(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      let inputSequence = '';
  
      const handleKeyPress = (event: KeyboardEvent) => {
        inputSequence += event.key;
        if (inputSequence.endsWith('goat')) {
          window.location.href = 'https://youtu.be/ETQUINmZLUo?si=4OuG3JhsN1s5I92d'; // Redirect to "/hamid"
          inputSequence = ''; // Reset the sequence after navigation
        }
      };
  
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 700);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load Hyvor Talk script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://talk.hyvor.com/embed/embed.js';
    script.async = true;
    script.type = 'module';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className={`shared-background ${isScrolled ? 'fade-out' : ''}`}>
        <div className="illuminated-square"></div>
        <div className="illuminated-square"></div>
        <div className="illuminated-square"></div>
        <div className="illuminated-square"></div>
        <div className="illuminated-square"></div>
        <ZakoList />
        <ProjectList />
        <AddReviewForm/>
        <ReviewList/>
        <Footer />
      </div>
    </>
  );
}
