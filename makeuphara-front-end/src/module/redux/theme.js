import { createAction, handleActions } from 'redux-actions';

/* action type */
const SET_THEME = 'theme/SET_THEME';

/* action */
export const setTheme = createAction(SET_THEME);

/* redux-saga  */

/* initialize state */
const initialState = {
  isDarkTheme: false,
};

/* reducer */
const theme = handleActions(
  {
    [SET_THEME]: (state, { payload: isDarkTheme }) => ({
      ...state,
      isDarkTheme,
    }),
  },
  initialState,
);

export default theme;
