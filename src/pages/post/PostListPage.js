import React from 'react';
import loadable from '@loadable/component';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';

const PostListContainer = loadable(() =>
  import('../../containers/post/PostListContainer'),
);

const PostListPage = () => (
  <>
    <HeaderContainer />
    <BodyBlock includeHeader />
    <PostListContainer />
  </>
);

export default PostListPage;
