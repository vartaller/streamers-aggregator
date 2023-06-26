import React from 'react';
import PropTypes from 'prop-types';
import StreamersRow from '../row/row';
import './list.css';

type StreamersListProps = {
  rootClassName?: string;
};

const StreamersList: React.FC<StreamersListProps> = ({
  rootClassName = '',
}) => {
  return (
    <div className={`streamers-list-container ${rootClassName}`}>
      <div className="streamers-list-container1">
        <StreamersRow></StreamersRow>
        <StreamersRow></StreamersRow>
        <StreamersRow></StreamersRow>
        <StreamersRow></StreamersRow>
        <StreamersRow></StreamersRow>
      </div>
    </div>
  );
};

StreamersList.propTypes = {
  rootClassName: PropTypes.string,
};

export default StreamersList;
