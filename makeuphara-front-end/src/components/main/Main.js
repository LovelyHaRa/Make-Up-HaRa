import React from 'react';
import styled from 'styled-components';
import BlogSectionContainer from '../../containers/main/BlogSectionContainer';
import WikiSectionContainer from '../../containers/main/WikiSectionContainer';

const MainBlock = styled.div`
  margin: 2rem;
  color: ${({ theme }) => theme.text};
`;

const Main = () => {
  return (
    <>
      <MainBlock>
        <BlogSectionContainer />
        <WikiSectionContainer />
      </MainBlock>
    </>
  );
};

export default Main;
