import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import post, { postSaga } from './post';
import theme from './theme';

/* root reducer */
const rootReducer = combineReducers({
  loading,
  auth,
  user,
  theme,
  post,
});

/* root saga */
export function* rootSaga() {
  yield all([authSaga(), userSaga(), postSaga()]);
}

export default rootReducer;
