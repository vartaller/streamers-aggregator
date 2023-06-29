import axios from 'axios';
import { API_URL } from '../constants/envVars';

type StreamerSubmitDto = {
  fullName: string;
  img: string;
  info: string;
  platform: string;
};

export const postNewStreamer = async (streamer: StreamerSubmitDto) => {
  try {
    await axios.post(`${API_URL}/streamers`, {
      ...streamer,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};
