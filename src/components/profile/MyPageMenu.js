import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

/**
 * 마이페이지 메뉴 컴포넌트
 */

const MyPageMenuBlock = styled.div`
  margin-top: 2rem;
  margin-left: 2rem;
  border-right: 1px solid ${({ theme }) => theme.categoryBorder};
  color: ${({ theme }) => theme.text};
`;

// 메뉴 리스트
const MenuList = [
  { name: '프로필', link: '/mypage' },
  { name: '보안', link: '/mypage/security' },
  { name: '활동 기록', link: '/mypage/activity' },
];

const NavMenu = styled(NavLink)`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  &:first-of-type {
    margin-top: 0;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
  &.active {
    font-weight: 600;
    border-left: 2px solid ${({ theme }) => theme.categoryBorder};
    color: ${({ theme }) => theme.categoryBorder};
  }
  .menu-name {
    font-family: 'NanumBarunGothic';
    padding: 0 0.5rem;
  }
`;

const MyPageMenu = () => (
  <MyPageMenuBlock>
    {MenuList.map((menu) => (
      <NavMenu key={menu.name} to={menu.link} exact>
        <span className="menu-name">{menu.name}</span>
      </NavMenu>
    ))}
  </MyPageMenuBlock>
);

export default MyPageMenu;
