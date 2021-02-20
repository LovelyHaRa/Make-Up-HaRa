import React from 'react';
import { renderWithRouter } from '../../../lib/test-utils';

import MyPageMenu from '../MyPageMenu';

describe('<Activity />', () => {
  it('should be render', () => {
    const { getByText } = renderWithRouter(<MyPageMenu />);

    expect(getByText('프로필')).toBeInTheDocument();
    expect(getByText('보안')).toBeInTheDocument();
    expect(getByText('활동 기록')).toBeInTheDocument();
  });
});
