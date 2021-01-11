import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Chats from './components/chats/Chats';
import Preview from './components/preview/Preview';
import WebcamCapture from './components/webcam/WebcamCapture';

function App() {
  return (
    <div className="app">
      <Router>
        <div className="app__body">
          <Switch>
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
      </Router>
    </div>
  );
}

export default App;
