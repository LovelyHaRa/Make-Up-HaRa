import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

/**
 * 카테고리 컴포넌트
 */

const Category = styled(NavLink)`
  font-size: 0.9rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  font-family: 'NanumBarunGothic';
  font-weight: lighter;

  &.active {
    font-weight: 600;
    border-bottom: 2px solid ${({ theme }) => theme.categoryBorder};
    color: ${({ theme }) => theme.categoryBorder};
  }

  & + & {
    margin-left: 2rem;
  }
`;

export default Category;
