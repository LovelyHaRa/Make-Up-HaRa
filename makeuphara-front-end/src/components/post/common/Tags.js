import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import qs from 'qs';

const TagsBlock = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    text-decoration: none;
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.postTagText};
    &:hover {
      color: ${({ theme }) => theme.postTagHoverText};
    }
  }
`;

const buildLink = ({ username, tag }) => {
  const query = qs.stringify({ tag });
  return username ? `/blog/@${username}?${query}` : `/blog/?${query}`;
};

const Tags = ({ tags, username }) => {
  return (
    <TagsBlock className="tags">
      {tags.map(tag => (
        <Link className="tag" to={buildLink({ username, tag })} key={tag}>
          #{tag}
        </Link>
      ))}
    </TagsBlock>
  );
};

export default Tags;
