import axios from 'axios';
import { API_URL } from '../constants/envVars';

export const putStreamerVote = async (streamerId: number, isLlike: boolean) => {
  try {
    const newVotes = await axios.put(
      `${API_URL}/streamers/${streamerId}/vote`,
      {
        isLlike: isLlike,
      }
    );
    return newVotes.data;
  } catch (error) {
    console.log(error);
  }
};
