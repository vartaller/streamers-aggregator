import React from 'react';
import StreamRow from '../rowStreams/row';
import './list.css';
import { StreamsListProps } from './list.type';

const StreamsList: React.FC<StreamsListProps> = ({
  streamsList = [],
  textHeading = 'Streams',
}) => {
  return (
    <div className="streams-list-container">
      <h1 className="streams-list-heading">{textHeading}</h1>
      {streamsList.map((stream, index) => (
        <StreamRow
          key={stream.id}
          streamTitle={stream.title}
          streamDescription={stream.description}
          streamGame={stream.game}
          streamStartedAt={new Date(stream.startedAt)}
          streamEndedAt={new Date(stream.endedAt)}
          streamAverageViewers={stream.averageViewers}
        />
      ))}
    </div>
  );
};

export default StreamsList;
