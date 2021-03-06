import React from 'react';
import loadable from '@loadable/component';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';

const PostViewerContainer = loadable(() =>
  import('../../containers/post/PostViewerContainer'),
);
const PostCommentContainer = loadable(() =>
  import('../../containers/post/PostCommentContainer'),
);

const PostPage = () => (
  <>
    <HeaderContainer />
    <BodyBlock includeHeader />
    <PostViewerContainer />
    <PostCommentContainer />
  </>
);

export default PostPage;
