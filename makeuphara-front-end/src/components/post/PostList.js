import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import PostItem from './common/PostItem';
import { Helmet } from 'react-helmet-async';
import ErrorBlock from '../common/ErrorBlock';

const PostListBlock = styled.div`
  margin-top: 3rem;
`;

const PostListErrorBlock = styled(ErrorBlock)`
  margin-top: 3rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  .title {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.text};
  }
  .sub-title {
    font-size: 1rem;
  }
`;

const WritePostButton = ({ isDarkTheme }) => {
  const btn = !isDarkTheme ? (
    <Button cyan="true" to={'/blog/write'}>
      포스트 작성
    </Button>
  ) : (
    <Button violet="true" to={'/blog/write'}>
      포스트 작성
    </Button>
  );
  return btn;
};

const PostList = ({
  postList,
  loading,
  error,
  showWriteButton,
  isDarkTheme,
  username,
  tag,
}) => {
  if (error) {
    return (
      <Responsive>
        <PostListErrorBlock>
          <span className="error-title">블로그 리스트 요청 실패.</span>
          <span className="error-msg">ERROR MESSAGE: {error.message}</span>
        </PostListErrorBlock>
      </Responsive>
    );
  }
  return (
    <Responsive>
      <PostListBlock>
        <Helmet>
          {username && <title>{username} - MAKE UP HARA :: BLOG</title>}
          {tag && <title>#{tag} - MAKE UP HARA :: BLOG</title>}
          {username && tag && (
            <title>
              {username}#{tag} - MAKE UP HARA :: BLOG
            </title>
          )}
        </Helmet>
        <TitleWrapper>
          <span className="title">
            BLOG
            {username && !tag && (
              <span>
                {' '}
                - <span className="sub-title">{username}</span>
              </span>
            )}
            {tag && !username && (
              <span>
                {' '}
                - <span className="sub-title">#{tag}</span>
              </span>
            )}
            {username && tag && (
              <span>
                {' '}
                - <span className="sub-title">{username}</span>
                <span className="sub-title">#{tag}</span>
              </span>
            )}
          </span>
          {showWriteButton && <WritePostButton isDarkTheme={isDarkTheme} />}
        </TitleWrapper>
        {!loading && postList && (
          <div>
            {postList.map((post) => (
              <PostItem post={post} username={username} key={post._id} />
            ))}
          </div>
        )}
      </PostListBlock>
    </Responsive>
  );
};

export default PostList;
