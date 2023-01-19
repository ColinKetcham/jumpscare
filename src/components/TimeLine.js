import React, { useState } from 'react';

const TimeLine = () => {
  const [current, setCurrent] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const pressPlay = () => {
    console.log('pressed play');

    setIsActive(true);
    playing();
  };

  const playing = () => {
    let value = 0;
    let interval = 1000; // ms
    let expected = Date.now() + interval;
    setTimeout(step, interval);
    function step() {
      let dt = Date.now() - expected; // the drift (positive for overshooting)
      if (dt > interval) {
        // something really bad happened. Maybe the browser (tab) was inactive?
        // possibly special handling to avoid futile "catch up" run
      }
      value += 1;
      setCurrent(value);
      console.log('playing', isActive, current);
      expected += interval;
      if (isActive) {
        setTimeout(step, Math.max(0, interval - dt)); // take into account drift
      }
    }
  };
  const pressPause = () => {
    //setIsActive(false);
    console.log(isActive);
  };

  return (
    <div>
      <button onClick={pressPlay}>play</button>
      <button onClick={pressPause}>pause</button>
      {current}
    </div>
  );
};

export default TimeLine;
