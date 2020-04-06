import { createAction, handleActions } from 'redux-actions';
import {
  createRequestActionTypes,
  createRequestSaga,
} from '../../lib/createRequest';
import * as postAPI from '../../lib/api/post';
import { takeLatest } from 'redux-saga/effects';

/* action type */
// local
const INITIALIZE = 'post/INITIALIZE'; // 작성 내용 초기화
const CHANGE_FIELD = 'post/CHANGE_FIELD'; // 특정 key값 바꾸기
// api
const [
  WRITE_POST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
] = createRequestActionTypes('post/WRITE_POST');

/* action */
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({
  title,
  body,
  tags,
}));

/* redux-saga */
const writePostSaga = createRequestSaga(WRITE_POST, postAPI.writePost);

export function* postSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
}

/* initialize state */
const initialState = {
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null,
};

/* reducer */
const post = handleActions(
  {
    [INITIALIZE]: () => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 키값을 업데이트
    }),
    [WRITE_POST]: state => ({
      ...state,
      post: null,
      postError: null,
    }),
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
  },
  initialState,
);

export default post;
