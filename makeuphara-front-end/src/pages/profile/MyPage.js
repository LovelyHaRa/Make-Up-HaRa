import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import MyPageMenuContainer from '../../containers/profile/MyPageMenuContainer';
import FlexContentBlock from '../../components/common/FlexContentBlock';
import ProfileContainer from '../../containers/profile/ProfileContainer';
import { Helmet } from 'react-helmet-async';

const MyPage = () => {
  return (
    <>
      <Helmet>
        <title>MY PAGE - MAKE UP HARA</title>
      </Helmet>
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
