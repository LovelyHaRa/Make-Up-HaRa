import React from 'react';
import { Helmet } from 'react-helmet-async';
import loadable from '@loadable/component';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';

const WikiRequestContainer = loadable(() =>
  import('../../containers/wiki/WikiRequestContainer'),
);
const WikiSearchContainer = loadable(() =>
  import('../../containers/wiki/WikiSearchContainer'),
);

const WikiRequestPage = () => (
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

export default WikiRequestPage;
