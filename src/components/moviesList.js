import React from 'react';
import ListItem from './listItem';

import { popularMovies } from '../dummyData';

const MovieList = () => {
  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {popularMovies.results.map((item) => {
        return (
          <ListItem item={item} key={item.id} style={{ padding: '2rem' }} />
        );
      })}
    </div>
  );
};

export default MovieList;
