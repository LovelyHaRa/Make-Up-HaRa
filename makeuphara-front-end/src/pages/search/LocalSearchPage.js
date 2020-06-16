import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import LocalSearchContainer from '../../containers/search/LocalSearchContainer';

const LocalSearchPage = () => {
  return (
    <>
      <HeaderContainer />
      <BodyBlock includeHeader />
      <LocalSearchContainer />
    </>
  );
};

export default LocalSearchPage;
