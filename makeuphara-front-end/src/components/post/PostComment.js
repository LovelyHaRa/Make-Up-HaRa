import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '../common/Button';
import moment from 'moment';
import LoadingProgress from '../common/LoadingProgress';
import Snackbar from '@material-ui/core/Snackbar';
import PostActionButtions from './PostActionButtions';

/**
 * 포스트 댓글 컴포넌트
 */

const PostCommentBlock = styled(Responsive)`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  font-family: 'NanumBarunGothic';
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
    font-family: 'NanumBarunGothic';
  }
  .MuiInputBase-input::placeholder {
    opacity: 0.6;
    font-family: 'NanumBarunGothic';
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
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    .comment-body {
      flex: 1;
      margin-right: 0.5rem;
    }
  }
`;

const CommentItem = ({
  commenter,
  commentDate,
  body,
  isOwner,
  actionButtons,
}) => {
  return (
    <div className="list-item">
      <div className="commenter-info">
        <span>{commenter.username}</span>
        <span>{moment(commentDate).format('YYYY-MM-DD HH:mm:ss')}</span>
      </div>
      <div className="comment-content">
        <div className="comment-body">
          {body.split('\n').map((element, index) => (
            <span key={`commentBody${index}`}>
              {element}
              <br />
            </span>
          ))}
        </div>
        {isOwner && actionButtons}
      </div>
    </div>
  );
};

const PostComment = ({
  commentList,
  loading,
  error,
  count,
  commentInput,
  handleChange,
  handleSubmit,
  user,
  result,
  handleResultClose,
  handleEdit,
  handleRemove,
}) => {
  return (
    <PostCommentBlock>
      <span>댓글 {count}</span>
      <WriteCommentBlock elevation={0}>
        <CommentField
          multiline
          placeholder={
            user ? '댓글 입력' : '로그인 후 댓글을 작성할 수 있습니다'
          }
          disabled={user ? false : true}
          value={commentInput}
          onChange={handleChange}
        />
        {user && (
          <WriteButton transparent onClick={handleSubmit}>
            <span className="button-text">작성</span>
          </WriteButton>
        )}
      </WriteCommentBlock>
      {loading ? (
        <LoadingProgress customHeight={10} />
      ) : (
        <CommentList>
          {commentList.map((comment) => (
            <CommentItem
              key={comment._id}
              commenter={comment.commenter}
              commentDate={comment.commentDate}
              body={comment.body}
              isOwner={user && comment.commenter._id === user._id}
              actionButtons={
                <PostActionButtions
                  type="comment"
                  onEdit={handleEdit}
                  onRemove={() => handleRemove(comment._id)}
                />
              }
            />
          ))}
        </CommentList>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={!!result.state}
        autoHideDuration={3000}
        onClose={handleResultClose}
        message={result.message}
      />
    </PostCommentBlock>
  );
};

export default PostComment;
