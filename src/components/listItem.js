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

const ListItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
        title={item.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {item.name} {item.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {item.overview}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          onClick={() => {
            navigate('/player');
          }}
        >
          Play
        </Button>
        <Button size='small'>Add jumps</Button>
      </CardActions>
    </Card>
  );
};

export default ListItem;
