import React from 'react';
import ListItem from './listItem';

import { popularMovies } from '../dummyData';

const list = () => {
  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {popularMovies.results.map((item) => {
        return <ListItem item={item} key={item.id} />;
      })}
    </div>
  );
};

export default list;
