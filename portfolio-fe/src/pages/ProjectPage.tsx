/* eslint-disable jsx-a11y/iframe-has-title */

import { useEffect, useState } from 'react';
import SendEmailForm from '../features/SendEmailFrom';
import { NavBar } from '../components/NavBar';
import { useGiscus } from './useGiscus';

export default function ProjectPage(): JSX.Element {
  useGiscus(); // Call the hook to load Giscus

  const [typed, setTyped] = useState('');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      setTyped((prev) => (prev + event.key).slice(-4)); // Keep only the last 4 characters
      
      const newTyped = (typed + event.key).slice(-4);
      
      if (newTyped.slice(-3) === 'lol') {
        if (audio && !audio.paused) {
          audio.pause();
          audio.currentTime = 0;
        } else {
          const newAudio = new Audio('https://rpg.hamsterrepublic.com/wiki-images/d/d7/Oddbounce.ogg');
          newAudio.play();
          setAudio(newAudio);
        }
      }
      
      if (newTyped === 'show') {
        setShowIframe((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [typed, audio]);

  return (
    <div>
      <NavBar />
      <SendEmailForm />
      {showIframe && (
    <iframe width="110" height="200" src="https://www.myinstants.com/instant/jixaw-metal-pipe-falling-sound-28270/embed/"></iframe>
      )}
    </div>
  );
}
