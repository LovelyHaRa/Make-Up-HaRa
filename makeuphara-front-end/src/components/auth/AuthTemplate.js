import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/**
 * 로그인/회원가입 공통 컴포넌트
 */

const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${({ theme }) => theme.loginBody};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled.div`
  .logo-area {
    display: block;
    text-align: center;
    padding-bottom: 2rem;
    font-size: 1.25rem;
    letter-spacing: 1px;
  }
  .logo-area > a {
    color: ${({ theme }) => theme.text};
  }
  .logo-area > a:hover {
    color: ${({ theme }) => theme.hoverText};
  }
  box-shadow: 0 0 8px
    ${({ theme }) =>
      theme.body === '#fff' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.5)'};
  padding: 2rem;
  width: 360px;
  background: ${({ theme }) => theme.body};
  border-radius: 2px;
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <ContentBox>
        <div className="logo-area">
          <Link to="/">MAKE UP HARA</Link>
        </div>
        {children}
      </ContentBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
