import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/header/header';
import StreamerSubmitForm from '../components/formStreamer/form';
import StreamersList from '../components/listStreamers/list';
import './home.css';
import { getStreamersList } from '../utils/crud/getStreamersList';
import StreamerDto from '../utils/interface/streamer.dto';
import { TEXT } from '../utils/constants/dictionary';

const Home: React.FC = () => {
  const [streamersList, setStreamersList] = useState<StreamerDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function fetchData() {
    try {
      const result = await getStreamersList();
      setStreamersList(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home-container">
      <Helmet>
        <title>{`${TEXT.GENERAL.MAIN_PAGE_TITLE} - ${TEXT.GENERAL.PAGE_TITLE}`}</title>
        <meta
          property="og:title"
          content={`${TEXT.GENERAL.MAIN_PAGE_TITLE} - ${TEXT.GENERAL.PAGE_TITLE}`}
        />
      </Helmet>
      <Header />
      <div className="home-blog">
        <StreamerSubmitForm fetchData={fetchData} />
        {!isLoading && <StreamersList streamersList={streamersList} />}
        {isLoading && (
          <div className="loading-container">{TEXT.MSG.LOADING}</div>
        )}
      </div>
    </div>
  );
};

export default Home;
