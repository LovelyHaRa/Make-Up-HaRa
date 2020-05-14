import React from 'react';
import Responsive from '../../components/common/Responsive';
import EditorFooter from '../../components/common/editor/EditorFooter';
import BodyBlock from '../../components/common/BodyBlock';
import EditorContainer from '../../containers/post/write/EditorContainer';
import TagBoxContainer from '../../containers/post/write/TagBoxContainer';
import WriteActionButtonsContainer from '../../containers/post/write/WriteActionButtonsContainer';
import { Helmet } from 'react-helmet-async';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostWritePage = ({ history }) => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  if (!user) {
    history.replace('/login');
  }
  return (
    <Responsive>
      <Helmet>
        <title>POST 작성 - MAKE UP HARA</title>
      </Helmet>
      <BodyBlock />
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
      <EditorFooter />
    </Responsive>
  );
};

export default withRouter(PostWritePage);
