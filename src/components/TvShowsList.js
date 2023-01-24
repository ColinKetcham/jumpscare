import React, { useEffect } from 'react';
import ListItem from './ListItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMedias } from '../redux/medias';

import { strangerthings } from '../dummyData';

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
      <ListItem item={strangerthings} />;
    </div>
  );
};

export default TvList;
