import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import styled from 'styled-components';
import BodyBlock from '../common/BodyBlock';

const HeaderBodyBlock = styled(BodyBlock)`
  top: 3rem;
`;

const MainBlock = styled.div`
  color: ${({ theme }) => theme.text};
`;

const Main = () => {
  return (
    <>
      <HeaderContainer />
      <HeaderBodyBlock />
      <MainBlock style={{ margin: '2rem' }}>main</MainBlock>
    </>
  );
};

export default Main;
