import React, { useState, useEffect } from 'react';

const Timer = ({ initialSeconds, onComplete }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [fadeLevel, setFadeLevel] = useState(0); // 0 = fully visible, 1 = invisible

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => {
          // Start very slight fade at 3 seconds
          if (seconds === 4) {
            setFadeLevel(0.2);
          }
          // Increase fade at 2 seconds
          if (seconds === 3) {
            setFadeLevel(0.3);
          }
          // More noticeable fade at 2 seconds
          if (seconds === 2) {
            setFadeLevel(0.5);
          }
          // Major fade in last second
          if (seconds === 1) {
            setFadeLevel(0.8);
          }

          if (seconds <= 1) {
            clearInterval(interval);
            setIsActive(false);
            setFadeLevel(1);
            setTimeout(() => {
              if (onComplete) {
                onComplete();
              }
            }, 800); // Give time for the final fade
            return 0;
          }
          return seconds - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, seconds, onComplete]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  }
  return (
    <div className="transition-all duration-1000 ease-in-out flex flex-col items-center"
         style={{
           opacity: isVisible ? 1 - fadeLevel : 0,
         }}>
      <div className="text-6xl font-bold text-[#4169e1]">{formatTime(seconds)}</div>
      {seconds <= 20 && (
        <button 
          onClick={toggleTimer}
          className="mt-4"
        >
          {isActive ? 'Help?' : 'Resume'}
        </button>
      )}
    </div>
  );
};

export default Timer;
