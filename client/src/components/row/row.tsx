import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Votes from '../votes/votes';
import './row.css';

type StreamersRowProps = {
  rootClassName?: string;
  streamerName?: string;
  textReadMore?: string;
};

const StreamersRow: React.FC<StreamersRowProps> = ({
  rootClassName = '',
  streamerName = 'Lorem ipsum dolor sit amet',
  textReadMore = 'Read More ->',
}) => {
  return (
    <div className={`streamers-row-blog-post-card ${rootClassName}`}>
      <span className="row-name">{streamerName}</span>
      <div className="row-interact-container">
        <Votes rootClassName="votes-root-class-name" />
        <Link to="/profile" className="row-btn-text">
          {textReadMore}
        </Link>
      </div>
    </div>
  );
};

StreamersRow.propTypes = {
  rootClassName: PropTypes.string,
  streamerName: PropTypes.string,
  textReadMore: PropTypes.string,
};

export default StreamersRow;
