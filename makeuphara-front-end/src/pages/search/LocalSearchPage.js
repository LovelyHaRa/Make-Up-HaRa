import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import loadable from '@loadable/component';

const LocalSearchContainer = loadable(() =>
  import('../../containers/search/LocalSearchContainer'),
);

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
