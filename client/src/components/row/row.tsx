import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Votes from '../votes/votes';
import './row.css';
import { TEXT } from '../../utils/constants/dictionary';
import { StreamersRowProps } from './row.type';

const StreamersRow: React.FC<StreamersRowProps> = ({
  streamerId,
  streamerName,
  textReadMore = TEXT.LIST.READ_MORE_BTN,
  streamerLikes,
  streamerDislikes,
}) => {
  return (
    <div className={`streamers-row-blog-post-card`}>
      <span className="row-name">{streamerName}</span>
      <div className="row-interact-container">
        <Votes
          streamerId={streamerId}
          upvotes={streamerLikes}
          downvotes={streamerDislikes}
          rootClassName="votes-root-class-name"
        />
        <Link
          to={`/profile/${streamerName}/${streamerId}`}
          className="row-btn-text"
        >
          {textReadMore}
        </Link>
      </div>
    </div>
  );
};

StreamersRow.propTypes = {
  streamerId: PropTypes.number.isRequired,
  streamerName: PropTypes.string.isRequired,
  streamerLikes: PropTypes.number.isRequired,
  streamerDislikes: PropTypes.number.isRequired,
  textReadMore: PropTypes.string,
};

export default StreamersRow;
