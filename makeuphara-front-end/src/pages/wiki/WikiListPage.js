import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import loadable from '@loadable/component';

const WikiSearchContainer = loadable(() =>
  import('../../containers/wiki/WikiSearchContainer'),
);
const WikiListContainer = loadable(() =>
  import('../../containers/wiki/WikiListContainer'),
);

const WikiListPage = () => {
  return (
    <>
      <HeaderContainer />
      <BodyBlock includeHeader />
      <WikiSearchContainer />
      <WikiListContainer />
    </>
  );
};

export default WikiListPage;
