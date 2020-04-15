import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const SubInfoBlock = styled.div`
  ${props =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}
  color: ${({ theme }) => theme.postSubInfoText};
  .username:hover {
    color: ${({ theme }) => theme.postSubInfoHoverText};
  }

  /* span 사이 가운뎃점 문자 출력 */
  span + span:before {
    padding: 0 0.25rem;
    content: '\\B7'; /* 가운뎃점 문자 */
  }
`;

const SubInfo = ({ username, publishedDate, hasMarginTop }) => {
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop} className="subinfo">
      <span className="username">
        <Link to={`/blog/@${username}`}>
          <b>{username}</b>
        </Link>
      </span>
      {publishedDate && (
        <span className="publishedDate">
          {new Date(publishedDate).toLocaleString()}
        </span>
      )}
    </SubInfoBlock>
  );
};

export default SubInfo;
