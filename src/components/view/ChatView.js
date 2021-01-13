import React, { useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectSelectedImage } from '../../features/appSlice';
import './ChatView.css';

function View() {
  const selectedImage = useSelector(selectSelectedImage);
  const history = useHistory();

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage]);

  const exit = () => {
    history.replace('/chats');
  };

  return (
    <div className="chatView">
      <img src={selectedImage} onClick={exit} alt="" />
      <div className="chatView__timer">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={3}
          size={30}
          colors={'#fff'}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default View;
