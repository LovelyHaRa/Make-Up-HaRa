import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import loadable from '@loadable/component';
import Responsive from '../../components/common/Responsive';
import BodyBlock from '../../components/common/BodyBlock';

const EditorContainer = loadable(() =>
  import('../../containers/wiki/edit/EditorContainer'),
);
const EditorFooter = loadable(() =>
  import('../../components/common/editor/EditorFooter'),
);
const WriteActionButtonsContainer = loadable(() =>
  import('../../containers/wiki/edit/WriteActionButtonsContainer'),
);

const WikiEditPage = () => {
  const history = useHistory();
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  if (!user) {
    history.replace('/login');
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

export default WikiEditPage;
