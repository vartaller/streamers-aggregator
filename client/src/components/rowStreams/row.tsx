import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './row.css';
import { TEXT } from '../../utils/constants/dictionary';
import { StreamRowProps } from './row.type';

const StreamRow: React.FC<StreamRowProps> = ({
  streamTitle,
  streamDescription,
  streamGame,
  streamStartedAt,
  streamEndedAt,
  streamAverageViewers,
}) => {
  return (
    <div className={`streamers-row-blog-post-card`}>
      <span className="row-title">{streamTitle}</span>
      <div className="row-interact-container">
        <span className="row-text">{streamGame}</span>
        <div className="container-date">
          <span className="row-date">
            {format(streamStartedAt, 'dd.MM.yyyy HH:mm')}
          </span>
          <span className="row-date">
            {format(streamEndedAt, 'dd.MM.yyyy HH:mm')}
          </span>
        </div>
        <span className="row-text">Viewers: {streamAverageViewers}</span>
      </div>
    </div>
  );
};

StreamRow.propTypes = {
  streamTitle: PropTypes.string.isRequired,
  streamDescription: PropTypes.string.isRequired,
  streamGame: PropTypes.string.isRequired,
  streamStartedAt: PropTypes.instanceOf(Date).isRequired,
  streamEndedAt: PropTypes.instanceOf(Date).isRequired,
  streamAverageViewers: PropTypes.number.isRequired,
};

export default StreamRow;
