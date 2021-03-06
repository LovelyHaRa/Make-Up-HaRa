import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import rootReducer from '../module/redux';

export const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

const render = (
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    route = '/',
    ...renderOptions
  } = {},
) => {
  window.history.pushState({}, 'Test page', route);
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>{children}</HelmetProvider>
      </BrowserRouter>
    </Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';

export { render };
