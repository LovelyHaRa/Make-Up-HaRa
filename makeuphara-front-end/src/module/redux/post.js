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
const SET_ORIGINAL_POST = 'post/SET_ORIGINAL_POST'; // 포스트 편집 시 에디터에 포스트 정보 세팅
const UNLOAD_POST = 'post/UNLOAD_POST'; // 포스트 뷰 언마운트시 post 정보 제거
// api - write
const [
  WRITE_POST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
] = createRequestActionTypes('post/WRITE_POST');
// api - read
const [
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
] = createRequestActionTypes('post/READ_POST');
// api - update
const [
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
] = createRequestActionTypes('post/UPDATE_POST');
// api - list
const [GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAILURE] = createRequestActionTypes(
  'post/GET_LIST',
);
const UNLOAD_LIST = 'post/UNLOAD_LIST'; // 포스트 리스트 뷰 언마운트시 post list 정보 제거

/* action */
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post) => post);
export const unloadPost = createAction(UNLOAD_POST);
export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({
  title,
  body,
  tags,
}));
export const readPost = createAction(READ_POST, (id) => id);
export const updatePost = createAction(
  UPDATE_POST,
  ({ id, title, body, tags }) => ({ id, title, body, tags }),
);
export const getList = createAction(
  GET_LIST,
  ({ page, tag, username, block }) => ({
    page,
    tag,
    username,
    block,
  }),
);
export const unloadList = createAction(UNLOAD_LIST);

/* redux-saga */
const writePostSaga = createRequestSaga(WRITE_POST, postAPI.writePost);
const readPostSaga = createRequestSaga(READ_POST, postAPI.readPost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postAPI.updatePost);
const getListSaga = createRequestSaga(GET_LIST, postAPI.getList);

export function* postSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(READ_POST, readPostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
  yield takeLatest(GET_LIST, getListSaga);
}

/* initialize state */
const initialState = {
  title: '',
  body: '',
  tags: [],
  editPost: null,
  editPostError: null,
  post: null,
  postError: null,
  postList: [],
  lastPage: 1,
  postCount: 0,
  postListError: null,
  targetPostId: null,
};

/* reducer */
const post = handleActions(
  {
    [INITIALIZE]: () => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 키값을 업데이트
    }),
    [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
      ...state,
      title: post.title,
      body: post.body,
      tags: post.tags,
      targetPostId: post._id,
    }),
    [UNLOAD_POST]: (state) => ({
      ...state,
      post: null,
      postError: null,
    }),
    [WRITE_POST]: (state) => ({
      ...state,
      editPost: null,
      neditPosttError: null,
    }),
    [WRITE_POST_SUCCESS]: (state, { payload: editPost }) => ({
      ...state,
      editPost,
    }),
    [WRITE_POST_FAILURE]: (state, { payload: editPostError }) => ({
      ...state,
      editPostError,
    }),
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [READ_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload: editPost }) => ({
      ...state,
      editPost,
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: editPostError }) => ({
      ...state,
      editPostError,
    }),
    [GET_LIST_SUCCESS]: (state, { payload: postList, meta: response }) => ({
      ...state,
      postList,
      postCount: parseInt(response.headers['makeuphara-post-count'], '10'),
      lastPage: parseInt(response.headers['makeuphara-post-last-page'], '10'),
    }),
    [GET_LIST_FAILURE]: (state, { payload: postListError }) => ({
      ...state,
      postListError,
    }),
    [UNLOAD_LIST]: (state) => ({
      ...state,
      postList: null,
      postListError: null,
    }),
  },
  initialState,
);

export default post;
