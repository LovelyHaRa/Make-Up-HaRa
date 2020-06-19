import React from 'react';
import styled from 'styled-components';
import PostItem from '../post/common/PostItem';

/**
 * 블로그 검색결과
 */

const BlogSearchResultBlock = styled.div`
  margin: 1rem 2rem;
  display: flex;
  flex-direction: column;
  .title {
    font-size: 1.25rem;
    font-family: 'NanumBarunGothic';
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  }
  .post-list {
    margin: 0 0.25rem;
  }
`;

const BlogSearchResult = ({
  includeTitle,
  postList,
  postListLoading,
  postListError,
}) => {
  return (
    <BlogSearchResultBlock>
      {includeTitle && <span className="title">블로그</span>}
      {!postListLoading && postList && (
        <div className="post-list">
          {postList.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
    </BlogSearchResultBlock>
  );
};

export default BlogSearchResult;
