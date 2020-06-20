import { createAction, handleActions } from 'redux-actions';

/* action type */
const CHANGE_INPUT = 'search/CHANGE_INPUT';
const INITIALIZE = 'search/INITIALIZE';

/* action */
export const changeInput = createAction(CHANGE_INPUT, (value) => value);
export const initialize = createAction(INITIALIZE);

/* initialize state */
const initialState = {
  query: '',
};

/* reducer */
const search = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: value }) => ({ ...state, query: value }),
    [INITIALIZE]: () => initialState,
  },
  initialState,
);

export default search;
