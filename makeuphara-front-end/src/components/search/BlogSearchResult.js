import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PostItem from '../post/common/PostItem';
import ErrorBlock from '../common/ErrorBlock';

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
  .footer {
    margin: 0.5rem 0;
    font-family: 'NanumBarunGothic';
    text-align: right;
    &:hover {
      color: ${({ theme }) => theme.hoverText};
    }
  }
`;

const BlogSearchResultErrorBlock = styled(ErrorBlock)`
  margin: 2rem;
`;

const BlogSearchResult = ({
  includeTitle,
  query,
  postList,
  postListLoading,
  error,
}) => {
  if (error) {
    return (
      <BlogSearchResultErrorBlock>
        <span className="error-title">블로그 검색 결과 요청 실패.</span>
        <span>
          Status: <span className="error-msg">{error.response.status}</span>
        </span>
        <span>
          Message:{' '}
          <span className="error-msg">{error.response.statusText}</span>
        </span>
      </BlogSearchResultErrorBlock>
    );
  }
  if (postList && postList.length === 0) {
    return null;
  }
  return (
    <BlogSearchResultBlock>
      {!postListLoading && postList && (
        <>
          {includeTitle && <span className="title">블로그</span>}
          <div className="post-list">
            {postList.map((post) => (
              <PostItem post={post} key={post._id} />
            ))}
          </div>
          {includeTitle && (
            <Link to={`/search?blog=true&query=${query}`} className="footer">
              블로그 검색결과 더 보기...
            </Link>
          )}
        </>
      )}
    </BlogSearchResultBlock>
  );
};

export default BlogSearchResult;
