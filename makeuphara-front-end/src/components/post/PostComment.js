import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '../common/Button';
import moment from 'moment';

/**
 * 포스트 댓글 컴포넌트
 */

const PostCommentBlock = styled(Responsive)`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text};
`;

const WriteCommentBlock = styled(Paper)`
  display: flex;
  &.MuiPaper-root {
    background: ${({ theme }) => theme.body};
  }
  margin: 1rem 0;
  .button-text {
    padding: 0.25rem 1rem;
    background: ${({ theme }) => theme.btnTransparentHoverBody};
    border-radius: 2px;
    color: ${({ theme }) => theme.btnTransparentHoverText};
  }
`;

const CommentField = styled(TextField)`
  flex: 1;
  .MuiInputBase-input {
    color: ${({ theme }) => theme.text};
  }
  .MuiInputBase-input::placeholder {
    opacity: 0.6;
    color: ${({ theme }) => theme.text};
  }
  .MuiInput-underline:hover:not(.Mui-disabled)::before {
    border-bottom: 2px solid ${({ theme }) => theme.themeColorHoverBody};
  }
  .MuiInput-underline::before {
    border-bottom: 1px solid ${({ theme }) => theme.text};
  }
  .MuiInput-underline::after {
    border-bottom: 2px solid ${({ theme }) => theme.themeColorBody};
  }
`;

const WriteButton = styled(Button)`
  border: none;
  transition: all ease-in 0.1s;
`;

const CommentList = styled.div`
  margin-top: 0;
  .list-item {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.postBorder};
  }
  .publisher-info {
    margin-bottom: 1rem;
    span + span::before {
      padding: 0 0.25rem;
      content: '\\B7'; /* 가운뎃점 문자 */
    }
  }
  .comment-content {
    margin-bottom: 1rem;
  }
`;

const CommentItem = ({ publisher, body }) => {
  return (
    <div className="list-item">
      <div className="publisher-info">
        <span>{publisher}</span>
        <span>{moment().format('YYYY-MM-DD')}</span>
      </div>
      <span className="comment-content">{body}</span>
    </div>
  );
};

const PostComment = () => {
  return (
    <PostCommentBlock>
      <span>댓글 {5}</span>
      <WriteCommentBlock elevation={0}>
        <CommentField multiline placeholder="댓글 입력" />
        <WriteButton transparent>
          <span className="button-text">작성</span>
        </WriteButton>
      </WriteCommentBlock>
      <CommentList>
        <CommentItem publisher="user01" body="테스트 댓글 1\r\n테스트댓글" />
        <CommentItem publisher="user02" body="테스트 댓글 2" />
        <CommentItem publisher="user03" body="테스트 댓글 3" />
        <CommentItem
          className="list-item"
          publisher="user04"
          body="테스트 댓글 4"
        />
        <CommentItem publisher="user05" body="테스트 댓글 5" />
      </CommentList>
    </PostCommentBlock>
  );
};

export default PostComment;
