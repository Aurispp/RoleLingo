import React, { useState, useEffect } from 'react';

const Timer = ({ initialSeconds, onComplete }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => {
          if (seconds <= 1) {
            clearInterval(interval);
            setIsActive(false);
            if (onComplete) {
              onComplete();
            }
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

  // Convert seconds to MM:SS format
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-6xl font-bold text-[#4169e1]">
      {formatTime(seconds)}
    </div>
  );
};

export default Timer;