import React from 'react';
import { renderWithRouter } from '../../../lib/test-utils';

import { samplePostList as postList } from '../../../lib/data/test';
import Activity from '../Activity';

const props = {
  postList,
  postCount: postList.length,
  documentCount: 0,
  loadingPost: false,
  loadingWiki: false,
};

describe('<Activity />', () => {
  it('should be render', () => {
    const { getByText } = renderWithRouter(<Activity {...props} />);

    expect(getByText('WIKI DOCUMENT')).toBeInTheDocument();
    expect(getByText('발행한 위키 문서 개수')).toBeInTheDocument();
    expect(getByText('0')).toBeInTheDocument();
    expect(getByText('POST')).toBeInTheDocument();
    expect(getByText('발행한 블로그 포스트 개수')).toBeInTheDocument();
    expect(getByText(postList.length)).toBeInTheDocument();
    expect(getByText('PUBLISHED POST LIST')).toBeInTheDocument();
    expect(getByText('발행한 블로그 포스트 목록')).toBeInTheDocument();
  });
});
