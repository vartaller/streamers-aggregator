import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../button/button';
import './form.css';
import 'react-toastify/dist/ReactToastify.css';
import { postNewStreamer } from '../../utils/crud/postNewStreamer';
import { TEXT } from '../../utils/constants/dictionary';
import { PLATFORMS } from '../../utils/constants/platforms';
import { StreamerSubmitFormProps } from './form.type';

const StreamerSubmitForm: React.FC<StreamerSubmitFormProps> = ({
  heading = TEXT.FORM.HEADING,
  textName = TEXT.FORM.TYPE_NAME,
  textLink = TEXT.FORM.PAST_PHOTO_LINK,
  textPlatform = TEXT.FORM.SELECT_PLATFORM,
  textDescription = TEXT.FORM.TYPE_DESCRIPTION,
  fetchData,
}) => {
  const [streamer, setStreamer] = useState({
    fullName: '',
    img: '',
    info: '',
    platform: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreamer({
      ...streamer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStreamer({
      ...streamer,
      [e.target.name]: e.target.value,
    });
  };

  const handleTextAreatChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStreamer({
      ...streamer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await postNewStreamer(streamer);
    if (response) {
      toast(TEXT.MSG.DONE);
      setStreamer({
        fullName: '',
        img: '',
        info: '',
        platform: '',
      });
      fetchData();
    }
  };

  return (
    <div className={`submit-form-container`}>
      <h1 className="submit-form-heading">{heading}</h1>
      <form className="submit-form" onSubmit={handleSubmit}>
        <div className="submit-form-info">
          <span className="submit-form-text">{textName}</span>
          <input
            type="text"
            required
            placeholder={TEXT.FORM.PLACEHOLDER_NAME}
            className="submit-form-input-name input"
            onChange={handleInputChange}
            name="fullName"
            value={streamer.fullName}
            maxLength={50}
          />
          <span className="submit-form-text">{textLink}</span>
          <input
            type="text"
            required
            placeholder={TEXT.FORM.PLACEHOLDER_PHOTO_LINK}
            className="submit-form-input-photo input"
            onChange={handleInputChange}
            name="img"
            value={streamer.img}
          />
          <span className="submit-form-text">{textPlatform}</span>
          <select
            className="submit-form-select-platform input"
            onChange={handleSelectChange}
            name="platform"
            required
            value={streamer.platform}
          >
            <option disabled value="">
              {TEXT.FORM.SELECT_DEFAULT_TEXT}
            </option>
            {PLATFORMS.map(platform => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
        <div className="submit-form-info">
          <span className="submit-form-text">{textDescription}</span>
          <textarea
            className="submit-form-input-description input"
            required
            placeholder={TEXT.FORM.PLACEHOLDER_DESCRIPTION}
            onChange={handleTextAreatChange}
            name="info"
            value={streamer.info}
            maxLength={1000}
          />
          <Button rootClassName="button-root-class-name" />
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};

StreamerSubmitForm.propTypes = {
  rootClassName: PropTypes.string,
  heading: PropTypes.string,
  textName: PropTypes.string,
  textLink: PropTypes.string,
  textPlatform: PropTypes.string,
  textDescription: PropTypes.string,
  fetchData: PropTypes.func.isRequired,
};

export default StreamerSubmitForm;
