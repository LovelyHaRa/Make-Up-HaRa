import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SubInfo from './SubInfo';
import Tags from './Tags';

const PostItemBlock = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;

  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${({ theme }) => theme.postBorder};
  }
  h2 {
    font-size: 1.5rem;
    font-family: 'NanumBarunGothic';
    font-weight: 500;
    color: ${({ theme }) => theme.text};
    &:hover {
      color: ${({ theme }) => theme.hoverText};
    }
  }
  .tags {
    display: flex;
    justify-content: flex-end;
  }
  & > a {
    margin-top: 1rem;
    color: ${({ theme }) => theme.text};
    &:hover {
      color: ${({ theme }) => theme.hoverText};
    }
  }
  .item-body {
    font-family: 'NanumBarunGothic';
  }
`;

const PostItem = ({ post, username }) => {
  const { _id, title, body, tags, publisher, publishedDate } = post;
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/blog/@${publisher.username}/${_id}`}>{title}</Link>
      </h2>
      <SubInfo username={publisher.username} publishedDate={publishedDate} />
      <Tags tags={tags} username={username} />
      <Link className="item-body" to={`/blog/@${publisher.username}/${_id}`}>
        {body}
      </Link>
    </PostItemBlock>
  );
};

export default PostItem;
