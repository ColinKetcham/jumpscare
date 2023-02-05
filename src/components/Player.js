import React, { useState, useEffect } from 'react';

import Counter from './Counter';
import { LinearProgress, Slider, Box, Button, IconButton } from '@mui/material';

import { PlayArrowRounded, PauseRounded, Close } from '@mui/icons-material';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchStamps, clearStamp } from '../redux/stamps';
import { useDispatch, useSelector } from 'react-redux';

const Player = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const stamps = useSelector((state) => state.stamps.stamp);

  const title = useSelector((state) => state.stamps.title);
  const loaded = useSelector((state) => state.stamps.loaded);

  const info = useSelector((state) => state.stamps);

  const [alert, setAlert] = useState('false');

  const [next, setNext] = useState(0);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const buffer = 10000; //10 seconds of buffer

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    //first load
    let searchParam = {
      tvid: searchParams.get('show'),
      season_number: searchParams.get('season'),
      episode_number: searchParams.get('episode'),
    };
    dispatch(fetchStamps(searchParam));
  }, []);

  useEffect(() => {
    console.log('next', next);
  }, [next]);

  // useEffect(() => {
  //   setNext(0);
  // }, [stamps]);

  useEffect(() => {
    // on running change
    if (time < info.duration) {
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
    }
  }, [running]);

  useEffect(() => {
    //on time change
    if (loaded) {
      if (stamps[next].startTime < time) {
        if (next < stamps.length - 1) {
          setNext(next + 1);
          setAlert(false);
        } else {
          setNext(0);
        }
      } else if (next > 0 && stamps[next - 1].startTime > time) {
        setNext(next - 1);
      }
      if (stamps[next].startTime < time + buffer) {
        setAlert(true);
      } else {
        setAlert(false);
      }
    }
  }, [time]);

  const play = () => {
    setRunning(true);
  };

  const pause = () => {
    setRunning(false);
  };

  return (
    <>
      {loaded ? (
        <div
          className='stopwatch'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: alert ? 'black' : 'white',
          }}
        >
          <IconButton
            onClick={() => {
              dispatch(clearStamp());
              navigate(-1);
            }}
            sx={{
              '&:hover': {
                background: 'rgb(50,50,50)',
              },
            }}
          >
            <Close
              sx={{ fontSize: '3rem' }}
              htmlColor={alert ? 'black' : 'white'}
            />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90%',
              height: '90vh',
              backgroundColor: alert ? 'rgb(255, 255, 255)' : 'rgb(20, 20, 20)',
              padding: '1rem',
            }}
          >
            <div>{title}</div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '90%',
              }}
            >
              Active alert :{stamps[next].description} in:
              <Counter
                time={stamps[next].startTime - time}
                includeSeconds={false}
              />
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
                      htmlColor={alert ? 'black' : 'white'}
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
                    <PauseRounded
                      sx={{ fontSize: '3rem' }}
                      htmlColor={alert ? 'black' : 'white'}
                    />
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
                max={info.duration}
                onChange={(_, value) => {
                  setRunning(false);
                  setTime(value);
                }}
                sx={{
                  color: alert ? 'black' : 'white',
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
      ) : (
        'loading'
      )}
    </>
  );
};

export default Player;
