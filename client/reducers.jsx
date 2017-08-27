import { combineReducers } from 'redux';

import count from './components/count/reducer';
import async from './components/async/reducer';
import login from './components/login/reducer';

const rootReducer = combineReducers({
  login,
  count,
  async,
});

export default rootReducer;

