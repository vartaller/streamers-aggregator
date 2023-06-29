import React from 'react';
import PropTypes from 'prop-types';
import './button.css';
import { TEXT } from '../../utils/constants/dictionary';
import { ButtonProps } from './button.type';

const Button: React.FC<ButtonProps> = ({
  btnName = TEXT.BUTTON.SUBMIT,
  rootClassName = '',
}) => {
  return (
    <div className={`button-container`}>
      <button type="submit" className="button-button button">
        {btnName}
      </button>
    </div>
  );
};

Button.propTypes = {
  btnName: PropTypes.string,
  rootClassName: PropTypes.string,
};

export default Button;
