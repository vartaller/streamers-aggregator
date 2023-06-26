import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

type ButtonProps = {
  btnName?: string;
  rootClassName?: string;
};

const Button: React.FC<ButtonProps> = ({
  btnName = 'Submit',
  rootClassName = '',
}) => {
  return (
    <div className={`button-container ${rootClassName}`}>
      <button type="button" className="button-button button">
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
