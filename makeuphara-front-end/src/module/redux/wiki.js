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
const SET_TITLE = createRequestActionTypes('wiki/LOAD_TITLE');
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

/* action */
export const getRequestList = createAction(GET_REQUEST_LIST);
export const setTitle = createAction(SET_TITLE, title => title);
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD);
export const writeDocument = createAction(WRITE_DOCUMENT, ({ id, body }) => ({
  id,
  body,
}));

/* redux-saga */
const getRequestListSaga = createRequestSaga(
  GET_REQUEST_LIST,
  wikiAPI.requestDocument,
);
const writeDocumentSaga = createRequestSaga(
  WRITE_DOCUMENT,
  wikiAPI.writeDocument,
);

export function* wikiSaga() {
  yield takeLatest(GET_REQUEST_LIST, getRequestListSaga);
  yield takeLatest(WRITE_DOCUMENT, writeDocumentSaga);
}

/* initialize state */
const initialState = {
  title: null,
  titleError: null,
  body: '',
  editDocument: null,
  editDocumentError: null,
  requestList: [],
  requestListError: null,
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
    [INITIALIZE]: state => ({
      ...state,
      title: null,
      titleError: null,
      body: '',
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
  },
  initialState,
);

export default wiki;
