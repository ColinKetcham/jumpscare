import React from 'react';

const addSecs = (time, includeSeconds) => {
  if (includeSeconds) {
    return <span>:{('0' + ((time / 10) % 100)).slice(-2)}</span>;
  } else {
    return;
  }
};

const Counter = ({ time, includeSeconds }) => {
  if (time < 0) {
    return;
  }
  if (!includeSeconds) {
    time += 1000;
  }

  return (
    <div className='counter'>
      <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      {/* {addSecs(time, includeSeconds)} */}
    </div>
  );
};

export default Counter;
