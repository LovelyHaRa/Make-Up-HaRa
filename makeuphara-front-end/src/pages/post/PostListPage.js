import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import loadable from '@loadable/component';

const PostListContainer = loadable(() =>
  import('../../containers/post/PostListContainer'),
);

const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <BodyBlock includeHeader />
      <PostListContainer />
    </>
  );
};

export default PostListPage;
