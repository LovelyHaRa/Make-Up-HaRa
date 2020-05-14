import React from 'react';
import WikiHistoryContainer from '../../containers/wiki/WikiHistoryContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import WikiSearchContainer from '../../containers/wiki/WikiSearchContainer';

const WikiHistoryPage = () => {
  return (
    <>
      <HeaderContainer />
      <BodyBlock includeHeader />
      <WikiSearchContainer />
      <WikiHistoryContainer />
    </>
  );
};

export default WikiHistoryPage;
