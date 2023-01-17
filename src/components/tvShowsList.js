import React from 'react';
import ListItem from './listItem';

import { strangerthings } from '../dummyData';

const TvList = () => {
  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <ListItem item={strangerthings} />;
    </div>
  );
};

export default TvList;
