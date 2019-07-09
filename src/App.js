import React from 'react';
import Login from './Container/Login.js';
import { withRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <Login />
    </div>
  );
}

export default withRouter(App);
