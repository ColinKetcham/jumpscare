// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchMedia = createAsyncThunk( 'media/fetchAll',
//    async () => {
//     try {
//       const { data } = await axios.get(`${serverUrl}/api/media`);
//       dispatch(setMedias(data));
//     } catch (error) {
//       console.error(error);
//     }
//   };
// )

// export const createMedia = (media, history) => {
//   return async (dispatch) => {
//     const { data: created } = await axios.post(`${serverUrl}/api/media`, media);
//     dispatch(_createMedia(created));
//     history.push('/medias/all');
//   };
// };

// export const deleteMedia = (id, history) => {
//   return async (dispatch) => {
//     const { data: media } = await axios.delete(`${serverUrl}/api/medias/${id}`);
//     dispatch(_deleteMedia(media));
//     //history.push('/');
//   };
// };

// const mediaSlice = createSlice({
//   name: 'media',
//   initialState: {
//     loading: false,
//     hasErrors: false,
//     media: [],
//   },
//   reducers: {
//     getMedia: (state) => {
//       state.loading = true;
//     },
//     getMediaSuccess: (state, { payload }) => {
//       state.loading = false;
//       state.hasErrors = false;
//       state.media = payload;
//     },
//     getMediaFailure: (state) => {
//       state.loading = false;
//       state.hasErrors = true;
//       state.media = [];
//     },
//   },
// });

// export const { getMedia, getMediaFailure, getMediaSuccess } =
//   mediaSlice.actions;

// export default mediaSlice.reducer;
