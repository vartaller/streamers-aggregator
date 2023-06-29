import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Header from '../components/header/header';
import StreamerCard from '../components/card/card';
import './profile.css';
import { getStreamerInfo } from '../utils/crud/getStreamerInfo';
import StreamerDto from '../utils/interface/streamer.dto';
import { TEXT } from '../utils/constants/dictionary';

const Profile: React.FC = () => {
  const { id } = useParams<{ name: string; id: string }>() as {
    name: string;
    id: string;
  };
  const [streamerInfo, setStreamersInfo] = useState<StreamerDto>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function fetchData() {
    try {
      const result = await getStreamerInfo(id);
      setStreamersInfo(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="profile-container">
      <Helmet>
        <title>{`${TEXT.GENERAL.PROFILE_PAGE_TITLE} - ${TEXT.GENERAL.PAGE_TITLE}`}</title>
        <meta
          property="og:title"
          content={`${TEXT.GENERAL.PROFILE_PAGE_TITLE} - ${TEXT.GENERAL.PAGE_TITLE}`}
        />
      </Helmet>
      <Header />
      <div className="card-page">
        {!isLoading && streamerInfo && (
          <StreamerCard
            id={streamerInfo.id}
            fullName={streamerInfo.fullName}
            img={streamerInfo.img}
            info={streamerInfo.info}
            likes={streamerInfo.likes}
            dislikes={streamerInfo.dislikes}
            platform={streamerInfo.platform}
          />
        )}
        {isLoading && (
          <div className="loading-container">{TEXT.MSG.LOADING}</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
