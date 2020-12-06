import React from 'react';
import styled from 'styled-components';

/**
 * viewport에 따른 컨테이너 width 제어
 */

const ResponsiveBlock = styled.div`
  padding: 0, 1rem;
  width: 986px;
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
    width: 748px;
  }
  @media screen and (max-width: 768px) {
    width: 98%;
  }
`;

const Responsive = ({ children, ...rest }) => (
  <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>
);

export default Responsive;
