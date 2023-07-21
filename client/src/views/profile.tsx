import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Header from '../components/header/header';
import StreamerCard from '../components/card/card';
import StreamsList from '../components/listStreams/list';
import StreamSubmitForm from '../components/formStream/form';
import './profile.css';
import { getStreamerInfo } from '../utils/crud/getStreamerInfo';
import { getStreamesByStreamerId } from '../utils/crud/getStreamesByStreamerId';
import StreamDto from '../utils/interface/stream.dto';
import StreamerDto from '../utils/interface/streamer.dto';
import { TEXT } from '../utils/constants/dictionary';

const Profile: React.FC = () => {
  const { id } = useParams<{ name: string; id: string }>() as {
    name: string;
    id: string;
  };
  const [streamsList, setStreamsList] = useState<StreamDto[]>([]);
  const [streamerInfo, setStreamersInfo] = useState<StreamerDto>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function fetchData() {
    try {
      const streamerInfo = await getStreamerInfo(id);
      setStreamersInfo(streamerInfo);
      const streamerStreams = await getStreamesByStreamerId(id);
      setStreamsList(streamerStreams);
      console.log(streamerStreams);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
      <div className="card-page">
        <StreamSubmitForm streamerId={id} fetchData={fetchData} />
      </div>
      <div className="card-page">
        <StreamsList streamsList={streamsList} />
      </div>
    </div>
  );
};

export default Profile;
