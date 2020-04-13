import {
  createRequestActionTypes,
  createRequestSaga,
} from '../../lib/createRequest';
import { createAction, handleActions } from 'redux-actions';
import * as authAPI from '../../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

/* action type */
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);
const [
  LOGIN_WITH_GOOGLE,
  LOGIN_WITH_GOOGLE_SUCCESS,
  LOGIN_WITH_GOOGLE_FAILURE,
] = createRequestActionTypes('auth/LOGIN_WITH_GOOGLE');
const [
  LOGIN_WITH_NAVER,
  LOGIN_WITH_NAVER_SUCCESS,
  LOGIN_WITH_NAVER_FAILURE,
] = createRequestActionTypes('auth/LOGIN_WITH_NAVER');
const [
  LOGIN_WITH_KAKAO,
  LOGIN_WITH_KAKAO_SUCCESS,
  LOGIN_WITH_KAKAO_FAILURE,
] = createRequestActionTypes('auth/LOGIN_WITH_KAKAO');

/* action */
export const changeFieid = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register, login
    key, // username, password, passwordConfirm
    value, // 변경 하려는 값
  }),
);
export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const register = createAction(REGISTER, ({ username, password }) => ({
  username,
  password,
}));
export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));
export const loginWithGoogle = createAction(
  LOGIN_WITH_GOOGLE,
  ({ id_token }) => ({ id_token }),
);
export const loginWithNaver = createAction(
  LOGIN_WITH_NAVER,
  ({ client_id, client_secret, code, state }) => ({
    client_id,
    client_secret,
    code,
    state,
  }),
);
export const loginWithKakao = createAction(LOGIN_WITH_KAKAO, ({ data }) => ({
  data,
}));

/* redux-saga */
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const loginWithGoogleSaga = createRequestSaga(
  LOGIN_WITH_GOOGLE,
  authAPI.loginWithGoogle,
);
const loginWithNaverSaga = createRequestSaga(
  LOGIN_WITH_NAVER,
  authAPI.loginWithNaver,
);
const loginWithKakaoSaga = createRequestSaga(
  LOGIN_WITH_KAKAO,
  authAPI.loginWithKakao,
);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGIN_WITH_GOOGLE, loginWithGoogleSaga);
  yield takeLatest(LOGIN_WITH_NAVER, loginWithNaverSaga);
  yield takeLatest(LOGIN_WITH_KAKAO, loginWithKakaoSaga);
}

/* initialize state */
const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};

/* reducer */
const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null, // 폼 전환 시 회원인증 에러 초기화
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGIN_WITH_GOOGLE_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_WITH_GOOGLE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGIN_WITH_NAVER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_WITH_NAVER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGIN_WITH_KAKAO_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_WITH_KAKAO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;
