import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Async from './components/async';

const App = () => (
  <div>
    <Route path="/" exact component={Async} />
    <Route path="/async" component={Async} />
  </div>
);

export default App;

