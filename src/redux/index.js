import { combineReducers } from 'redux';
import mediasReducer from './medias';
import stampsReducer from './stamps';

const appReducer = combineReducers({
  medias: mediasReducer,
  stamps: stampsReducer,
});

export default appReducer;
