import React from 'react';
import { render } from '@testing-library/react';

import NoResult from '../NoResult';

describe('<NoResult />', () => {
  it('should be render', () => {
    const { getByText } = render(<NoResult query="test" />);
    expect(getByText("'test'")).toBeInTheDocument();
    expect(getByText('에 대한 검색 결과가 없습니다.ㅠㅠ')).toBeInTheDocument();
    expect(
      getByText('다른 검색어를 검색해 보는건 어떨까요??'),
    ).toBeInTheDocument();
  });
});
