import React from 'react';
import loadable from '@loadable/component';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';

const WikiViewerContainer = loadable(() =>
  import('../../containers/wiki/WikiViewerContainer'),
);
const WikiSearchContainer = loadable(() =>
  import('../../containers/wiki/WikiSearchContainer'),
);

const WikiPage = () => (
  <>
    <HeaderContainer />
    <BodyBlock includeHeader />
    <WikiSearchContainer />
    <WikiViewerContainer />
  </>
);

export default WikiPage;
