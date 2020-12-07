import React from 'react';
import { Helmet } from 'react-helmet-async';
import loadable from '@loadable/component';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';

const WikiSearchContainer = loadable(() =>
  import('../../containers/wiki/WikiSearchContainer'),
);
const WikiHistoryContainer = loadable(() =>
  import('../../containers/wiki/WikiHistoryContainer'),
);

const WikiHistoryPage = () => (
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

export default WikiHistoryPage;
