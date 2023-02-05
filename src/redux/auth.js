import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const TOKEN = 'token';

const SET_AUTH = 'SET_AUTH';

const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get(`${serverUrl}/api/auth/me`, {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password /*, method*/) => async (dispatch) => {
    try {
      const method = 'login'; // this func can be used to sign up as well
      const res = await axios.post(`${serverUrl}/api/auth/${method}`, {
        username,
        password,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function authReducer(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
