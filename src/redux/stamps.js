import axios from 'axios';

//action constant
const SET_STAMPS = 'SET_STAMPS';
const CREATE_STAMP = 'CREATE_STAMP';
const DELETE_STAMP = 'DELETE_STAMP';
const UPDATE_STAMP = 'UPDATE_STAMP';

//action function
export const setStamps = (stamps) => ({ type: SET_STAMPS, stamps });

export const _createStamp = (stamp) => ({ type: CREATE_STAMP, stamp });

export const _deleteStamp = (stamp) => ({ type: DELETE_STAMP, stamp });

//thunk
export const fetchStamps = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/stamps');
      dispatch(setStamps(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createStamp = (stamp, history) => {
  return async (dispatch) => {
    const { data: created } = await axios.post('/api/stamps', stamp);
    dispatch(_createStamp(created));
    history.push('/stamps/all');
  };
};

export const deleteStamp = (id, history) => {
  return async (dispatch) => {
    const { data: stamp } = await axios.delete(`/api/stamps/${id}`);
    dispatch(_deleteStamp(stamp));
    //history.push('/');
  };
};
// Reducer
export default function stampsReducer(state = [], action) {
  switch (action.type) {
    case SET_STAMPS:
      return action.stamps;
    case CREATE_STAMP:
      return [...state, action.stamp];
    case UPDATE_STAMP:
      return state.map((stamp) =>
        stamp.id === action.stamp.id ? action.stamp : stamp
      );
    case DELETE_STAMP:
      return state.filter((stamp) => stamp.id !== action.stamp.id);
    default:
      return state;
  }
}
