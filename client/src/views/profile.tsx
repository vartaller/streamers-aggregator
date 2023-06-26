import React from 'react';
import { Helmet } from 'react-helmet';

import Header from '../components/header/header';
import StreamerCard from '../components/card/card';
import './profile.css';

const Profile: React.FC = () => {
  return (
    <div className="profile-container">
      <Helmet>
        <title>Profile - Dare Drop</title>
        <meta property="og:title" content="Profile - Dare Drop" />
      </Helmet>
      <Header rootClassName="header-root-class-name" />
      <div className="card-page">
        <StreamerCard rootClassName="card-root-class-name" />
      </div>
    </div>
  );
};

export default Profile;
