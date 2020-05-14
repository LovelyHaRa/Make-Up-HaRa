import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import WikiSearchContainer from '../../containers/wiki/WikiSearchContainer';
import WikiListContainer from '../../containers/wiki/WikiListContainer';

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
