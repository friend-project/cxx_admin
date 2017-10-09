import { combineReducers } from 'redux';

import login from './components/login/reducer';
import { muralList, muralDelete } from './components/mural/reducer';
import muralAdd from './components/muralAdd/reducer';
import bannerAdd from './components/bannerAdd/reducer';
import exhibitionAdd from './components/exhibitionAdd/reducer';
import { exhibitionList, exhibitionDelete } from './components/exhibition/reducer';
import { bannerList, bannerDelete } from './components/banner/reducer';

const rootReducer = combineReducers({
  login,
  muralAdd,
  muralList,
  muralDelete,
  bannerAdd,
  bannerList,
  bannerDelete,
  exhibitionAdd,
  exhibitionList,
  exhibitionDelete,
});

export default rootReducer;
