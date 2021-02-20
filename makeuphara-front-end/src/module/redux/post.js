import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import {
  createRequestActionTypes,
  createRequestSaga,
} from '../../lib/createRequest';
import * as postAPI from '../../lib/api/post';

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
const [
  READ_POST_COMMENT,
  READ_POST_COMMENT_SUCCESS,
  READ_POST_COMMENT_FAILURE,
] = createRequestActionTypes('post/READ_POST_COMMENT');
const [
  WRITE_POST_COMMENT,
  WRITE_POST_COMMENT_SUCCESS,
  WRITE_POST_COMMENT_FAILURE,
] = createRequestActionTypes('post/WRITE_POST_COMMENT');
const [
  UPDATE_POST_COMMENT,
  UPDATE_POST_COMMENT_SUCCESS,
  UPDATE_POST_COMMENT_FAILURE,
] = createRequestActionTypes('post/UPDATE_POST_COMMENT');
const UNLOAD_POST_COMMENT = 'post/UNLOAD_POST_COMMENT';

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
  ({ page, tag, username, query, block, oldest, day }) => ({
    page,
    tag,
    username,
    query,
    block,
    oldest,
    day,
  }),
);
export const unloadList = createAction(UNLOAD_LIST);
export const readPostComment = createAction(
  READ_POST_COMMENT,
  ({ id, page, block }) => ({
    id,
    page,
    block,
  }),
);
export const writePostComment = createAction(
  WRITE_POST_COMMENT,
  ({ id, body }) => ({ id, body }),
);
export const updatePostComment = createAction(
  UPDATE_POST_COMMENT,
  ({ id, commentId, body }) => ({ id, commentId, body }),
);
export const unloadPostComment = createAction(UNLOAD_POST_COMMENT);

/* redux-saga */
const writePostSaga = createRequestSaga(WRITE_POST, postAPI.writePost);
const readPostSaga = createRequestSaga(READ_POST, postAPI.readPost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postAPI.updatePost);
const getListSaga = createRequestSaga(GET_LIST, postAPI.getList);
const readPostCommentSaga = createRequestSaga(
  READ_POST_COMMENT,
  postAPI.readComment,
);
const writePostCommentSaga = createRequestSaga(
  WRITE_POST_COMMENT,
  postAPI.writeComment,
);
const updatePostCommentSaga = createRequestSaga(
  UPDATE_POST_COMMENT,
  postAPI.updateComment,
);

export function* postSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(READ_POST, readPostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
  yield takeLatest(GET_LIST, getListSaga);
  yield takeLatest(READ_POST_COMMENT, readPostCommentSaga);
  yield takeLatest(WRITE_POST_COMMENT, writePostCommentSaga);
  yield takeLatest(UPDATE_POST_COMMENT, updatePostCommentSaga);
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
  commentList: [],
  commentCount: 0,
  commentLastPage: 1,
  commentListError: null,
  editComment: null,
  editCommentError: null,
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
      editPostError: null,
    }),
    [WRITE_POST_FAILURE]: (state, { payload: editPostError }) => ({
      ...state,
      editPost: null,
      editPostError,
    }),
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
      postError: null,
    }),
    [READ_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      post: null,
      postError,
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload: editPost }) => ({
      ...state,
      editPost,
      editPostError: null,
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: editPostError }) => ({
      ...state,
      editPost: null,
      editPostError,
    }),
    [GET_LIST_SUCCESS]: (state, { payload: postList, meta: response }) => ({
      ...state,
      postList,
      postCount: parseInt(response.headers['makeuphara-post-count'], 10),
      lastPage: parseInt(response.headers['makeuphara-post-last-page'], 10),
    }),
    [GET_LIST_FAILURE]: (state, { payload: postListError }) => ({
      ...state,
      postList: [],
      postListError,
    }),
    [UNLOAD_LIST]: (state) => ({
      ...state,
      postList: [],
      postListError: null,
    }),
    [READ_POST_COMMENT_SUCCESS]: (
      state,
      { payload: commentList, meta: response },
    ) => ({
      ...state,
      commentList,
      commentCount: parseInt(
        response.headers['makeuphara-post-comment-count'],
        10,
      ),
      commentLastPage: parseInt(
        response.headers['makeuphara-post-comment-last-page'],
        10,
      ),
      commentListError: null,
    }),
    [READ_POST_COMMENT_FAILURE]: (state, { payload: commentListError }) => ({
      ...state,
      commentList: [],
      commentListError,
    }),
    [WRITE_POST_COMMENT_SUCCESS]: (state, { payload: editComment }) => ({
      ...state,
      editComment,
      editCommentError: null,
    }),
    [WRITE_POST_COMMENT_FAILURE]: (state, { payload: editCommentError }) => ({
      ...state,
      editComment: null,
      editCommentError,
    }),
    [UPDATE_POST_COMMENT_SUCCESS]: (state, { payload: editComment }) => ({
      ...state,
      editComment,
      editCommentError: null,
    }),
    [UPDATE_POST_COMMENT_FAILURE]: (state, { payload: editCommentError }) => ({
      ...state,
      editComment: null,
      editCommentError,
    }),
    [UNLOAD_POST_COMMENT]: (state) => ({
      ...state,
      commentList: [],
      commentListError: null,
      commentCount: 0,
      commentLastPage: 1,
      editComment: null,
      editCommentError: null,
    }),
  },
  initialState,
);

export default post;
