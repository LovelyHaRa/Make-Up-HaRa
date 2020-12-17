import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import moment from 'moment';

import { render } from '@testing-library/react';

import { samplePostList as postList } from '../../../lib/data/test';
import PostItem from '../common/PostItem';

describe('<PostItem />', () => {
  it('should be render', () => {
    const { getByText } = render(<PostItem post={postList[0]} />, {
      wrapper: MemoryRouter,
    });

    const {
      title,
      body,
      tags,
      publisher: { username },
      publishedDate,
    } = postList[0];

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(body)).toBeInTheDocument();
    expect(getByText(username)).toBeInTheDocument();
    tags.forEach((tag) => expect(getByText(`#${tag}`)).toBeInTheDocument());
    expect(
      getByText(moment(publishedDate).format('YYYY-MM-DD HH:mm:ss')),
    ).toBeInTheDocument();
  });
});
