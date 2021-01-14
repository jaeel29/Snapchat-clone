import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  resetCameraImage,
  selectCameraImage,
} from '../../features/cameraSlice';
import CloseIcon from '@material-ui/icons/Close';
import './Preview.css';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import TimerIcon from '@material-ui/icons/Timer';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { v4 as uuid } from 'uuid';
import { db, storage } from '../firebase/firebase';
import firebase from 'firebase';
import { selectUser } from '../../features/appSlice';

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const disptch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImage) {
      history.replace('/');
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    disptch(resetCameraImage());
    history.replace('/');
  };

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, 'data_url');

    uploadTask.on(
      'state_change',
      null,
      (error) => {
        // ERROR function
        console.log(error);
      },
      () => {
        // COMPLETE function
        storage
          .ref('posts')
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection('posts').add({
              imageUrl: url,
              username: user.username,
              read: false,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace('/chats');
            console.log('done');
          });
      }
    );
  };

  return (
    <div className="preview">
      {/* <CloseIcon /> */}
      <CloseIcon onClick={closePreview} className="preview__close" />
      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateOutlinedIcon />
        <NoteOutlinedIcon />
        <AttachFileIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <SendRoundedIcon fontSize="small" className="preview__send" />
      </div>
    </div>
  );
}

export default Preview;
