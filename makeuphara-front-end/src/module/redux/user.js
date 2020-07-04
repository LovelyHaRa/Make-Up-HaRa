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
// api - check name
const [
  CHECK_EXIST_NAME,
  CHECK_EXIST_NAME_SUCCESS,
  CHECK_EXIST_NAME_FAILURE,
] = createRequestActionTypes('user/CHECK_EXIST_NAME');
const CHANGE_FIELD = 'user/CHANGE_FIELD';
// api- update name
const [
  UPDATE_NAME,
  UPDATE_NAME_SUCCESS,
  UPDATE_NAME_FAILURE,
] = createRequestActionTypes('user/UPDATE_NAME');
const INITIALIZE_UPDATE_NAME = 'user/INITIALIZE_UPDATE_NAME';
// api - change password
const [
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
] = createRequestActionTypes('user/CHANGE_PASSWORD');
const INITIALIZE_CHANGE_PASSWORD = 'user/INITIALIZE_CHANGE_PASSWORD';

/* action */
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const tempSetUser = createAction(TEMP_SET_USER);
export const checkExistName = createAction(
  CHECK_EXIST_NAME,
  ({ username, name }) => ({ username, name }),
);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({ form, key, value }),
);
export const updateName = createAction(UPDATE_NAME, ({ id, name }) => ({
  id,
  name,
}));
export const initializeUpdateName = createAction(INITIALIZE_UPDATE_NAME);
export const changePassword = createAction(
  CHANGE_PASSWORD,
  ({ id, password, newPassword }) => ({ id, password, newPassword }),
);
export const initializeChangePassword = createAction(
  INITIALIZE_CHANGE_PASSWORD,
);

/* redux-saga */
const checkSaga = createRequestSaga(CHECK, authAPI.check);
const checkExistNameSaga = createRequestSaga(
  CHECK_EXIST_NAME,
  userAPI.checkExistName,
);
const updateNameSaga = createRequestSaga(UPDATE_NAME, userAPI.updateName);
const changePasswordSaga = createRequestSaga(
  CHANGE_PASSWORD,
  userAPI.changePassword,
);

const checkFailureSaga = () => {
  try {
    sessionStorage.removeItem('user');
  } catch (error) {
    throw error;
  }
};

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    sessionStorage.removeItem('user');
  } catch (error) {
    throw error;
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(CHECK_EXIST_NAME, checkExistNameSaga);
  yield takeLatest(UPDATE_NAME, updateNameSaga);
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
}

/* initialize state */
const initialState = {
  user: null,
  checkError: null,
  profile: {
    name: '',
  },
  password: {
    curPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
  checkExistNameResult: null,
  checkExistNameResultError: null,
  updateUser: null,
  updateUserError: null,
  changePasswordResult: null,
  changePasswordError: null,
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
    [CHECK_EXIST_NAME_SUCCESS]: (state, { payload: checkExistNameResult }) => ({
      ...state,
      checkExistNameResult,
      checkExistNameResultError: null,
    }),
    [CHECK_EXIST_NAME_FAILURE]: (
      state,
      { payload: checkExistNameResultError },
    ) => ({
      ...state,
      checkExistNameResult: null,
      checkExistNameResultError,
    }),
    [UPDATE_NAME_SUCCESS]: (state, { payload: updateUser }) => ({
      ...state,
      updateUser,
      updateUserError: null,
    }),
    [UPDATE_NAME_FAILURE]: (state, { payload: updateUserError }) => ({
      ...state,
      updateUser: null,
      updateUserError,
    }),
    [INITIALIZE_UPDATE_NAME]: (state) => ({
      ...state,
      updateUser: null,
      updateUserError: null,
      checkExistNameResult: null,
      checkExistNameResultError: null,
    }),
    [CHANGE_PASSWORD_SUCCESS]: (state, { payload: changePasswordResult }) => ({
      ...state,
      changePasswordResult: !!changePasswordResult,
      changePasswordError: null,
    }),
    [CHANGE_PASSWORD_FAILURE]: (state, { payload: changePasswordError }) => ({
      ...state,
      changePasswordResult: false,
      changePasswordError,
    }),
    [INITIALIZE_CHANGE_PASSWORD]: (state) => ({
      ...state,
      changePasswordResult: null,
      changePasswordError: null,
      password: {
        curPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    }),
  },
  initialState,
);
