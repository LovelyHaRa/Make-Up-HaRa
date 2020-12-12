import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import BlogSection from '../BlogSection';
import { samplePostList } from '../../../lib/data/test';

const postList = samplePostList.slice(0, 5);
const props = { loading: false, error: null };

describe('<BlogSection />', () => {
  const renderWithRouter = ({ postList, props }) =>
    render(<BlogSection postList={postList} {...props} />, {
      wrapper: MemoryRouter,
    });

  it('should be render if post list is exist', () => {
    const { getByText } = renderWithRouter({ postList, props });

    expect(getByText('최근 등록된 포스트')).toBeInTheDocument();
    postList.map(({ title }) => expect(getByText(title)).toBeInTheDocument());
    expect(getByText('MORE POST...')).toBeInTheDocument();
  });

  it('should be render when data is loading', () => {
    const { getByText, queryByText } = renderWithRouter({
      postList,
      props: { ...props, loading: true },
    });

    expect(getByText('최근 등록된 포스트')).toBeInTheDocument();
    postList.map(({ title }) =>
      expect(queryByText(title)).not.toBeInTheDocument(),
    );
    expect(getByText('MORE POST...')).toBeInTheDocument();
  });

  it('should be render if data fetching is failed', () => {
    const { getByText } = renderWithRouter({
      postList,
      props: { ...props, error: { message: 'Not Found' } },
    });

    expect(getByText('블로그 리스트 요청 실패.')).toBeInTheDocument();
    expect(getByText('ERROR MESSAGE: Not Found')).toBeInTheDocument();
  });
});
