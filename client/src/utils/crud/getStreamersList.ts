import axios from 'axios';
import { API_URL } from '../constants/envVars';

export const getStreamersList = async () => {
  try {
    const streamersList = await axios.get(`${API_URL}/streamers`, {});
    return streamersList.data;
  } catch (error) {
    console.log(error);
  }
};
