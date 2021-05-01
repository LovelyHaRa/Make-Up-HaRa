import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
import BodyBlock from '../../components/common/BodyBlock';
import Responsive from '../../components/common/Responsive';

const EditorContainer = loadable(() =>
  import('../../containers/post/write/EditorContainer'),
);
const TagBoxContainer = loadable(() =>
  import('../../containers/post/write/TagBoxContainer'),
);
const WriteActionButtonsContainer = loadable(() =>
  import('../../containers/post/write/WriteActionButtonsContainer'),
);
const EditorFooter = loadable(() =>
  import('../../components/common/editor/EditorFooter'),
);

const PostWritePage = () => {
  const history = useHistory();
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

export default PostWritePage;
