import { useState, useEffect } from 'react';
import ZakoList from '../features/ZakoList';
import { NavBar } from '../components/NavBar';
import ProjectList from '../features/ProjectList';
import './Shared.css';
import Footer from '../components/Footer';

export default function ZakoPage(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 700) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Load Hyvor Talk script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://talk.hyvor.com/embed.js'; // Hyvor Talk script
    script.defer = true;
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
        
        {/* Hyvor Talk Comment Section */}
        <div id="hyvor-talk-view" data-website-id="12537" style={{ marginTop: '2rem' }}></div>

        <Footer />
      </div>
    </>
  );
}
