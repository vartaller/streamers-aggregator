import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './header.css';

type HeaderProps = {
  rootClassName?: string;
  pageTitle?: string;
};

const Header: React.FC<HeaderProps> = ({ pageTitle = 'Dare Drop' }) => {
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
  rootClassName: PropTypes.string,
  pageTitle: PropTypes.string,
};

export default Header;
