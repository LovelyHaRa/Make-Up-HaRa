import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import styled from 'styled-components';

const BodyBlock = styled.div`
  position: fixed;
  top: 3rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.body};
  z-index: -1;
`;

const MainBlock = styled.div`
  color: ${({ theme }) => theme.text};
`;

const Main = () => {
  return (
    <>
      <HeaderContainer />
      <BodyBlock></BodyBlock>
      <MainBlock style={{ 'margin': '2rem' }}>main</MainBlock>
    </>
  );
};

export default Main;
