import React, { useState, useEffect } from 'react';

import Counter from './Counter';
import {
  LinearProgress,
  Slider,
  Box,
  Button,
  IconButton,
  Typography,
  Modal,
} from '@mui/material';

import { PlayArrowRounded, PauseRounded, Close } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchStamps, clearStamp } from '../redux/stamps';
import { useDispatch, useSelector } from 'react-redux';
import { useWakeLock } from 'react-screen-wake-lock';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import { Image } from 'mui-image';
import StampForm from './StampForm';
import StampSubmit from './StampSubmit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Recorder = () => {
  const handle = useFullScreenHandle();
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [stamps, setStamps] = useState([]);
  const [completed, setCompleted] = useState(false);

  const info = useSelector((state) => state.stamps);

  const [stampTime, setStampTime] = useState(0);

  const [open, setOpen] = React.useState(false);

  const [fullscreen, setFullscreen] = useState(false);

  const { isSupported, released, request, release } = useWakeLock({
    onRequest: () => console.log('Screen Wake Lock: requested!'),
    onError: () => console.log('An error happened 💥'),
    onRelease: () => console.log('Screen Wake Lock: released!'),
  });

  const handleOpen = () => {
    setOpen(true);
    setStampTime(time);
  };
  const handleClose = () => setOpen(false);

  const addStamp = (newStamp) => {
    setStamps([...stamps, newStamp]);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   console.log('stamps', stamps);
  // }, [stamps]);

  // useEffect(() => {
  //   console.log('completed', completed);
  // }, [completed]);

  useEffect(() => {
    //first load
    let searchParam = {
      tvid: searchParams.get('show'),
      season_number: searchParams.get('season'),
      episode_number: searchParams.get('episode'),
    };
    dispatch(fetchStamps(searchParam));
  }, []);

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
    if (time >= info.duration && info.duration !== 0) {
      setRunning(false);
      setCompleted(true);
    }
  }, [time]);

  useEffect(() => {
    //on time change
  }, [time]);

  const play = () => {
    setRunning(true);
    request();
  };

  const pause = () => {
    setRunning(false);
    release();
  };

  return (
    <FullScreen handle={handle}>
      <Modal className='fullscreen-enabled' open={open} onClose={handleClose}>
        <StampForm
          time={stampTime}
          handleClose={handleClose}
          addStamp={addStamp}
        />
      </Modal>
      <Modal open={completed} onClose={handleClose}>
        <StampSubmit stamps={stamps} mediaId={info.id} />
      </Modal>
      {info.loaded ? (
        <>
          <div
            className='stopwatch'
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '100vw',
                justifyContent: 'space-between',
                color: 'white',
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
                <Close sx={{ fontSize: '3rem' }} htmlColor={'white'} />
              </IconButton>
              {fullscreen ? (
                <IconButton
                  onClick={() => {
                    setFullscreen(false);
                    handle.exit();
                  }}
                  sx={{
                    '&:hover': {
                      background: 'rgb(50,50,50)',
                    },
                  }}
                >
                  <FullscreenExitIcon
                    sx={{ fontSize: '3rem' }}
                    htmlColor={'white'}
                  />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    setFullscreen(true);
                    handle.enter();
                  }}
                  sx={{
                    '&:hover': {
                      background: 'rgb(50,50,50)',
                    },
                  }}
                >
                  <FullscreenIcon
                    sx={{ fontSize: '3rem' }}
                    htmlColor={'white'}
                  />
                </IconButton>
              )}
            </div>
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
              <div>{info.title}</div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  gutterBottom
                  variant='h4'
                  component='div'
                  sx={{ color: 'white' }}
                >
                  Add time stamp
                </Typography>
                <div>
                  <IconButton
                    onClick={handleOpen}
                    sx={{
                      '&:hover': {
                        background: 'rgb(50,50,50)',
                      },
                    }}
                  >
                    <AddIcon sx={{ fontSize: '6rem' }} htmlColor={'white'} />
                  </IconButton>
                </div>
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
                      <PauseRounded
                        sx={{ fontSize: '3rem' }}
                        htmlColor={'white'}
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

          <Image
            src={info.img}
            style={{
              position: 'fixed',
              opacity: '0.1',
              bottom: '0px',
              width: '93%',
              height: '93vh',
              pointerEvents: 'none',
            }}
          />
        </>
      ) : (
        'loading'
      )}
    </FullScreen>
  );
};

export default Recorder;
