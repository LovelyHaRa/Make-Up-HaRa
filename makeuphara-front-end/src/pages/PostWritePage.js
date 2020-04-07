import React from 'react';
import Responsive from '../components/common/Responsive';
import Footer from '../components/write/Footer';
import BodyBlock from '../components/common/BodyBlock';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import { Helmet } from 'react-helmet-async';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostWritePage = ({ history }) => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  if (!user) {
    history.push('/login');
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
      <Footer />
    </Responsive>
  );
};

export default withRouter(PostWritePage);
