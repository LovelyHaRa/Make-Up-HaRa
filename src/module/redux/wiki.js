import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import {
  createRequestActionTypes,
  createRequestSaga,
} from '../../lib/createRequest';
import * as wikiAPI from '../../lib/api/wiki';

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
// api - history list
const [
  GET_HISTORY_LIST,
  GET_HISTORY_LIST_SUCCESS,
  GET_HISTORY_LIST_FAILURE,
] = createRequestActionTypes('wiki/GET_HISTORY_LIST');
// api - search
const [
  GET_SEARCH_LIST,
  GET_SEARCH_LIST_SUCCESS,
  GET_SEARCH_LIST_FAILURE,
] = createRequestActionTypes('wiki/GET_SEARCH_LIST');
// api- search/direct
const [
  GET_DIRECT_TITLE,
  GET_DIRECT_TITLE_SUCCESS,
  GET_DIRECT_TITLE_FAILURE,
] = createRequestActionTypes('wiki/GET_DIRECT_TITLE');
// api - search/random
const [
  GET_RANDOM_TITLE,
  GET_RANDOM_TITLE_SUCCESS,
  GET_RANDOM_TITLE_FAILURE,
] = createRequestActionTypes('wiki/GET_RANDOM_TITLE');
// api - document count
const [
  GET_DOCUMENT_COUNT,
  GET_DOCUMENT_COUNT_SUCCESS,
  GET_DOCUMENT_COUNT_FAILURE,
] = createRequestActionTypes('wiki/GET_DOCUMENT_COUNT');
// api = add barcode to document
const [
  ADD_BARCODE_NUMBER,
  ADD_BARCODE_NUMBER_SUCCESS,
  ADD_BARCODE_NUMBER_FAILURE,
] = createRequestActionTypes('wiki/ADD_BARCODE_NUMBER');

/* action */
export const getRequestList = createAction(GET_REQUEST_LIST);
export const setTitle = createAction(SET_TITLE, (title) => title);
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writeDocument = createAction(WRITE_DOCUMENT, ({ id, body }) => ({
  id,
  body,
}));
export const readDocument = createAction(READ_DOCUMENT, ({ id, r }) => ({
  id,
  r,
}));
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
export const getHistoryList = createAction(GET_HISTORY_LIST, ({ id }) => ({
  id,
}));
export const getSearchList = createAction(
  GET_SEARCH_LIST,
  ({ query, oldest, shortest, longest, page, block }) => ({
    query,
    oldest,
    shortest,
    longest,
    page,
    block,
  }),
);
export const getDirectTitle = createAction(GET_DIRECT_TITLE, ({ query }) => ({
  query,
}));
export const getRandomTitle = createAction(GET_RANDOM_TITLE);
export const getDocumentCount = createAction(
  GET_DOCUMENT_COUNT,
  ({ username }) => ({ username }),
);
export const addBarcodeNumber = createAction(
  ADD_BARCODE_NUMBER,
  ({ title, code }) => ({ title, code }),
);

/* redux-saga */
const getRequestListSaga = createRequestSaga(
  GET_REQUEST_LIST,
  wikiAPI.requestDocument,
);
const writeDocumentSaga = createRequestSaga(
  WRITE_DOCUMENT,
  wikiAPI.writeDocument,
);
const readDocumentSaga = createRequestSaga(READ_DOCUMENT, wikiAPI.readDocument);
const getDocumentListSaga = createRequestSaga(
  GET_DOCUMENT_LIST,
  wikiAPI.getDocumentList,
);
const getHistoryListSaga = createRequestSaga(
  GET_HISTORY_LIST,
  wikiAPI.getHistoryList,
);
const getSearchListSaga = createRequestSaga(
  GET_SEARCH_LIST,
  wikiAPI.getSearchList,
);
const getDirectTitleSaga = createRequestSaga(
  GET_DIRECT_TITLE,
  wikiAPI.getDirectTitle,
);
const getRandomTitleSaga = createRequestSaga(
  GET_RANDOM_TITLE,
  wikiAPI.getRandomTitle,
);
const getDocumentCountSaga = createRequestSaga(
  GET_DOCUMENT_COUNT,
  wikiAPI.getDocumentCount,
);
const addBarcodeNumberSaga = createRequestSaga(
  ADD_BARCODE_NUMBER,
  wikiAPI.addBarcodeNumber,
);

