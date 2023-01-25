import React, { useEffect } from 'react';
import ListItem from './ListItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMedias } from '../redux/medias';

import { mediaDummy } from '../dummyData';

const TvList = () => {
  const media = useSelector((state) => state.medias);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMedias());
  }, []);

  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {media.map((item) => {
        return (
          <ListItem item={item} key={item.id} style={{ padding: '2rem' }} />
        );
      })}
    </div>
  );
};

export default TvList;
