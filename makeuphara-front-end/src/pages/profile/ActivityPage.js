import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import FlexContentBlock from '../../components/common/FlexContentBlock';
import MyPageMenuContainer from '../../containers/profile/MyPageMenuContainer';
import ActivityContainer from '../../containers/profile/ActivityContainer';
import { Helmet } from 'react-helmet-async';

const ActivityPage = () => {
  return (
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
};

export default ActivityPage;
