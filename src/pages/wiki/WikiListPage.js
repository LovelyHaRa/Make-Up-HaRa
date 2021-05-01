import React from 'react';
import loadable from '@loadable/component';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';

const WikiSearchContainer = loadable(() =>
  import('../../containers/wiki/WikiSearchContainer'),
);
const WikiListContainer = loadable(() =>
  import('../../containers/wiki/WikiListContainer'),
);

const WikiListPage = () => (
  <>
    <HeaderContainer />
    <BodyBlock includeHeader />
    <WikiSearchContainer />
    <WikiListContainer />
  </>
);

export default WikiListPage;
