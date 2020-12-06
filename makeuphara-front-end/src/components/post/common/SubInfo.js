import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';

/**
 *  포스트의 부가정보(작성자, 작성일자)를 출력하는 컴포넌트
 */

const SubInfoBlock = styled.div`
  ${(props) =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}
  color: ${({ theme }) => theme.postSubInfoText};
  .username {
    font-family: 'Raleway';
    font-weight: 600;
  }
  .username:hover {
    color: ${({ theme }) => theme.postSubInfoHoverText};
  }

  /* span 사이 가운뎃점 문자 출력 */
  span + span::before {
    padding: 0 0.25rem;
    content: '\\B7'; /* 가운뎃점 문자 */
  }

  .publishedDate {
    font-family: 'NanumBarunGothic';
  }
`;

const SubInfo = ({ username, publishedDate, hasMarginTop }) => (
  <SubInfoBlock hasMarginTop={hasMarginTop} className="subinfo">
    <span className="username">
      <Link to={`/blog/@${username}`}>
        <b>{username}</b>
      </Link>
    </span>
    {publishedDate && (
      <span className="publishedDate">
        {moment(publishedDate).format('YYYY-MM-DD HH:mm:ss')}
      </span>
    )}
  </SubInfoBlock>
);

export default SubInfo;
