import React from 'react';
import Responsive from '../components/common/Responsive';
import Editor from '../components/write/Editor';
import TagBox from '../components/write/TagBox';
import Footer from '../components/write/Footer';
import BodyBlock from '../components/common/BodyBlock';

const PostWritePage = () => {
  return (
    <Responsive>
      <BodyBlock />
      <Editor />
      <TagBox />
      <Footer />
    </Responsive>
  );
};

export default PostWritePage;
