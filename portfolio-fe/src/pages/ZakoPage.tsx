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
      // Check the scroll position
      if (window.scrollY > 700) { // Adjust this value as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className={`shared-background ${isScrolled ? 'fade-out' : ''}`}>
        <ZakoList />
        <ProjectList />
        <Footer />
      </div>
    </>
  );
}