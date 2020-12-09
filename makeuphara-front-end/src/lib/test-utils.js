import React from 'react';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const Router = ({ children, ...routerProps }) => (
  <MemoryRouter {...routerProps}>{children}</MemoryRouter>
);

export const renderWithRouter = (
  ui,
  { routerProps, ...renderOptions } = {},
) => {
  const Wrapper = ({ children }) => (
    <Router {...routerProps}>{children}</Router>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export default null;
