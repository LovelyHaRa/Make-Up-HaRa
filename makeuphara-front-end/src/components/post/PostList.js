import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import PostItem from './common/PostItem';
import { Helmet } from 'react-helmet-async';
import ErrorBlock from '../common/ErrorBlock';
import { PageSlider } from '../common/CustomSlider';
import Typography from '@material-ui/core/Typography';
import LoadingProgress from '../common/LoadingProgress';

const PostListBlock = styled.div`
  margin-top: 3rem;
  .page-block {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 50%;
    @media screen and (max-width: 700px) {
      width: 70%;
    }
    @media screen and (max-width: 500px) {
      width: 90%;
    }
    color: ${({ theme }) => theme.text};
    .MuiTypography-root {
      font-family: 'NanumBarunGothic';
      flex: 1;
    }
  }
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
    font-family: 'Raleway';
    font-weight: 600;
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

const PageBlock = ({ block, handlePageBlock }) => {
  return (
    <div className="page-block">
      <Typography>페이지당 포스트 개수</Typography>
      <PageSlider
        valueLabelDisplay="auto"
        defaultValue={10}
        marks
        min={10}
        max={50}
        step={10}
        value={block}
        onChange={handlePageBlock}
      />
    </div>
  );
};

const PostList = ({
  postList,
  loading,
  error,
  showWriteButton,
  isDarkTheme,
  username,
  tag,
  block,
  handlePageBlock,
}) => {
  if (loading) {
    return <LoadingProgress body />;
  }
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
          <title>MAKE UP HARA :: BLOG</title>
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
        <PageBlock handlePageBlock={handlePageBlock} />
        {postList && (
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
