import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './votes.css';
import { putStreamerVote } from '../../utils/crud/putStreamerVote';
import { VotesProps } from './votes.type';

const Votes: React.FC<VotesProps> = ({
  upvotes,
  downvotes,
  rootClassName = '',
  streamerId,
}) => {
  const [currentUpvotes, setUpvotes] = useState(upvotes);
  const [currentDownvotes, setDownvotes] = useState(downvotes);

  async function fetchData(isLlike: boolean) {
    try {
      const newVotes: number = await putStreamerVote(streamerId, isLlike);
      if (isLlike) setUpvotes(newVotes);
      if (!isLlike) setDownvotes(newVotes);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickLike = () => {
    fetchData(true);
  };

  const handleClickDislike = () => {
    fetchData(false);
  };

  return (
    <div className={`votes-votes ${rootClassName}`}>
      <div className="likes-container">
        <svg
          viewBox="0 0 1024 1024"
          className="like-icon"
          onClick={handleClickLike}
        >
          <path d="M256 512v384h-85.333c-11.776 0-22.4-4.736-30.165-12.501s-12.501-18.389-12.501-30.165v-298.667c0-11.776 4.736-22.4 12.501-30.165s18.389-12.501 30.165-12.501zM640 341.333v-128c0-47.104-19.157-89.856-50.005-120.661s-73.557-50.005-120.661-50.005c-17.28 0-32.171 10.283-38.997 25.344l-159.403 358.656h-100.267c-35.328 0-67.413 14.379-90.496 37.504s-37.504 55.168-37.504 90.496v298.667c0 35.328 14.379 67.413 37.504 90.496s55.168 37.504 90.496 37.504h609.28c32.725 0.384 63.232-11.989 86.229-32.555 21.547-19.285 36.565-45.909 41.259-76.075l58.88-384.085c5.333-34.987-4.096-68.864-23.467-95.189s-48.939-45.355-83.84-50.645c-7.04-1.067-14.208-1.579-20.992-1.451zM554.667 384c0 23.552 19.115 42.667 42.667 42.667l245.12 0.085 3.755 0.427c11.648 1.749 21.419 8.021 27.947 16.896s9.6 20.053 7.851 31.659l-58.88 383.915c-1.579 10.197-6.656 19.115-13.867 25.6-7.68 6.869-17.707 10.923-29.269 10.795l-438.656-0.043v-417.621l153.941-346.368c13.099 4.181 24.832 11.435 34.389 20.992 15.488 15.488 25.003 36.736 25.003 60.331z"></path>
        </svg>
        <span className="likes-color votes-rate-text">{currentUpvotes}</span>
      </div>
      <div className="dislikes-container">
        <span className="dislikes-color votes-rate-text">
          {currentDownvotes}
        </span>
        <svg
          viewBox="0 0 1024 1024"
          className="dislike-icon"
          onClick={handleClickDislike}
        >
          <path d="M768 512v-384h71.253c15.403-0.256 28.757 5.077 38.869 14.165 9.088 8.149 15.531 19.2 17.877 31.829v289.579c-1.579 14.507-8.875 26.88-19.413 35.541-10.027 8.277-22.912 13.056-36.736 12.843zM384 682.667v128c0 47.104 19.157 89.856 50.005 120.661s73.557 50.005 120.661 50.005c17.28 0 32.171-10.283 38.997-25.344l159.403-358.656h85.589c34.56 0.512 66.944-11.52 92.16-32.256 26.539-21.803 45.184-53.376 50.133-90.027 0.256-1.707 0.384-3.712 0.384-5.717v-298.667c0-1.792-0.128-3.797-0.384-5.845-4.736-34.261-21.547-64.427-45.867-86.187-25.6-22.912-59.605-36.565-95.829-35.925h-595.2c-32.725-0.384-63.232 11.989-86.229 32.555-21.547 19.285-36.565 45.909-41.259 76.075l-58.88 384.085c-5.333 34.987 4.096 68.864 23.467 95.189s48.939 45.355 83.84 50.645c7.04 1.024 14.208 1.536 20.992 1.408zM469.333 640c0-23.552-19.115-42.667-42.667-42.667l-245.12-0.085-3.755-0.427c-11.648-1.749-21.419-8.021-27.947-16.896s-9.6-20.053-7.851-31.659l58.88-383.915c1.579-10.197 6.656-19.115 13.867-25.6 7.68-6.827 17.749-10.88 29.312-10.752h438.613v417.621l-153.941 346.368c-13.099-4.181-24.832-11.435-34.389-20.992-15.488-15.488-25.003-36.736-25.003-60.331z"></path>
        </svg>
      </div>
    </div>
  );
};

Votes.propTypes = {
  streamerId: PropTypes.number.isRequired,
  upvotes: PropTypes.number.isRequired,
  downvotes: PropTypes.number.isRequired,
  rootClassName: PropTypes.string,
};

export default Votes;
