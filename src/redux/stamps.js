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
  duration: 0,
  img: '',
  id: null,
};

export const fetchStamps = createAsyncThunk('stamp/fetch', async (show) => {
  try {
    const { data } = await axios.get(`${serverUrl}/api/stamps`, {
      params: show,
    });

    data.stamps = data.stamps.sort((a, b) => {
      return a.startTime - b.startTime;
    });

    return data;
  } catch (error) {
    console.error(error);
  }
});

export const createStamp = createAsyncThunk(
  'stamp/createNew',
  async (stamp) => {
    const token = window.localStorage.getItem('token');
    const { data: created } = await axios.post(
      `${serverUrl}/api/stamps`,
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

export const deleteStamp = createAsyncThunk('stamp/deletestamp', async (id) => {
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
      state.id = null;
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
        if (payload.stamps.length === 0) {
          state.stamp = [{ description: 'no stamps' }];
        } else {
          state.stamp = payload.stamps;
        }
        state.loaded = true;
        state.title = payload.title;
        state.duration = parseInt(payload.runtime) * 60000;
        state.img = payload.still_path;
        state.id = payload.id;
      })
      .addCase(fetchStamps.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
        state.loaded = false;
        state.stamp = [];
        state.title = 'error';
      })
      .addCase(createStamp.fulfilled, (state, action) => {
        state.status = 'success';
        state.loaded = true;
        state.stamp = [...state.stamp, action.payload];
      })
      .addCase(deleteStamp.fulfilled, (state, action) => {
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
