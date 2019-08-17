import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import Home from './Container/Home';
import Login from './Container/Login';
import VotingForm from './Container/VotingForm';
import Vote from './Container/Vote';
import Voted from './Container/Voted';
import Errord from './Container/Errord';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route  path="/Home/:id" component={Home} />
      <Route  path="/VotingForm/:id/:cand" component={VotingForm} />
      <Route  path="/vote/:id/:cand" component={Vote} />
      <Route  path="/voted" component={Voted} />
      <Route  path="/error" component={Errord} />

    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

serviceWorker.unregister();
