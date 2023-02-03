import React, { useEffect } from 'react';
import ListItem from './ListItem';
import { useSelector, useDispatch } from 'react-redux';

import { fetchMedia } from '../redux/media';

import { mediaDummy } from '../dummyData';

const TvList = () => {
  const media = useSelector((state) => state.media.media);
  const loading = useSelector((state) => state.media.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMedia());
  }, []);

  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {loading
        ? 'loading'
        : media.map((item) => {
            return (
              <ListItem item={item} key={item.id} style={{ padding: '2rem' }} />
            );
          })}
    </div>
  );
};

export default TvList;
