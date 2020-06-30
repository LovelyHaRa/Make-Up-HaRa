import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import loadable from '@loadable/component';

const MainContainer = loadable(() =>
  import('../../containers/main/MainContainer'),
);

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
