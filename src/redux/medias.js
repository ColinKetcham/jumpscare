import axios from 'axios';
import { serverUrl } from './constants';

//action constant
const SET_MEDIAS = 'SET_MEDIAS';
const CREATE_MEDIA = 'CREATE_MEDIA';
const DELETE_MEDIA = 'DELETE_MEDIA';
const UPDATE_MEDIA = 'UPDATE_MEDIA';

//action function
export const setMedias = (medias) => ({ type: SET_MEDIAS, medias });

export const _createMedia = (media) => ({ type: CREATE_MEDIA, media });

export const _deleteMedia = (media) => ({ type: DELETE_MEDIA, media });

//thunk
export const fetchMedias = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/media`);
      dispatch(setMedias(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createMedia = (media, history) => {
  return async (dispatch) => {
    const { data: created } = await axios.post(`${serverUrl}/api/media`, media);
    dispatch(_createMedia(created));
    history.push('/medias/all');
  };
};

export const deleteMedia = (id, history) => {
  return async (dispatch) => {
    const { data: media } = await axios.delete(`${serverUrl}/api/medias/${id}`);
    dispatch(_deleteMedia(media));
    //history.push('/');
  };
};
// Reducer
export default function mediasReducer(state = [], action) {
  switch (action.type) {
    case SET_MEDIAS:
      return action.medias;
    case CREATE_MEDIA:
      return [...state, action.media];
    case UPDATE_MEDIA:
      return state.map((media) =>
        media.id === action.media.id ? action.media : media
      );
    case DELETE_MEDIA:
      return state.filter((media) => media.id !== action.media.id);
    default:
      return state;
  }
}
