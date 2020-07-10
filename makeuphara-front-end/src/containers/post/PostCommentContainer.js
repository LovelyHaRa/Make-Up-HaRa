import React, { useEffect, useState } from 'react';
import PostComment from '../../components/post/PostComment';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPostComment, writePostComment } from '../../module/redux/post';
import { AsyncPagination } from '../../components/common/Pagination';
import PostActionButtions from '../../components/post/PostActionButtions';

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

  const handleChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(writePostComment({ id: postId, body: commentInput }));
    setCommentInput('');
    setResult({
      state: 'false',
      message: '성공적으로 등록되었습니다.',
    });
  };

  const handlePageClick = (pageNumber) => {
    dispatch(readPostComment({ id: postId, page: pageNumber }));
    setPage(pageNumber);
  };

  const handleResultClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setResult({ state: false, message: '' });
  };

  useEffect(() => {
    dispatch(readPostComment({ id: postId }));
  }, [dispatch, postId]);

  useEffect(() => {
    if (editComment) {
      dispatch(readPostComment({ id: postId }));
      setPage(1);
      setResult((result) => ({ ...result, state: true }));
    }
  }, [dispatch, editComment, postId]);

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
        actionButtons={<PostActionButtions />}
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
