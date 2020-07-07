import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import loadable from '@loadable/component';
import PostCommentContainer from '../../containers/post/PostCommentContainer';

const PostViewerContainer = loadable(() =>
  import('../../containers/post/PostViewerContainer'),
);

const PostPage = () => {
  return (
    <>
      <HeaderContainer />
      <BodyBlock includeHeader />
      <PostViewerContainer />
      <PostCommentContainer />
    </>
  );
};

export default PostPage;
