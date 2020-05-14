import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import BodyBlock from '../../components/common/BodyBlock';
import FlexContentBlock from '../../components/common/FlexContentBlock';
import SecurityContainer from '../../containers/profile/SecurityContainer';
import MyPageMenuContainer from '../../containers/profile/MyPageMenuContainer';

const SecurityPage = () => {
  return (
    <>
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
