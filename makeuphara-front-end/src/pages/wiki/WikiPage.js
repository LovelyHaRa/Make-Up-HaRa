import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import loadable from '@loadable/component';

const WikiViewerContainer = loadable(() =>
  import('../../containers/wiki/WikiViewerContainer'),
);
const WikiSearchContainer = loadable(() =>
  import('../../containers/wiki/WikiSearchContainer'),
);

const WikiPage = () => {
  return (
    <>
      <HeaderContainer />
      <BodyBlock includeHeader />
      <WikiSearchContainer />
      <WikiViewerContainer />
    </>
  );
};

export default WikiPage;