export function* wikiSaga() {
  yield takeLatest(GET_REQUEST_LIST, getRequestListSaga);
  yield takeLatest(WRITE_DOCUMENT, writeDocumentSaga);
  yield takeLatest(READ_DOCUMENT, readDocumentSaga);
  yield takeLatest(GET_DOCUMENT_LIST, getDocumentListSaga);
  yield takeLatest(GET_HISTORY_LIST, getHistoryListSaga);
  yield takeLatest(GET_SEARCH_LIST, getSearchListSaga);
  yield takeLatest(GET_DIRECT_TITLE, getDirectTitleSaga);
  yield takeLatest(GET_RANDOM_TITLE, getRandomTitleSaga);
  yield takeLatest(GET_DOCUMENT_COUNT, getDocumentCountSaga);
  yield takeLatest(ADD_BARCODE_NUMBER, addBarcodeNumberSaga);
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
  historyList: null,
  historyListError: null,
  query: '',
  searchList: [],
  searchListError: null,
  lastPage: 1,
  directName: null,
  directError: null,
  randomTitle: null,
  randomTitleError: null,
  documentCount: 0,
  documentCountError: null,
  addBarcodeNumberResult: null,
  addBarcodeNumberResultError: null,
};

/* reducer */
const wiki = handleActions(
  {
    [GET_REQUEST_LIST_SUCCESS]: (state, { payload: requestList }) => ({
      ...state,
      requestList,
      requestListError: null,
    }),
    [GET_REQUEST_LIST_FAILURE]: (state, { payload: requestListError }) => ({
      ...state,
      requestList: [],
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
      query: '',
      directName: null,
      directError: null,
      randomTitle: null,
      randomTitleError: null,
    }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 키 값을 업데이트
    }),
    [WRITE_DOCUMENT_SUCCESS]: (state, { payload: editDocument }) => ({
      ...state,
      editDocument,
      editDocumentError: null,
    }),
    [WRITE_DOCUMENT_FAILURE]: (state, { payload: editDocumentError }) => ({
      ...state,
      editDocument: null,
      editDocumentError,
    }),
    [READ_DOCUMENT_SUCCESS]: (state, { payload: document }) => ({
      ...state,
      document,
      documentError: null,
    }),
    [READ_DOCUMENT_FAILURE]: (state, { payload: documentError }) => ({
      ...state,
      document: null,
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
      documentListError: null,
    }),
    [GET_DOCUMENT_LIST_FAILURE]: (state, { payload: documentListError }) => ({
      ...state,
      documentList: null,
      documentListError,
    }),
    [UNLOAD_LIST]: (state) => ({
      ...state,
      documentList: null,
      documentListError: null,
    }),
    [GET_HISTORY_LIST_SUCCESS]: (state, { payload: historyList }) => ({
      ...state,
      historyList,
      historyListError: null,
    }),
    [GET_HISTORY_LIST_FAILURE]: (state, { payload: historyListError }) => ({
      ...state,
      historyList: null,
      historyListError,
    }),
    [GET_SEARCH_LIST_SUCCESS]: (
      state,
      { payload: searchList, meta: response },
    ) => ({
      ...state,
      searchList,
      searchListError: null,
      lastPage: parseInt(response.headers['makeuphara-wiki-last-page'], 10),
    }),
    [GET_SEARCH_LIST_FAILURE]: (state, { payload: searchListError }) => ({
      ...state,
      searchList: [],
      searchListError,
    }),
    [GET_DIRECT_TITLE_SUCCESS]: (state, { payload: document }) => ({
      ...state,
      directName: document.title.name,
      directError: null,
    }),
    [GET_DIRECT_TITLE_FAILURE]: (state, { payload: directError }) => ({
      ...state,
      directName: null,
      directError,
    }),
    [GET_RANDOM_TITLE_SUCCESS]: (state, { payload: title }) => ({
      ...state,
      randomTitle: title.name,
      randomTitleError: null,
    }),
    [GET_RANDOM_TITLE_FAILURE]: (state, { payload: randomTitleError }) => ({
      ...state,
      randomTitle: null,
      randomTitleError,
    }),
    [GET_DOCUMENT_COUNT_SUCCESS]: (state, { payload: documentCount }) => ({
      ...state,
      documentCount,
      documentCountError: null,
    }),
    [GET_DOCUMENT_COUNT_FAILURE]: (state, { payload: documentCountError }) => ({
      ...state,
      documentCount: 0,
      documentCountError,
    }),
    [ADD_BARCODE_NUMBER_SUCCESS]: (
      state,
      { payload: addBarcodeNumberResult },
    ) => ({
      ...state,
      addBarcodeNumberResult,
      addBarcodeNumberResultError: null,
    }),
    [ADD_BARCODE_NUMBER_FAILURE]: (
      state,
      { payload: addBarcodeNumberResultError },
    ) => ({
      ...state,
      addBarcodeNumberResult: null,
      addBarcodeNumberResultError,
    }),
  },
  initialState,
);

export default wiki;
