import {
  createRequestActionTypes,
  createRequestSaga,
} from '../../lib/createRequest';
import { createAction, handleActions } from 'redux-actions';
import * as authAPI from '../../lib/api/auth';
import * as userAPI from '../../lib/api/user';
import { takeLatest, call } from 'redux-saga/effects';
import produce from 'immer';

/* action type */
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);
const LOGOUT = 'user/LOGOUT';
const TEMP_SET_USER = 'user/TEMP_SET_USER';
// api - name
const [
  CHECK_EXIST_NAME,
  CHECK_EXIST_NAME_SUCCESS,
  CHECK_EXIST_NAME_FAILURE,
] = createRequestActionTypes('user/CHECK_EXIST_NAME');
const CHANGE_FIELD = 'user/CHANGE_FIELD';

/* action */
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const tempSetUser = createAction(TEMP_SET_USER);
export const checkExistName = createAction(CHECK_EXIST_NAME, (name) => name);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({ form, key, value }),
);

/* redux-saga */
const checkSaga = createRequestSaga(CHECK, authAPI.check);
const checkExistNameSaga = createRequestSaga(
  CHECK_EXIST_NAME,
  userAPI.checkExistName,
);

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
  yield takeLatest(CHECK_EXIST_NAME, checkExistNameSaga);
}

/* initialize state */
const initialState = {
  user: null,
  checkError: null,
  profile: {
    name: '',
  },
  existName: null,
  existNameError: null,
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
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [CHECK_EXIST_NAME_SUCCESS]: (state, { payload: existName }) => ({
      ...state,
      existName,
    }),
    [CHECK_EXIST_NAME_FAILURE]: (state, { payload: existNameError }) => ({
      ...state,
      existNameError,
    }),
  },
  initialState,
);
