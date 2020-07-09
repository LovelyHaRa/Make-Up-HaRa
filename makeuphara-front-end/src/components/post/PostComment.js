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
  .commenter-info {
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

const CommentItem = ({ commenter, commentDate, body }) => {
  return (
    <div className="list-item">
      <div className="commenter-info">
        <span>{commenter.username}</span>
        <span>{moment(commentDate).format('YYYY-MM-DD HH:mm:ss')}</span>
      </div>
      <span className="comment-content">{body}</span>
    </div>
  );
};

const PostComment = ({ commentList }) => {
  return (
    <PostCommentBlock>
      <span>댓글 {commentList.length}</span>
      <WriteCommentBlock elevation={0}>
        <CommentField multiline placeholder="댓글 입력" />
        <WriteButton transparent>
          <span className="button-text">작성</span>
        </WriteButton>
      </WriteCommentBlock>
      <CommentList>
        {commentList.map((comment) => (
          <CommentItem
            commenter={comment.commenter}
            commentDate={comment.commentDate}
            body={comment.body}
          />
        ))}
      </CommentList>
    </PostCommentBlock>
  );
};

export default PostComment;
