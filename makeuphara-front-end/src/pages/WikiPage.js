import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import BodyBlock from '../components/common/BodyBlock';
import WikiViewerContainer from '../containers/wiki/WikiViewerContainer';
import WikiSearchContainer from '../containers/wiki/WikiSearchContainer';

const WikiPage = () => {
  return (
    <>
      <HeaderContainer />
      <BodyBlock includeHeader />
      <WikiSearchContainer />
      <WikiViewerContainer />
    </>
  );
};

export default WikiPage;
