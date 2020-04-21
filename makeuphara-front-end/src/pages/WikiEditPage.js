import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Responsive from '../components/common/Responsive';
import { Helmet } from 'react-helmet-async';
import BodyBlock from '../components/common/BodyBlock';
import EditorContainer from '../containers/wiki/edit/EditorContainer';
import EditorFooter from '../components/common/editor/EditorFooter';
import WriteActionButtonsContainer from '../containers/wiki/edit/WriteActionButtonsContainer';

const WikiEditPage = ({ history }) => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  if (!user) {
    history.push('/login');
  }
  return (
    <Responsive>
      <Helmet>
        <title>WIKI 에디터 - MAKE UP HARA</title>
      </Helmet>
      <BodyBlock />
      <EditorContainer />
      <EditorFooter type="wiki" />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default withRouter(WikiEditPage);
