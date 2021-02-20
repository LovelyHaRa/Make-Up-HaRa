import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { sampleWikiSearchResult as wikiList } from '../../../lib/data/test';
import WikiSearchResult from '../WikiSearchResult';

const props = {
  query: '크림',
  wikiList,
  wikiListLoading: false,
  error: null,
};

describe('<WikiSearchResult />', () => {
  it('should be render', () => {
    const { getAllByText } = render(<WikiSearchResult {...props} />, {
      wrapper: MemoryRouter,
    });
    expect(getAllByText(/크림/)).toBeTruthy();
  });

  it('should be render when total result', () => {
    const { getByText } = render(<WikiSearchResult {...props} includeTitle />, {
      wrapper: MemoryRouter,
    });
    expect(getByText('위키')).toHaveClass('title');
    expect(getByText('위키 검색결과 더 보기...')).toHaveClass('footer');
  });

  it('should be render if data fetching is failed', () => {
    const nextProps = {
      ...props,
      wikiList: null,
      error: { response: { status: 404, statusText: 'Not Found' } },
    };
    const { getByText } = render(<WikiSearchResult {...nextProps} />, {
      wrapper: MemoryRouter,
    });
    expect(getByText('위키 검색 결과 요청 실패.')).toBeInTheDocument();
    expect(getByText('Status:')).toBeInTheDocument();
    expect(getByText(nextProps.error.response.status)).toBeInTheDocument();
    expect(getByText('Message:')).toBeInTheDocument();
    expect(getByText(nextProps.error.response.statusText)).toBeInTheDocument();
  });
});
