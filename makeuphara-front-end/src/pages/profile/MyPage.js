import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import MyPageMenuContainer from '../../containers/profile/MyPageMenuContainer';
import FlexContentBlock from '../../components/common/FlexContentBlock';
import ProfileContainer from '../../containers/profile/ProfileContainer';

const MyPage = () => {
  return (
    <>
      <HeaderContainer />
      <BodyBlock includeHeader />
      <FlexContentBlock>
        <MyPageMenuContainer />
        <ProfileContainer />
      </FlexContentBlock>
    </>
  );
};

export default MyPage;
