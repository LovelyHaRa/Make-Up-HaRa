import {
  createRequestActionTypes,
  createRequestSaga,
} from '../../lib/createRequest';
import { createAction, handleActions } from 'redux-actions';
import * as authAPI from '../../lib/api/auth';
import { takeLatest, call } from 'redux-saga/effects';

/* action type */
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);
const LOGOUT = 'user/LOGOUT';
const TEMP_SET_USER = 'user/TEMP_SET_USER';

/* action */
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const tempSetUser = createAction(TEMP_SET_USER);

/* redux-saga */
const checkSaga = createRequestSaga(CHECK, authAPI.check);

const checkFailureSaga = () => {
  try {
    sessionStorage.removeItem('user');
  } catch (error) {
    console.log(error);
  }
};

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    sessionStorage.removeItem('user');
  } catch (error) {
    console.log(error);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

/* initialize state */
const initialState = {
  user: null,
  checkError: null,
};

/* reducer */
export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    [LOGOUT]: state => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);
