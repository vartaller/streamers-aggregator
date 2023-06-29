import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './header.css';
import { TEXT } from '../../utils/constants/dictionary';
import { HeaderProps } from './header.type';

const Header: React.FC<HeaderProps> = ({
  pageTitle = TEXT.GENERAL.PAGE_TITLE,
}) => {
  return (
    <Link to="/" className="header-container">
      <header className="header-header">
        <h1>{pageTitle}</h1>
        <div className="header-separator"></div>
      </header>
    </Link>
  );
};

Header.propTypes = {
  pageTitle: PropTypes.string,
};

export default Header;
