import axios from 'axios';
import { API_URL } from '../constants/envVars';

export const getStreamerInfo = async (id: string) => {
  try {
    const streamer = await axios.get(`${API_URL}/streamer/${id}`, {});
    return streamer.data;
  } catch (error) {
    console.log(error);
  }
};
