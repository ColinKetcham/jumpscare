import axios from 'axios';

export const searchTMDB = async (name) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/tmdb`,
      {
        params: { name: name },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
