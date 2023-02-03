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

import { createMedia } from '../redux/media';

import { useDispatch } from 'react-redux';

const fillerImage =
  'https://www.pngitem.com/pimgs/m/279-2792492_yu-no-meme-hd-png-download.png';

const SearchItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (item.backdrop_path !== null && item.backdrop_path !== fillerImage) {
    item.backdrop_path =
      'https://image.tmdb.org/t/p/original/' + item.backdrop_path;
  } else {
    item.backdrop_path = fillerImage;
  }

  const addToServer = (item) => {
    const newMedia = {
      title: item.name,
      type: 'tv',
      tvid: item.id, //stranger things
      season_number: 1,
      episode_number: 1,
    };
    dispatch(createMedia(newMedia));
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '1rem' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={item.backdrop_path}
        title={item.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {item.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {item.overview}
        </Typography>
        <Typography
          variant='body1'
          color='text.primary'
          sx={{ paddingTop: '1rem' }}
        ></Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          onClick={() => {
            addToServer(item);
          }}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
};

export default SearchItem;
