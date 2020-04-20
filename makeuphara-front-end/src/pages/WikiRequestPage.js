import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import BodyBlock from '../components/common/BodyBlock';
import WikiRequestContainer from '../containers/wiki/WikiRequestContainer';
import WikiSearchContainer from '../containers/wiki/WikiSearchContainer';

const WikiRequestPage = () => {
  return (
    <>
      <HeaderContainer />
      <BodyBlock includeHeader />
      <WikiSearchContainer />
      <WikiRequestContainer />
    </>
  );
};

export default WikiRequestPage;
