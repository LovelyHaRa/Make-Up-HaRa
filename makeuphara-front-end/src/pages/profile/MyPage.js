import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import FlexContentBlock from '../../components/common/FlexContentBlock';
import { Helmet } from 'react-helmet-async';
import loadable from '@loadable/component';

const MyPageMenuContainer = loadable(() =>
  import('../../containers/profile/MyPageMenuContainer'),
);
const ProfileContainer = loadable(() =>
  import('../../containers/profile/ProfileContainer'),
);

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
