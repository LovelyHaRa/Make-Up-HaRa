import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import post, { postSaga } from './post';
import wiki, { wikiSaga } from './wiki';
import theme from './theme';
import search from './search';

/* root reducer */
const rootReducer = combineReducers({
  loading,
  auth,
  user,
  theme,
  post,
  wiki,
  search,
});

/* root saga */
export function* rootSaga() {
  yield all([authSaga(), userSaga(), postSaga(), wikiSaga()]);
}

export default rootReducer;
