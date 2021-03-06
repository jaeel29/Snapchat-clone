import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/appSlice';
import { auth, provider } from '../firebase/firebase';
import './Login.css';

function Login() {
  const dispatch = useDispatch();
  const signin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://www.exchangewire.com/wp-content/uploads/2017/04/snap-ghost-yellow-300x300-271x271.png"
          alt=""
        />
        <Button onClick={signin} variant="outlined">
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Login;
