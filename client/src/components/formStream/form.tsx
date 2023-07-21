import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../button/button';
import './form.css';
import 'react-toastify/dist/ReactToastify.css';
import { postNewStream } from '../../utils/crud/postNewStream';
import { TEXT } from '../../utils/constants/dictionary';
import { PLATFORMS } from '../../utils/constants/platforms';
import { StreamSubmitFormProps } from './form.type';

const StreamSubmitForm: React.FC<StreamSubmitFormProps> = ({
  streamerId,
  textHeading = TEXT.FORM_STREAM.HEADING,
  textTitle = TEXT.FORM_STREAM.TYPE_TITLE,
  textDescription = TEXT.FORM_STREAM.TYPE_DESCRIPTION,
  textStartedAt = TEXT.FORM_STREAM.SELECT_TIME_START,
  textEndedAt = TEXT.FORM_STREAM.SELECT_TIME_END,
  textAverageViewers = TEXT.FORM_STREAM.TYPE_AVERAGE_VIEWERS,
  textGame = TEXT.FORM_STREAM.TYPE_GAME,
  fetchData,
}) => {
  const [stream, setStream] = useState({
    title: '',
    description: '',
    startedAt: '',
    endedAt: '',
    averageViewers: 0,
    game: '',
    streamerId: streamerId,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStream({
      ...stream,
      [e.target.name]: e.target.value,
    });
  };

  const handleTextAreatChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStream({
      ...stream,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(stream);

    const response = await postNewStream(stream);
    if (response) {
      toast(TEXT.MSG.DONE);
      setStream({
        title: '',
        description: '',
        startedAt: '',
        endedAt: '',
        averageViewers: 0,
        game: '',
        streamerId: streamerId,
      });
      fetchData();
    }
  };

  return (
    <div className="submit-form-container">
      <h1 className="submit-form-heading">{textHeading}</h1>
      <form className="submit-form" onSubmit={handleSubmit}>
        <div className="submit-form-info">
          <span className="submit-form-text">{textTitle}</span>
          <input
            type="text"
            required
            placeholder="..."
            className="submit-form-input-name input"
            onChange={handleInputChange}
            name="title"
            value={stream.title}
            maxLength={50}
          />
          <span className="submit-form-text">{textDescription}</span>
          <textarea
            required
            placeholder="..."
            className="submit-form-input-description input"
            name="description"
            value={stream.description}
            maxLength={500}
            readOnly={false}
            onChange={handleTextAreatChange}
          />
        </div>
        <div className="submit-form-info">
          <span className="submit-form-text">{textGame}</span>
          <input
            type="text"
            required
            placeholder="..."
            className="submit-form-input-name input"
            onChange={handleInputChange}
            name="game"
            value={stream.game}
            maxLength={50}
          />
          <span className="submit-form-text">{textStartedAt}</span>
          <input
            type="datetime-local"
            placeholder="..."
            required
            className="submit-form-input-name input"
            onChange={handleInputChange}
            name="startedAt"
            value={stream.startedAt}
          />
          <span className="submit-form-text">{textEndedAt}</span>
          <input
            type="datetime-local"
            required
            className="submit-form-input-name input"
            onChange={handleInputChange}
            name="endedAt"
            value={stream.endedAt}
          />
          <span className="submit-form-text">{textAverageViewers}</span>
          <input
            type="number"
            required
            placeholder="..."
            className="submit-form-input-name input"
            onChange={handleInputChange}
            name="averageViewers"
            value={stream.averageViewers}
            maxLength={50}
          />
          <Button rootClassName="button-root-class-name" />
        </div>
      </form>
    </div>
  );
};

StreamSubmitForm.propTypes = {
  streamerId: PropTypes.string.isRequired,

  rootClassName: PropTypes.string,
  textHeading: PropTypes.string,
  textTitle: PropTypes.string,
  textDescription: PropTypes.string,
  textStartedAt: PropTypes.string,
  textEndedAt: PropTypes.string,
  textAverageViewers: PropTypes.string,
  textGame: PropTypes.string,

  valTitle: PropTypes.string,
  valDescription: PropTypes.string,
  valStartedAt: PropTypes.instanceOf(Date),
  valEndedAt: PropTypes.instanceOf(Date),
  valAverageViewers: PropTypes.number,
  valGame: PropTypes.string,
  fetchData: PropTypes.func.isRequired,
};

export default StreamSubmitForm;
