import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Tags from '../post/common/Tags';
import PaginationContainer from '../../containers/post/PaginationContainer';

const ActivityBlock = styled.div`
  margin-top: 2rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  width: 700px;
  @media screen and (max-width: 1024px) {
    width: 580px;
  }
  @media screen and (max-width: 768px) {
    width: 70vw;
  }
  @media screen and (max-width: 600px) {
    width: 60vw;
  }

  color: ${({ theme }) => theme.text};
  .activity-count-group {
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 769px) {
      flex-direction: row;
      .profile-info-group {
        &:first-of-type {
          margin-left: 0;
        }
        margin-left: 3rem;
      }
    }
  }
  .profile-info-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
  }
  .profile-info-title {
    font-weight: lighter;
    font-size: 1.5rem;
  }
  .profile-info-content {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .profile-info-content-col {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
  }
  .content-title {
    margin-right: 1rem;
    font-size: 1rem;
  }
  .content-value {
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    background-color: ${({ theme }) => theme.profileInfoValueBody};
  }
  .activity-post-list {
    margin: 1rem 0;
  }
  .activity-post-item {
    margin-bottom: 1.5rem;
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
      </div>
    </PostBlock>
  );
};

const Activity = ({
  user,
  postList,
  postCount,
  lastPage,
  documentCount,
  postListError,
  documentCountError,
  loadingPost,
  loadingWiki,
}) => {
  return (
    <ActivityBlock>
      <div className="activity-count-group">
        <div className="profile-info-group">
          <span className="profile-info-title">WIKI DOCUMENT</span>
          <div className="profile-info-content">
            <span className="content-title">발행한 위키 문서 개수</span>
            {!loadingWiki && (
              <span className="content-value">{documentCount}</span>
            )}
          </div>
        </div>
        <div className="profile-info-group">
          <span className="profile-info-title">POST</span>
          <div className="profile-info-content">
            <span className="content-title">발행한 블로그 포스트 개수</span>
            {!loadingPost && <span className="content-value">{postCount}</span>}
          </div>
        </div>
      </div>
      <div className="activity-post-group">
        <div className="profile-info-group">
          <span className="profile-info-title">PUBLISHED POST LIST</span>
          <div className="profile-info-content-col">
            <span className="content-title">발행한 블로그 포스트 목록</span>
            {!loadingPost && postList && (
              <div className="activity-post-list">
                <div className="activity-post-item">
                  {postList.map((post) => (
                    <PostItem post={post} key={post._id} />
                  ))}
                </div>
                <PaginationContainer />
              </div>
            )}
          </div>
        </div>
      </div>
    </ActivityBlock>
  );
};

export default Activity;
