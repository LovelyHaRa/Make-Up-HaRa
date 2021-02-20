import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Categories from '../Categories';

describe('<Categories />', () => {
  it('should be render', () => {
    const { getByText } = render(<Categories />, { wrapper: MemoryRouter });

    expect(getByText('위키 문서')).toBeInTheDocument();
    expect(getByText('OLDEST')).toBeInTheDocument();
    expect(getByText('짧은 내용')).toBeInTheDocument();
    expect(getByText('긴 내용')).toBeInTheDocument();
  });
});
