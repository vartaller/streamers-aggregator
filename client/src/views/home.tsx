import React from 'react';
import { Helmet } from 'react-helmet';

import Header from '../components/header/header';
import StreamerSubmitForm from '../components/form/form';
import StreamersList from '../components/list/list';
import './home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Main - Dare Drop</title>
        <meta property="og:title" content="Main - Dare Drop" />
      </Helmet>
      <Header />
      <div className="home-blog">
        <StreamerSubmitForm rootClassName="streamer-submit-form-root-class-name" />
        <StreamersList rootClassName="streamers-list-root-class-name" />
      </div>
    </div>
  );
};

export default Home;
