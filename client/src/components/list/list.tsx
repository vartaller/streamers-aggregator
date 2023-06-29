import React from 'react';
import StreamersRow from '../row/row';
import './list.css';
import { StreamersListProps } from './list.type';

const StreamersList: React.FC<StreamersListProps> = ({
  streamersList = [],
}) => {
  return (
    <div className={`streamers-list-container`}>
      {streamersList.map(streamer => (
        <StreamersRow
          key={streamer.id}
          streamerId={streamer.id}
          streamerName={streamer.fullName}
          streamerLikes={streamer.likes}
          streamerDislikes={streamer.dislikes}
        />
      ))}
    </div>
  );
};

export default StreamersList;
