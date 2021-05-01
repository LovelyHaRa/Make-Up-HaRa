import React from 'react';
import { Helmet } from 'react-helmet-async';
import loadable from '@loadable/component';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import FlexContentBlock from '../../components/common/FlexContentBlock';

const MyPageMenuContainer = loadable(() =>
  import('../../containers/profile/MyPageMenuContainer'),
);
const ActivityContainer = loadable(() =>
  import('../../containers/profile/ActivityContainer'),
);

const ActivityPage = () => (
  <>
    <Helmet>
      <title>활동 기록 - MAKE UP HARA</title>
    </Helmet>
    <HeaderContainer />
    <BodyBlock includeHeader />
    <FlexContentBlock>
      <MyPageMenuContainer />
      <ActivityContainer />
    </FlexContentBlock>
  </>
);

export default ActivityPage;
