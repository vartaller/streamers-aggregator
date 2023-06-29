import React from 'react';
import PropTypes from 'prop-types';
import Votes from '../votes/votes';
import './card.css';
import { PLATFORM_IMG } from '../../utils/constants/platforms';
import { StreamerCardProps } from './cart.type';

const StreamerCard: React.FC<StreamerCardProps> = ({
  id,
  fullName,
  img,
  info,
  platform,
  likes,
  dislikes,
}) => {
  return (
    <div className={`card-blog-post-card`}>
      <img alt={fullName} src={img} className="card-image" />
      <div className="card-container">
        <Votes upvotes={likes} downvotes={dislikes} streamerId={id}></Votes>
        <h1 className="card-name">{fullName}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: info.replace(/(?:\r\n|\r|\n)/g, '<br />'),
          }}
          className="card-text"
        ></div>
        <div className="card-container-platform">
          <div className="card-profile">
            <img
              alt={platform}
              src={PLATFORM_IMG[platform]}
              className="card-image-platform"
            />
            <span className="card-text-platform">{platform}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

StreamerCard.propTypes = {
  id: PropTypes.number.isRequired,
  fullName: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
};

export default StreamerCard;
