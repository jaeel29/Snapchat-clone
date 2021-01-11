import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectCameraImage } from '../features/cameraSlice';

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();

  useEffect(() => {
    if (!cameraImage) {
      history.replace('/');
    }
  }, [cameraImage, history]);

  return (
    <div className="preview">
      <h1>This is your image</h1>
      <img src={cameraImage} alt="" />
    </div>
  );
}

export default Preview;
