import axios from 'axios';
import { API_URL } from '../constants/envVars';

export const getStreamesByStreamerId = async (id: string) => {
  try {
    const streams = await axios.get(`${API_URL}/streamer/${id}/streams`, {});
    return streams.data;
  } catch (error) {
    console.log(error);
  }
};
