import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { render } from '@testing-library/react';

import { samplePostList as postList } from '../../../lib/data/test';
import PostList from '../PostList';

const props = {
  loading: false,
  error: null,
  showWriteButton: false,
  isDarkTheme: false,
  username: null,
  tag: null,
  block: 10,
  handlePageBlock: jest.fn(),
};

describe('<PostList />', () => {
  const renderWithProvider = ({ postList, props }) => {
    const Wrapper = ({ children }) => (
      <MemoryRouter>
        <HelmetProvider>{children}</HelmetProvider>
      </MemoryRouter>
    );
    return render(<PostList postList={postList} {...props} />, {
      wrapper: Wrapper,
    });
  };

  it('should be render if post list exists', () => {
    const { container, getByText } = renderWithProvider({
      postList,
      props,
    });

    const countItem =
      props.block < postList.length ? props.block : postList.length;

    expect(getByText('BLOG')).toBeInTheDocument();
    expect(getByText('페이지당 포스트 개수')).toBeInTheDocument();
    expect(container.querySelector('.MuiSlider-root')).toBeInTheDocument();
    expect(container.querySelectorAll('.post-item')).toHaveLength(countItem);
  });

  it('should be render if only tag query exist', () => {
    const { container } = renderWithProvider({
      postList,
      props: { ...props, tag: 'Test' },
    });

    const subTitle = container.querySelector('.sub-title');
    expect(subTitle.innerHTML).toEqual('#Test');
  });

  it('should be render if only username query exist', () => {
    const { container } = renderWithProvider({
      postList,
      props: { ...props, username: 'user01' },
    });

    const subTitle = container.querySelector('.sub-title');
    expect(subTitle.innerHTML).toEqual('user01');
  });

  it('should be render if username and tag query exist', () => {
    const { container } = renderWithProvider({
      postList,
      props: { ...props, username: 'user01', tag: 'tag01' },
    });

    const subTitle = container.querySelectorAll('.sub-title');
    expect(subTitle[0].innerHTML).toEqual('user01');
    expect(subTitle[1].innerHTML).toEqual('#tag01');
  });

  it('should be render if data fetching is failed', () => {
    const { getByText } = renderWithProvider({
      postList: null,
      props: { ...props, error: { message: 'Not Found' } },
    });

    expect(getByText('블로그 리스트 요청 실패.')).toBeInTheDocument();
    expect(getByText('ERROR MESSAGE: Not Found')).toBeInTheDocument();
  });
});
