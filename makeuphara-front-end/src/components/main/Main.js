import React from 'react';
import styled from 'styled-components';
import SubInfo from '../post/common/SubInfo';
import Tags from '../post/common/Tags';
import { Link } from 'react-router-dom';

const MainBlock = styled.div`
  margin: 2rem;
  color: ${({ theme }) => theme.text};
`;

const BlogSection = styled.div`
  h3 {
    font-weight: 500;
  }
  & > a {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    &:hover {
      color: ${({ theme }) => theme.hoverText};
    }
  }
`;

const PostBlock = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.postBorder};
  padding: 0.5rem 0.25rem;
  &:last-of-type {
    border-bottom: 1px solid ${({ theme }) => theme.postBorder};
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

const Main = ({ postList, loading, postError }) => {
  if (postError) {
    return (
      <MainBlock>
        <span className="title">에러가 발생했습니다.</span>
      </MainBlock>
    );
  }
  return (
    <>
      <MainBlock>
        <BlogSection>
          <h3>블로그</h3>
          {!loading && postList && (
            <div>
              {postList.map(post => (
                <PostItem post={post} key={post._id} />
              ))}
            </div>
          )}
          <Link to="/blog">MORE POST...</Link>
        </BlogSection>
      </MainBlock>
    </>
  );
};

export default Main;
