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
    <Card sx={{ maxWidth: 345, margin: '1rem' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={item.still_path}
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
        >
          number of alerts:{item.stamps.length}
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
        <Button size='small'>View</Button>
      </CardActions>
    </Card>
  );
};

export default ListItem;
