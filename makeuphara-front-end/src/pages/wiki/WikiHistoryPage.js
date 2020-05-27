import React from 'react';
import WikiHistoryContainer from '../../containers/wiki/WikiHistoryContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import WikiSearchContainer from '../../containers/wiki/WikiSearchContainer';
import { Helmet } from 'react-helmet-async';

const WikiHistoryPage = () => {
  return (
    <>
      <Helmet>
        <title>문서 역사 - MAKE UP HARA</title>
      </Helmet>
      <HeaderContainer />
      <BodyBlock includeHeader />
      <WikiSearchContainer />
      <WikiHistoryContainer />
    </>
  );
};

export default WikiHistoryPage;
