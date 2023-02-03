import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const initialState = {
  media: [],
  status: 'idle', //idle, loading, succeeded, failed
  loading: false,
  error: null,
};

export const fetchMedia = createAsyncThunk('media/fetchAll', async () => {
  try {
    const { data } = await axios.get(`${serverUrl}/api/media`);
    return data;
  } catch (error) {
    console.error(error);
  }
});

export const createMedia = createAsyncThunk(
  'media/createNew',
  async (media) => {
    const token = window.localStorage.getItem('token');
    const { data: created } = await axios.post(
      `${serverUrl}/api/media`,
      media,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return created;
  }
);

export const deleteMedia = createAsyncThunk('media/deleteMedia', async (id) => {
  const token = window.localStorage.getItem('token');

  const { data: media } = await axios.delete(`${serverUrl}/api/media/${id}`, {
    headers: {
      authorization: token,
    },
  });
  return media;
});

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    // getMedia: (state) => {
    //   state.status = 'loading';
    // },
    // getMediaSuccess: (state, { payload }) => {},
    // getMediaFailure: (state, { payload }) => {},
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMedia.pending, (state, action) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchMedia.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.media = payload;
        state.loading = false;
      })
      .addCase(fetchMedia.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
        state.loading = false;
        state.media = [];
      })
      .addCase(createMedia.fulfilled, (state, action) => {
        state.status = 'success';
        state.loading = false;
        state.media = [...state.media, action.payload];
      })
      .addCase(deleteMedia.fulfilled, (state, action) => {
        state.status = 'success';
        state.loading = false;
        state.media = state.media.filter(
          (media) => media.id !== action.payload.id
        );
      });
  },
});

// export const { getMedia, getMediaFailure, getMediaSuccess } =
//   mediaSlice.actions;

export default mediaSlice.reducer;
