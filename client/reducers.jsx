import { combineReducers } from 'redux';

import login from './components/login/reducer';
import { muralList, muralDelete } from './components/mural/reducer';
import muralAdd from './components/muralAdd/reducer';
import exhibitionAdd from './components/exhibitionAdd/reducer';
import { exhibitionList, exhibitionDelete } from './components/exhibition/reducer';

const rootReducer = combineReducers({
  login,
  muralAdd,
  muralList,
  muralDelete,
  exhibitionAdd,
  exhibitionList,
  exhibitionDelete,
});

export default rootReducer;

