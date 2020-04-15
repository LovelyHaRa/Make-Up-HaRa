import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import BodyBlock from '../components/common/BodyBlock';
import MainContainer from '../containers/main/MainContainer';

const MainPage = () => {
  return (
    <>
      <HeaderContainer />
      <BodyBlock includeHeader />
      <MainContainer />
    </>
  );
};

export default MainPage;
