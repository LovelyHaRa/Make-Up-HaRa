import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Tags from '../post/common/Tags';
import SubInfo from '../post/common/SubInfo';
import ErrorBlock from '../common/ErrorBlock';

/**
 * 최근 등록된 포스트 리스트
 */

const BlogSectionBlock = styled.div`
  margin: 2rem;
  color: ${({ theme }) => theme.text};
  h3 {
    font-family: 'NanumBarunGothic';
    font-weight: 600;
  }
  & > span {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    & > a:hover {
      color: ${({ theme }) => theme.hoverText};
    }
  }
  .footer {
    font-family: 'Raleway';
  }
`;

const SectionErrorBlock = styled(ErrorBlock)`
  margin-top: 2rem;
  margin-left: 2rem;
`;

const PostBlock = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.postBorder};
  padding: 0.5rem 0.25rem;
  &:last-of-type {
    border-bottom: 1px solid ${({ theme }) => theme.postBorder};
  }
  & > a {
    font-family: 'NanumBarunGothic';
  }
  .tags,
  .subinfo {
    margin: 0;
    display: flex;
  }
  a {
    display: flex;
  }
  flex: none;
  .post-info {
    margin-left: auto;
    display: flex;
    align-items: center;
    .tags + .subinfo {
      margin-left: 1rem;
    }
  }
  &:hover {
    background: ${({ theme }) => theme.hoverList};
  }
`;

const PostItem = ({ post }) => {
  const { _id, title, tags, publisher } = post;
  return (
    <PostBlock>
      <Link to={`/blog/@${publisher.username}/${_id}`}>{title}</Link>
      <div className="post-info">
        <Tags tags={tags} limit={3} />
        <SubInfo username={publisher.username} />
      </div>
    </PostBlock>
  );
};

const BlogSection = ({ postList, loading, error }) => {
  if (error) {
    return (
      <SectionErrorBlock>
        <span className="error-title">블로그 리스트 요청 실패.</span>
        <span className="error-msg">ERROR MESSAGE: {error.message}</span>
      </SectionErrorBlock>
    );
  }
  return (
    <BlogSectionBlock>
      <h3>최근 등록된 포스트</h3>
      {!loading && postList && (
        <div>
          {postList.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
      <span className="footer">
        <Link to="/blog">MORE POST...</Link>
      </span>
    </BlogSectionBlock>
  );
};

export default BlogSection;
