import { combineReducers } from 'redux';

import stampsReducer from './stamps';
import authReducer from './auth';
import media from './media';

const appReducer = combineReducers({
  stamps: stampsReducer,
  auth: authReducer,
  media: media,
});

export default appReducer;
