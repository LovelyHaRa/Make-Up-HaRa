import React from 'react';
import loadable from '@loadable/component';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';

const LocalSearchContainer = loadable(() =>
  import('../../containers/search/LocalSearchContainer'),
);

const LocalSearchPage = () => (
  <>
    <HeaderContainer />
    <BodyBlock includeHeader />
    <LocalSearchContainer />
  </>
);

export default LocalSearchPage;
