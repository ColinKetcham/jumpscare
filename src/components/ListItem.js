import React from 'react';

import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@mui/material';

import Link from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteMedia } from '../redux/media';

const ListItem = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stamps = item.stamps;
  let stampLength = 0;
  if (stamps !== undefined) {
    stampLength = stamps.length;
  }

  const remove = () => {
    dispatch(deleteMedia(item.id));
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '1rem' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={item.still_path}
        title={item.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h4' component='div'>
          {item.title}
        </Typography>
        <Typography gutterBottom variant='h6' component='div'>
          {item.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {item.overview}
        </Typography>
        <Typography
          variant='body1'
          color='text.primary'
          sx={{ paddingTop: '1rem' }}
        >
          number of alerts:{stampLength}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          onClick={() => {
            navigate(
              `/player?show=${item.tvid}&season=${item.season_number}&episode=${item.episode_number}`
            );
          }}
        >
          Play
        </Button>
        <Button
          size='small'
          onClick={() => {
            navigate(
              `/recorder?show=${item.tvid}&season=${item.season_number}&episode=${item.episode_number}`
            );
          }}
        >
          Add jumps
        </Button>
        {/* <Button size='small'>View</Button> */}
        {/* <Button size='small' sx={{ color: 'red' }} onClick={remove}>
          Remove
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default ListItem;
