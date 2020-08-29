import React, { useCallback, useEffect, useState } from 'react';
import PostComment from '../../components/post/PostComment';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  readPostComment,
  writePostComment,
  unloadPostComment,
} from '../../module/redux/post';
import { AsyncPagination } from '../../components/common/Pagination';
import { deleteComment } from '../../lib/api/post';

const PostCommentContainer = ({ match }) => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 상태 불러오기
  const { postId } = match.params;
  const {
    commentList,
    count,
    lastPage,
    error,
    loading,
    editComment,
    editCommentError,
    user,
  } = useSelector(({ post, loading, user }) => ({
    commentList: post.commentList,
    count: post.commentCount,
    lastPage: post.commentLastPage,
    error: post.commentListError,
    loading: loading['post/READ_POST_COMMENT'],
    editComment: post.editComment,
    editCommentError: post.editCommentError,
    user: user.user,
  }));

  const [commentInput, setCommentInput] = useState('');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ state: false, message: '' });

  const handleChange = useCallback((event) => {
    setCommentInput(event.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    setResult({ state: false, message: '' });
    dispatch(writePostComment({ id: postId, body: commentInput }));
    setCommentInput('');
  }, [dispatch, postId, commentInput]);

  const handlePageClick = useCallback(
    (pageNumber) => {
      dispatch(readPostComment({ id: postId, page: pageNumber }));
      setPage(pageNumber);
    },
    [dispatch, postId],
  );

  const handleResultClose = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setResult({ state: false, message: '' });
  }, []);

  const handleRemove = useCallback(
    async (commentId) => {
      try {
        setResult({ state: false, message: '' });
        const result = await deleteComment({ id: postId, commentId });
        if (result.status === 204) {
          dispatch(readPostComment({ id: postId, page }));
          setResult({
            state: 'true',
            message: '성공적으로 삭제되었습니다.',
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [dispatch, postId, page],
  );

  useEffect(() => {
    dispatch(readPostComment({ id: postId }));
  }, [dispatch, postId]);

  useEffect(() => {
    if (editComment) {
      dispatch(unloadPostComment());
      dispatch(readPostComment({ id: postId }));
      setPage(1);
      setResult({
        state: 'true',
        message: '성공적으로 등록되었습니다.',
      });
    }
  }, [dispatch, editComment, postId]);

  useEffect(() => {
    return () => {
      dispatch(unloadPostComment());
      setResult({ state: false, message: '' });
    };
  }, [dispatch]);

  return (
    <>
      <PostComment
        commentList={commentList}
        loading={loading}
        error={error}
        editCommentError={editCommentError}
        count={count}
        commentInput={commentInput}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        user={user}
        result={result}
        handleResultClose={handleResultClose}
        handleRemove={handleRemove}
      />
      {!loading && !error && (
        <AsyncPagination
          handleClick={handlePageClick}
          page={page}
          lastPage={lastPage}
        />
      )}
    </>
  );
};

export default withRouter(PostCommentContainer);
