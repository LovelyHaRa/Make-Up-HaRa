import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { samplePostSearchResult as postList } from '../../../lib/data/test';
import BlogSearchResult from '../BlogSearchResult';

const props = {
  postList,
  query: 'test',
  error: null,
  postListLoading: false,
};

describe('<BlogSearchResut />', () => {
  it('should be render', () => {
    const { getAllByText } = render(<BlogSearchResult {...props} />, {
      wrapper: MemoryRouter,
    });
    expect(getAllByText(/test/)).toBeTruthy();
  });

  it('should be render when total result', () => {
    const { getByText } = render(<BlogSearchResult {...props} includeTitle />, {
      wrapper: MemoryRouter,
    });
    expect(getByText('블로그')).toHaveClass('title');
  });

  it('should be render if data fetching is failed', () => {
    const nextProps = {
      ...props,
      postList: null,
      error: { response: { status: 404, statusText: 'Not Found' } },
    };
    const { getByText } = render(<BlogSearchResult {...nextProps} />, {
      wrapper: MemoryRouter,
    });
    expect(getByText('블로그 검색 결과 요청 실패.')).toBeInTheDocument();
    expect(getByText('Status:')).toBeInTheDocument();
    expect(getByText(nextProps.error.response.status)).toBeInTheDocument();
    expect(getByText('Message:')).toBeInTheDocument();
    expect(getByText(nextProps.error.response.statusText)).toBeInTheDocument();
  });
});
