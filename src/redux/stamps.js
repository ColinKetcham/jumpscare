import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const serverUrl = process.env.REACT_APP_SERVER_URL;

// export const createStamp = (stamp, history) => {
//   return async (dispatch) => {
//     const { data: created } = await axios.post('/api/stamps', stamp);
//     dispatch(_createStamp(created));
//     history.push('/stamps/all');
//   };
// };

// export const deleteStamp = (id, history) => {
//   return async (dispatch) => {
//     const { data: stamp } = await axios.delete(`/api/stamps/${id}`);
//     dispatch(_deleteStamp(stamp));
//     //history.push('/');
//   };
// };

const initialState = {
  stamp: [],
  status: 'idle', //idle, loading, succeeded, failed
  loaded: false,
  error: null,
  title: 'loading',
};

export const fetchStamps = createAsyncThunk('stamp/fetch', async (show) => {
  try {
    const { data } = await axios.get(`${serverUrl}/api/stamps`, {
      params: show,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
});

export const createstamp = createAsyncThunk(
  'stamp/createNew',
  async (stamp) => {
    const token = window.localStorage.getItem('token');
    const { data: created } = await axios.post(
      `${serverUrl}/api/stamp`,
      stamp,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return created;
  }
);

export const deletestamp = createAsyncThunk('stamp/deletestamp', async (id) => {
  const token = window.localStorage.getItem('token');

  const { data: stamp } = await axios.delete(`${serverUrl}/api/stamp/${id}`, {
    headers: {
      authorization: token,
    },
  });
  return stamp;
});

const stampSlice = createSlice({
  name: 'stamp',
  initialState,
  reducers: {
    clearStamp: (state) => {
      state.stamp = [];
      state.status = 'idle'; //idle, loading, succeeded, failed
      state.loaded = false;
      state.error = null;
      state.title = 'loading';
    },
    // getstampSuccess: (state, { payload }) => {},
    // getstampFailure: (state, { payload }) => {},
  },
  extraReducers(builder) {
    builder
      .addCase(fetchStamps.pending, (state, action) => {
        state.status = 'loading';
        state.loaded = false;
      })
      .addCase(fetchStamps.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.stamp = payload.stamps;
        state.loaded = true;
        state.title = payload.title;
      })
      .addCase(fetchStamps.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
        state.loaded = false;
        state.stamp = [];
        state.title = 'error';
      })
      .addCase(createstamp.fulfilled, (state, action) => {
        state.status = 'success';
        state.loaded = true;
        state.stamp = [...state.stamp, action.payload];
      })
      .addCase(deletestamp.fulfilled, (state, action) => {
        state.status = 'success';
        state.loaded = true;
        state.stamp = state.stamp.filter(
          (stamp) => stamp.id !== action.payload.id
        );
      });
  },
});

export const { clearStamp } = stampSlice.actions;

export default stampSlice.reducer;
