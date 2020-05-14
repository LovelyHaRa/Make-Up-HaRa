import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import PostViewerContainer from '../../containers/post/PostViewerContainer';

const PostPage = () => {
  return (
    <>
      <HeaderContainer />
      <BodyBlock includeHeader />
      <PostViewerContainer />
    </>
  );
};

export default PostPage;
