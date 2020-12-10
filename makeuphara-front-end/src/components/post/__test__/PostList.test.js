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
    const { getByText } = renderWithProvider({
      postList,
      props,
    });

    expect(getByText('BLOG')).toBeInTheDocument();
  });
});
