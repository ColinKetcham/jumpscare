import axios from 'axios';
import { serverUrl } from '../redux/constants';

export const searchTMDB = async (name) => {
  try {
    const { data } = await axios.get(`${serverUrl}/api/tmdb`, {
      params: { name: name },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
