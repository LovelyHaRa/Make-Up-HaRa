import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initialize } from '../../../module/redux/post';
import { useEffect } from 'react';
import Editor from '../../../components/post/write/Editor';

const EditorContainer = () => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 상태 불러오기
  const { title, body } = useSelector(({ post }) => ({
    title: post.title,
    body: post.body,
  }));
  // 액션함수를 토대로 이벤트 정의
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );
  // 언마운트될 때 초기화
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;
