import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import { Helmet } from 'react-helmet-async';

const PostViewerBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.postTitleBorder};
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
  }
`;

const SubInfo = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.hoverText};

  /* span 사이 가운뎃점 문자 출력 */
  span + span:before {
    padding: 0 0.25rem;
    content: '\\B7'; /* 가운뎃점 문자 */
  }
`;

const Tags = styled.div`
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

const PostContent = styled.div`
  color: ${({ theme }) => theme.text};
`;

const PostViewer = ({ post, loading, error, actionButtons }) => {
  // 에러 처리
  if (error) {
    if (error.response && error.response.status === 404) {
      return (
        <PostViewerBlock>
          <PostContent>존재하지 않는 포스트입니다.</PostContent>
        </PostViewerBlock>
      );
    } else {
      return (
        <PostViewerBlock>
          <PostContent>
            Status {error.response.status}: {error.response.statusText}
          </PostContent>
        </PostViewerBlock>
      );
    }
  }
  // 로딩 중이거나 아직 포스트 데이터가 없을 때
  if (loading || !post) {
    return null;
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
        <SubInfo>
          <span>
            <b>{publisher.username}</b>
          </span>
          <span>{new Date(publishedDate).toLocaleString()}</span>
        </SubInfo>
        <Tags>
          {tags.map(tag => (
            <div key={tag} className="tag">
              #{tag}
            </div>
          ))}
        </Tags>
      </PostHead>
      <PostContent dangerouslySetInnerHTML={{ __html: body }} />
      {actionButtons}
    </PostViewerBlock>
  );
};

export default PostViewer;
