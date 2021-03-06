import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render } from '../../../lib/test-utils';

import { samplePostList as postList } from '../../../lib/data/test';
import PostViewerContainer from '../PostViewerContainer';

const { title, body, _id: id } = postList[0];

const initialState = {
  post: {
    post: postList[0],
    postError: null,
  },
  loading: { 'post/READ_POST': false },
  user: {
    user: null,
  },
};

let mockAxios;

beforeEach(() => {
  mockAxios = new MockAdapter(axios);
  mockAxios.onGet(`/api/post/${id}`).reply(200, postList[0]);
});

describe('<PostViewerContainer />', () => {
  it('renders the connected app with initialState', async () => {
    const { getByText } = render(<PostViewerContainer />, {
      initialState,
    });
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(body)).toBeInTheDocument();
  });

  it('should be render if user has been login', () => {
    const { getByText } = render(<PostViewerContainer />, {
      initialState: { ...initialState, user: { user: { username: 'master' } } },
    });

    expect(getByText('수정')).toBeInTheDocument();
    expect(getByText('삭제')).toBeInTheDocument();
  });
});
