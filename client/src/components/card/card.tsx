import React from 'react';
import PropTypes from 'prop-types';
import Votes from '../votes/votes';
import './card.css';

type StreamerCardProps = {
  rootClassName?: string;
  image_src?: string;
  image_alt?: string;
  title?: string;
  description?: string;
  platform?: string;
};

const StreamerCard: React.FC<StreamerCardProps> = ({
  rootClassName = '',
  image_src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDd8fHBvcnRyYWl0fGVufDB8fHx8MTYyNjM3ODk3Mg&ixlib=rb-1.2.1&w=1000',
  image_alt = 'image',
  title = 'Lorem ipsum dolor sit amet',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non volutpat turpis. Mauris luctus rutrum mi ut rhoncus. Integer in dignissim tortor. Lorem ipsum dolor sit amet, consectetur adipiscing ... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non volutpat turpis. Mauris luctus rutrum mi ut rhoncus. Integer in dignissim tortor. Lorem ipsum dolor sit amet, consectetur adipiscing ... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non volutpat turpis. Mauris luctus rutrum mi ut rhoncus. Integer in dignissim tortor. Lorem ipsum dolor sit amet, consectetur adipiscing ... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non volutpat turpis. Mauris luctus rutrum mi ut rhoncus. Integer in dignissim tortor. Lorem ipsum dolor sit amet, consectetur adipiscing ...',
  platform = 'Twitch',
}) => {
  return (
    <div className={`card-blog-post-card ${rootClassName}`}>
      <img alt={image_alt} src={image_src} className="card-image" />
      <div className="card-container">
        <Votes></Votes>
        <h1 className="card-name">{title}</h1>
        <span className="card-text">{description}</span>
        <div className="card-container1">
          <div className="card-profile">
            <img
              alt="twitch"
              src="https://avatars.githubusercontent.com/u/1795021?s=280&amp;v=4"
              className="card-image1"
            />
            <span className="card-text1">{platform}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

StreamerCard.propTypes = {
  rootClassName: PropTypes.string,
  image_src: PropTypes.string,
  image_alt: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  platform: PropTypes.string,
};

export default StreamerCard;
