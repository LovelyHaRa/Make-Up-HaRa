import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { writePost, updatePost } from '../../module/redux/post';
import WriteActionButtons from '../../components/write/WriteActionButtons';

const WriteActionButtonsContainer = ({ history }) => {
  // 액션함수 불러오기
  const dispatch = useDispatch();
  // 전역함수 불러오기
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
  const onPublish = () => {
    if (targetPostId) {
      dispatch(updatePost({ id: targetPostId, title, body, tags }));
    } else {
      dispatch(writePost({ title, body, tags }));
    }
  };
  // 취소
  const onCancel = () => {
    history.goBack();
  };
  // 처리 후 작업
  useEffect(() => {
    if (editPost) {
      const { _id, publisher } = editPost;
      history.push(`/blog/@${publisher.username}/${_id}`);
    }
    if (editPostError) {
      console.log(editPostError);
    }
  }, [history, editPost, editPostError]);

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!targetPostId}
    />
  );
};

export default withRouter(WriteActionButtonsContainer);
