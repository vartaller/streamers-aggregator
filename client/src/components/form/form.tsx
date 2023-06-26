import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/button';
import './form.css';

type StreamerSubmitFormProps = {
  rootClassName?: string;
  heading?: string;
  textName?: string;
  textLink?: string;
  textPlatform?: string;
  textPlatformDescription?: string;
};

const StreamerSubmitForm: React.FC<StreamerSubmitFormProps> = ({
  rootClassName = '',
  heading = 'Heading',
  textName = "Type streamer's name:",
  textLink = "Past link to the streamer's photo:",
  textPlatform = 'Choose the streaming platform:',
  textPlatformDescription = '',
}) => {
  return (
    <div className={`streamer-submit-form-container ${rootClassName}`}>
      <h1 className="streamer-submit-form-text">{heading}</h1>
      <div className="streamer-submit-form-container1">
        <div className="streamer-submit-form-container2">
          <span className="streamer-submit-form-text1">{textPlatform}</span>
          <select className="streamer-submit-form-select">
            <option>-- select --</option>
            <option value="Twitch">Twitch</option>
            <option value="YouTube">YouTube</option>
            <option value="TikTok">TikTok</option>
            <option value="Kick">Kick</option>
            <option value="Rumble">Rumble</option>
          </select>
          <span className="streamer-submit-form-text2">
            {textPlatformDescription}
          </span>
        </div>
        <div className="streamer-submit-form-container3">
          <span className="streamer-submit-form-text3">{textName}</span>
          <input
            type="text"
            required
            placeholder="Name"
            className="streamer-submit-form-input-name input"
          />
          <span className="streamer-submit-form-text4">{textLink}</span>
          <input
            type="text"
            required
            placeholder="Photo link"
            className="streamer-submit-form-input-photo input"
          />
          <Button rootClassName="button-root-class-name" />
        </div>
      </div>
    </div>
  );
};

StreamerSubmitForm.propTypes = {
  rootClassName: PropTypes.string,
  heading: PropTypes.string,
  textName: PropTypes.string,
  textLink: PropTypes.string,
  textPlatform: PropTypes.string,
  textPlatformDescription: PropTypes.string,
};

export default StreamerSubmitForm;
