import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Chats from './components/chats/Chats';
import { auth } from './components/firebase/firebase';
import Login from './components/Login/Login';
import Preview from './components/preview/Preview';
import View from './components/view/ChatView';
import WebcamCapture from './components/webcam/WebcamCapture';
import { login, logout, selectUser } from './features/appSlice';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.user.displayName,
            profilePic: authUser.user.photoURL,
            id: authUser.user.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className="app__logo"
              src="https://www.exchangewire.com/wp-content/uploads/2017/04/snap-ghost-yellow-300x300-271x271.png"
              alt=""
            />

            <div className="app__body">
              <div className="app__bodyBackground">
                <Switch>
                  <Route path="/chats/view">
                    <View />
                  </Route>
                  <Route path="/chats">
                    <Chats />
                  </Route>
                  <Route path="/preview">
                    <Preview />
                  </Route>
                  <Route exact path="/">
                    <WebcamCapture />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
