import React from 'react';
import loadable from '@loadable/component';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';

const MainContainer = loadable(() =>
  import('../../containers/main/MainContainer'),
);

const MainPage = () => (
  <>
    <HeaderContainer />
    <BodyBlock includeHeader />
    <MainContainer />
  </>
);

export default MainPage;
