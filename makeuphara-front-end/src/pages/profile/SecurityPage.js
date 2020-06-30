import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import FlexContentBlock from '../../components/common/FlexContentBlock';
import { Helmet } from 'react-helmet-async';
import loadable from '@loadable/component';

const SecurityContainer = loadable(() =>
  import('../../containers/profile/SecurityContainer'),
);
const MyPageMenuContainer = loadable(() =>
  import('../../containers/profile/MyPageMenuContainer'),
);

const SecurityPage = () => {
  return (
    <>
      <Helmet>
        <title>보안 - MAKE UP HARA</title>
      </Helmet>
      <HeaderContainer />
      <BodyBlock includeHeader />
      <FlexContentBlock>
        <MyPageMenuContainer />
        <SecurityContainer />
      </FlexContentBlock>
    </>
  );
};

export default SecurityPage;
