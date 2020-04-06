import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { writePost } from '../../module/redux/post';
import WriteActionButtons from '../../components/write/WriteActionButtons';

const WriteActionButtonsContainer = ({ history }) => {
  // 액션함수 불러오기
  const dispatch = useDispatch();
  // 전역함수 불러오기
  const { title, body, tags, post, postError } = useSelector(({ post }) => ({
    title: post.title,
    body: post.body,
    tags: post.tags,
    post: post.post,
    postError: post.postError,
  }));
  // 이벤트 정의
  // 포스트 등록
  const onPublish = () => {
    dispatch(writePost({ title, body, tags }));
  };
  // 취소
  const onCancel = () => {
    history.goBack();
  };
  // 처리 후 작업
  useEffect(() => {
    if (post) {
      const { _id, publisher } = post;
      history.push(`/@${publisher.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);

  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;
};

export default withRouter(WriteActionButtonsContainer);
