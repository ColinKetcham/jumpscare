import { combineReducers } from 'redux';
import mediasReducer from './medias';
import stampsReducer from './stamps';
import authReducer from './auth';

const appReducer = combineReducers({
  medias: mediasReducer,
  stamps: stampsReducer,
  auth: authReducer,
});

export default appReducer;
