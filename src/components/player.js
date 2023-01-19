import React, { useState, useEffect } from 'react';
import { ep01StrangerJumpScares, testingStamps } from '../dummyData';
import Counter from './Counter';
import { LinearProgress, Slider, Box, Button, IconButton } from '@mui/material';

import { PlayArrowRounded, PauseRounded, Close } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

const details = testingStamps;

const Player = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const [upcoming, setUpcoming] = useState(details.jumps);
  const [active, setActive] = useState({ timeStamp: 0 });
  const [finished, setFinished] = useState([]);

  const navigate = useNavigate();

  const buffer = 10000; //10 seconds of buffer
  const duration = 900000;

  useEffect(() => {
    const initialTime = Date.now() - time;
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          return Date.now() - initialTime;
        });
      }, 1000);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    let nextActive = active;
    let nextActiveTimeStamp = 0;
    if (nextActive !== undefined) {
      nextActiveTimeStamp = nextActive.timeStamp;
    }
    if (nextActiveTimeStamp < time && nextActiveTimeStamp !== 0) {
      let newFinished = finished;
      newFinished.push(active);
      setFinished(newFinished);
      setActive({ timeStamp: 0 });
    }
    let nextAlert = upcoming[0];
    let nextStamp = 0;
    if (nextAlert !== undefined) {
      nextStamp = nextAlert.timeStamp;
    }
    if (time + buffer > nextStamp) {
      setActive(upcoming[0]);
      let newUpcomming = upcoming;
      newUpcomming.shift();
      setUpcoming(newUpcomming);
    }
  }, [time]);

  const play = () => {
    setRunning(true);
  };

  const pause = () => {
    setRunning(false);
  };

  return (
    <div
      className='stopwatch'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <IconButton
        onClick={() => {
          navigate(-1);
        }}
        sx={{
          '&:hover': {
            background: 'rgb(50,50,50)',
          },
        }}
      >
        <Close sx={{ fontSize: '3rem' }} htmlColor={'white'} />
      </IconButton>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90%',
          height: '90vh',
          backgroundColor: 'rgb(20, 20, 20)',
          padding: '1rem',
        }}
      >
        <div>{details.title}</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '90%',
          }}
        >
          Active alert :{active.description} in:
          <Counter time={active.timeStamp - time} includeSeconds={false} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '90%',
          }}
        >
          <Counter time={time} includeSeconds={true} />
          <div className='buttons'>
            {!running ? (
              <IconButton
                onClick={play}
                sx={{
                  '&:hover': {
                    background: 'rgb(50,50,50)',
                  },
                }}
              >
                <PlayArrowRounded
                  sx={{ fontSize: '3rem' }}
                  htmlColor={'white'}
                />
              </IconButton>
            ) : (
              <IconButton
                onClick={pause}
                sx={{
                  '&:hover': {
                    background: 'rgb(50,50,50)',
                  },
                }}
              >
                <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={'white'} />
              </IconButton>
            )}

            {/* <Button onClick={() => setTime(0)}>Reset</Button> */}
          </div>
          <Slider
            aria-label='time-indicator'
            size='small'
            value={time}
            min={0}
            step={1}
            max={duration}
            onChange={(_, value) => setTime(value)}
            sx={{
              color: 'white',
              height: 4,
              '& .MuiSlider-thumb': {
                width: 8,
                height: 8,
                transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                '&:before': {
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: `0px 0px 0px 8px ${'rgb(0 0 0 / 16%)'}`,
                },
                '&.Mui-active': {
                  width: 20,
                  height: 20,
                },
              },
              '& .MuiSlider-rail': {
                opacity: 0.28,
              },
            }}
          />
        </div>
      </Box>
    </div>
  );
};

export default Player;
