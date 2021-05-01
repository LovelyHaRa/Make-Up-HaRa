import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/**
 * 에디터 하단 Footer
 */

const EditorFooterBlock = styled.div`
  position: fixed;
  bottom: 0;
  height: 2rem;
  width: inherit;
  padding-bottom: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.body};
  font-family: 'Raleway';
  font-weight: 600;
  letter-spacing: 1px;

  .title > a {
    color: ${({ theme }) => theme.footerText};
  }
  .title > a:hover {
    color: ${({ theme }) => theme.hoverText};
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }
  .editor-name {
    color: ${({ theme }) => theme.footerText};
  }
  .editor-name > a:hover {
    color: ${({ theme }) => theme.hoverText};
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }
`;

const EditorFooter = ({ type = 'blog' }) => {
  const editorName = type === 'blog' ? 'BLOG' : 'WIKI';
  const editorHref = type === 'blog' ? '/blog' : '/wiki';
  return (
    <EditorFooterBlock>
      <div className="title">
        <Link to="/">MAKE UP HARA</Link>
      </div>
      <div className="editor-name">
        <Link to={editorHref}>{editorName}</Link>
        <span>&nbsp;EDITOR</span>
      </div>
    </EditorFooterBlock>
  );
};

export default EditorFooter;
