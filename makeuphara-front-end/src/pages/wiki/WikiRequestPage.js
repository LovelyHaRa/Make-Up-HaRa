import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import WikiRequestContainer from '../../containers/wiki/WikiRequestContainer';
import WikiSearchContainer from '../../containers/wiki/WikiSearchContainer';
import { Helmet } from 'react-helmet-async';

const WikiRequestPage = () => {
  return (
    <>
      <Helmet>
        <title>작성이 필요한 문서 - MAKE UP HARA</title>
      </Helmet>
      <HeaderContainer />
      <BodyBlock includeHeader />
      <WikiSearchContainer />
      <WikiRequestContainer />
    </>
  );
};

export default WikiRequestPage;
