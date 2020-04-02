import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterBlock = styled.div`
  position: fixed;
  bottom: 0;
  height: 2rem;
  width: inherit;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title > a {
    color: ${({ theme }) => theme.text};
  }
  .title > a:hover {
    color: ${({ theme }) => theme.hoverText};
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }
  .editor-name > a {
    color: ${({ theme }) => theme.text};
  }
  .editor-name > a:hover {
    color: ${({ theme }) => theme.hoverText};
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }
`;

const Footer = () => {
  return (
    <FooterBlock>
      <div className="title">
        <Link to="/">MAKE UP HARA</Link>
      </div>
      <div className="editor-name">
        <Link to="/blog">BLOG</Link>
        <span>&nbsp;EDITOR</span>
      </div>
    </FooterBlock>
  );
};

export default Footer;
