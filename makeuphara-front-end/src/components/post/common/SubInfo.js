import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const SubInfoBlock = styled.div`
  ${(props) =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}
  color: ${({ theme }) => theme.postSubInfoText};
  .username {
    font-family:'Raleway';
    font-weight:600;
  }
  .username:hover {
    color: ${({ theme }) => theme.postSubInfoHoverText};
  }

  /* span 사이 가운뎃점 문자 출력 */
  span + span:before {
    padding: 0 0.25rem;
    content: '\\B7'; /* 가운뎃점 문자 */
  }

  .publishedDate {
    font-family: 'NanumBarunGothic';
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
          {dayjs(publishedDate).format('YYYY-MM-DD HH:mm:ss')}
        </span>
      )}
    </SubInfoBlock>
  );
};

export default SubInfo;
