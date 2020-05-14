import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import FlexContentBlock from '../../components/common/FlexContentBlock';
import MyPageMenuContainer from '../../containers/profile/MyPageMenuContainer';
import ActivityContainer from '../../containers/profile/ActivityContainer';

const ActivityPage = () => {
  return (
    <>
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
