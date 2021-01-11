import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCameraImage } from '../../features/cameraSlice';
import './WebcamCapture.css';

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: 'user',
};

function WebcamCapture() {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  //! Testing the image in DOM
  // const [image, setImage] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    //! Testing
    dispatch(setCameraImage(imageSrc));
    // setImage(imageSrc);
    history.push('./preview');
  }, [webcamRef]);

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        width={videoConstraints.width}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <RadioButtonUncheckedIcon
        className="webcamCapture__button"
        onClick={capture}
        fontSize="large"
      />
      {/* Testing */}
      {/* <img src={image} alt="" /> */}
    </div>
  );
}

export default WebcamCapture;
