import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Categories from '../Categories';

describe('<Categories />', () => {
  it('should be render', () => {
    const { getByText } = render(<Categories />, { wrapper: MemoryRouter });

    expect(getByText('통합검색')).toBeInTheDocument();
    expect(getByText('위키검색')).toBeInTheDocument();
    expect(getByText('블로그')).toBeInTheDocument();
  });
});
