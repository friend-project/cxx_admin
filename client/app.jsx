import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Login from './components/login';
import Main from './components/main';

const App = () => (
  <Switch>
    <Route exact path="/" >
      <Redirect to="/main" push />
    </Route>
    <Route path="/main" component={Main} />
    <Route path="/login" component={Login} />
  </Switch>
);

export default App;

