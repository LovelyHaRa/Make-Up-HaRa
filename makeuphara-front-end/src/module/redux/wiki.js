import { createAction, handleActions } from 'redux-actions';
import {
  createRequestActionTypes,
  createRequestSaga,
} from '../../lib/createRequest';
import * as wikiAPI from '../../lib/api/wiki';
import { takeLatest } from 'redux-saga/effects';

/* action type */
// api - request list
const [
  GET_REQUEST_LIST,
  GET_REQUEST_LIST_SUCCESS,
  GET_REQUEST_LIST_FAILURE,
] = createRequestActionTypes('wiki/GET_REQUEST_LIST');
// edit - set title
const SET_TITLE = createRequestActionTypes('wiki/SET_TITLE');
// edit - initialize
const INITIALIZE = 'wiki/INITIALIZE';
// edit - change field
const CHANGE_FIELD = 'wiki/CHANGE_FIELD';
// edit - write document
const [
  WRITE_DOCUMENT,
  WRITE_DOCUMENT_SUCCESS,
  WRITE_DOCUMENT_FAILURE,
] = createRequestActionTypes('wiki/WRITE_DOCUMENT');
// api - read
const [
  READ_DOCUMENT,
  READ_DOCUMENT_SUCCESS,
  READ_DOCUMENT_FAILURE,
] = createRequestActionTypes('wiki/READ_DOCUMENT');
const UNLOAD_DOCUMENT = 'wiki/UNLOAD_DOCUMENT'; // 위키 문서 뷰 언마운트시 문서 정보 제거
const SET_ORIGINAL_DOCUMENT = 'wiki/SET_ORIGINAL_DOCUMENT'; // 위키 문서 편집 시 에디터에 문서 세팅
// api - list
const [
  GET_DOCUMENT_LIST,
  GET_DOCUMENT_LIST_SUCCESS,
  GET_DOCUMENT_LIST_FAILURE,
] = createRequestActionTypes('wiki/GET_DOCUMENT_LIST');
const UNLOAD_LIST = 'wiki/UNLOAD_LIST'; // 위키 리스트 뷰 언마운트시 document list 정보 제거

/* action */
export const getRequestList = createAction(GET_REQUEST_LIST);
export const setTitle = createAction(SET_TITLE, (title) => title);
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD);
export const writeDocument = createAction(WRITE_DOCUMENT, ({ id, body }) => ({
  id,
  body,
}));
export const readDocument = createAction(READ_DOCUMENT, ({ id }) => ({ id }));
export const unloadDocument = createAction(UNLOAD_DOCUMENT);
export const setOriginalDocument = createAction(
  SET_ORIGINAL_DOCUMENT,
  (document) => document,
);
export const getDocumentList = createAction(
  GET_DOCUMENT_LIST,
  (block) => block,
);
export const unloadList = createAction(UNLOAD_LIST);

/* redux-saga */
const getRequestListSaga = createRequestSaga(
  GET_REQUEST_LIST,
  wikiAPI.requestDocument,
);
const writeDocumentSaga = createRequestSaga(
  WRITE_DOCUMENT,
  wikiAPI.writeDocument,
);
export const readDocumentSaga = createRequestSaga(
  READ_DOCUMENT,
  wikiAPI.readDocument,
);
export const getDocumentListSaga = createRequestSaga(
  GET_DOCUMENT_LIST,
  wikiAPI.getDocumentList,
);

export function* wikiSaga() {
  yield takeLatest(GET_REQUEST_LIST, getRequestListSaga);
  yield takeLatest(WRITE_DOCUMENT, writeDocumentSaga);
  yield takeLatest(READ_DOCUMENT, readDocumentSaga);
  yield takeLatest(GET_DOCUMENT_LIST, getDocumentListSaga);
}

/* initialize state */
const initialState = {
  title: null,
  titleError: null,
  body: '',
  document: null,
  documentError: null,
  editDocument: null,
  editDocumentError: null,
  requestList: [],
  requestListError: null,
  documentList: null,
  documentListError: null,
};

/* reducer */
const wiki = handleActions(
  {
    [GET_REQUEST_LIST_SUCCESS]: (state, { payload: requestList }) => ({
      ...state,
      requestList,
    }),
    [GET_REQUEST_LIST_FAILURE]: (state, { payload: requestListError }) => ({
      ...state,
      requestListError,
    }),
    [SET_TITLE]: (state, { payload: title }) => ({
      ...state,
      title,
    }),
    [INITIALIZE]: (state) => ({
      ...state,
      title: null,
      titleError: null,
      body: '',
      editDocument: null,
      editDocumentError: null,
    }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 키 값을 업데이트
    }),
    [WRITE_DOCUMENT_SUCCESS]: (state, { payload: editDocument }) => ({
      ...state,
      editDocument,
    }),
    [WRITE_DOCUMENT_FAILURE]: (state, { payload: editDocumentError }) => ({
      ...state,
      editDocumentError,
    }),
    [READ_DOCUMENT_SUCCESS]: (state, { payload: document }) => ({
      ...state,
      document,
    }),
    [READ_DOCUMENT_FAILURE]: (state, { payload: documentError }) => ({
      ...state,
      documentError,
    }),
    [UNLOAD_DOCUMENT]: (state) => ({
      ...state,
      document: null,
      documentError: null,
    }),
    [SET_ORIGINAL_DOCUMENT]: (state, { payload: document }) => ({
      ...state,
      title: document.title,
      body: document.body,
      editDocument: null,
      editDocumentError: null,
    }),
    [GET_DOCUMENT_LIST_SUCCESS]: (state, { payload: documentList }) => ({
      ...state,
      documentList,
    }),
    [GET_DOCUMENT_LIST_FAILURE]: (state, { payload: documentError }) => ({
      ...state,
      documentError,
    }),
    [UNLOAD_LIST]: (state) => ({
      ...state,
      documentList: null,
      documentListError: null,
    }),
  },
  initialState,
);

export default wiki;
