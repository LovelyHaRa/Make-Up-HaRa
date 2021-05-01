import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import Responsive from '../common/Responsive';
import SubInfo from './common/SubInfo';
import Tags from './common/Tags';
import ErrorBlock from '../common/ErrorBlock';
import LoadingProgress from '../common/LoadingProgress';

const PostViewerBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const PostViewerErrorBlock = styled(ErrorBlock)`
  margin: 3rem;
`;

const ActionButtonsBlock = styled.div`
  margin-bottom: 2rem;
  margin-top: 1.5rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.postBorder};
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  h1 {
    font-size: 1.5rem;
    font-family: 'Raleway', 'NanumGothic';
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  }
`;

const PostContent = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid ${({ theme }) => theme.postBorder};
  .ql-video {
    margin: 0 1%;
    width: 98%;
    height: 570px;
  }
  .ql-align-left {
    text-align: left;
  }
  .ql-align-center {
    text-align: center;
  }
  .ql-align-right {
    text-align: right;
  }
  @media screen and (max-width: 1024px) {
    .ql-video {
      height: 400px;
    }
  }
`;

const PostViewer = ({ post, loading, error, actionButtons }) => {
  // 에러 처리
  if (error) {
    if (error.response && error.response.status === 404) {
      return (
        <PostViewerErrorBlock>
          <span className="error-title">존재하지 않는 포스트입니다.</span>
          <span className="error-msg">Status: {error.response.status}</span>
          <span className="error-msg">
            Message: {error.response.statusText}
          </span>
        </PostViewerErrorBlock>
      );
    }
    return (
      <PostViewerErrorBlock>
        <span className="error-title">포스트 요청 실패.</span>
        <span className="error-msg">Status: {error.response.status}</span>
        <span className="error-msg">Message: {error.response.statusText}</span>
      </PostViewerErrorBlock>
    );
  }
  // 로딩 중이거나 아직 포스트 데이터가 없을 때
  if (loading || !post) {
    return <LoadingProgress body />;
  }
  // 렌더링 데이터
  const { title, body, tags, publisher, publishedDate } = post;
  return (
    <PostViewerBlock>
      <Helmet>
        <title>{title} - MAKE UP HARA</title>
      </Helmet>
      <PostHead>
        <h1>{title}</h1>
        <SubInfo
          hasMarginTop
          username={publisher.username}
          publishedDate={publishedDate}
        />
        <Tags tags={tags} />
      </PostHead>
      <PostContent dangerouslySetInnerHTML={{ __html: body }} />
      <ActionButtonsBlock>{actionButtons}</ActionButtonsBlock>
    </PostViewerBlock>
  );
};

export default PostViewer;
