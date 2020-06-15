import React, { useEffect, useCallback } from 'react';
import Editor from '../../../components/wiki/edit/Editor';
import { useDispatch, useSelector } from 'react-redux';
import { initialize, changeField } from '../../../module/redux/wiki';
import { withRouter } from 'react-router-dom';

const EditorContainer = ({ history }) => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 상태 불러오기
  const { title, body } = useSelector(({ wiki }) => ({
    title: wiki.title,
    body: wiki.body,
  }));
  // 이벤트 정의
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );
  try {
    if (title) {
      sessionStorage.setItem('wiki-title', JSON.stringify(title));
    }
  } catch (error) {
    throw error;
  }

  // 언마운트 될 때 초기화
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  // 세션스토리지를 이용하여 위키 타이틀 상태 저장
  if (!title && !sessionStorage.getItem('wiki-title')) {
    history.push('/wiki');
    return null;
  }

  return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default withRouter(EditorContainer);
