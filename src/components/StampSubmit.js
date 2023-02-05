import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Counter from './Counter';
import { createStamp } from '../redux/stamps';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function StampSubmit({ stamps, mediaId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    stamps.forEach((stamp) => {
      stamp.id = mediaId;
      dispatch(createStamp(stamp));
    });
    navigate('/');
  };

  return (
    <Container component='main' maxWidth='md'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        {stamps.map((stamp) => {
          return (
            <div style={{ display: 'flex' }}>
              <Typography component='h2' variant='h5' sx={{ padding: '1rem' }}>
                {stamp.description}
              </Typography>
              <Typography component='h1' variant='h5' sx={{ padding: '1rem' }}>
                <Counter time={stamp.time} includeSeconds={true} />
              </Typography>
            </div>
          );
        })}

        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {/* <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name='description'
                label='Description'
                type='description'
                id='description'
                autoComplete='new-description'
              />
            </Grid>
          </Grid> */}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Submit All
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
