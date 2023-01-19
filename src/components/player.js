import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button } from '@mui/material';

const Player = () => {
  const [startTime, setStart] = useState(0);
  const [watchTime, setWatch] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    console.log(startTime);
    setWatch(0);
  }, [startTime]);

  const clickPlay = () => {
    if (startTime === 0) {
      setIsActive(true);
      console.log('playing');
      setStart(Date.now());
      setWatch(0);
      var interval = 1000; // ms
      var expected = Date.now() + interval;
      setTimeout(step, interval);
      function step() {
        var dt = Date.now() - expected; // the drift (positive for overshooting)
        if (dt > interval) {
          // something really bad happened. Maybe the browser (tab) was inactive?
          // possibly special handling to avoid futile "catch up" run
        }
        // do what is to be done
        setWatch(Date.now() - startTime);
        expected += interval;
        if (isActive) {
          setTimeout(step, Math.max(0, interval - dt)); // take into account drift
        }
      }
    }
  };

  const clickStop = () => {
    setStart(0);
    setIsActive(false);
  };

  return (
    <div>
      Player
      <Button onClick={clickPlay}>Play</Button>
      <Button onClick={clickStop}>Stop</Button>
      {watchTime}
    </div>
  );
};

export default Player;
