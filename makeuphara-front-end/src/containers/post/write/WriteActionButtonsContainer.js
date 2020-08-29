import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { writePost, updatePost } from '../../../module/redux/post';
import WriteActionButtons from '../../../components/common/editor/WriteActionButtons';

const WriteActionButtonsContainer = ({ history }) => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 상태 불러오기
  const {
    title,
    body,
    tags,
    editPost,
    editPostError,
    targetPostId,
  } = useSelector(({ post }) => ({
    title: post.title,
    body: post.body,
    tags: post.tags,
    editPost: post.editPost,
    editPostError: post.editPostError,
    targetPostId: post.targetPostId,
  }));

  // 이벤트 정의
  // 포스트 등록
  const onPublish = useCallback(() => {
    if (targetPostId) {
      dispatch(updatePost({ id: targetPostId, title, body, tags }));
    } else {
      dispatch(writePost({ title, body, tags }));
    }
  }, [dispatch, targetPostId, title, body, tags]);

  // 취소
  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  // 처리 후 작업
  useEffect(() => {
    if (editPost) {
      const { _id, publisher } = editPost;
      history.push(`/blog/@${publisher.username}/${_id}`);
    }
    if (editPostError) {
      // TODO: Failure Write Post
    }
  }, [history, editPost, editPostError]);

  return (
    <WriteActionButtons
      onClick={onPublish}
      onCancel={onCancel}
      isEdit={!!targetPostId}
    />
  );
};

export default withRouter(WriteActionButtonsContainer);
