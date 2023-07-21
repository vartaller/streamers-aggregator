import axios from 'axios';
import { API_URL } from '../constants/envVars';

type StreamSubmitDto = {
  title: string;
  description: string;
  startedAt: string;
  endedAt: string;
  averageViewers: number;
  game: string;
  streamerId: string;
};

export const postNewStream = async (stream: StreamSubmitDto) => {
  try {
    await axios.post(`${API_URL}/streamer/${stream.streamerId}/stream`, {
      ...stream,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};
