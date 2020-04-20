import { createAction, handleActions } from 'redux-actions';
import {
  createRequestActionTypes,
  createRequestSaga,
} from '../../lib/createRequest';
import * as wikiAPI from '../../lib/api/wiki';
import { takeLatest } from 'redux-saga/effects';

/* action type */
// api -request list
const [
  GET_REQUEST_LIST,
  GET_REQUEST_LIST_SUCCESS,
  GET_REQUEST_LIST_FAILURE,
] = createRequestActionTypes('wiki/GET_REQUEST_LIST');

/* action */
export const getRequestList = createAction(GET_REQUEST_LIST);

/* redux-saga */
const getRequestListSaga = createRequestSaga(
  GET_REQUEST_LIST,
  wikiAPI.requestDocument,
);

export function* wikiSaga() {
  yield takeLatest(GET_REQUEST_LIST, getRequestListSaga);
}

/* initialize state */
const initialState = {
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
  },
  initialState,
);

export default wiki;
