import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import WriteActionButtons from '../../../components/common/editor/WriteActionButtons';
import { writeDocument } from '../../../module/redux/wiki';

const WriteActionButtonsContainer = ({ history }) => {
  // 액션함수 불러오기
  const dispatch = useDispatch();
  // 전역 상태 불러오기
  const { title, body, editDocument, editDocumentError } = useSelector(
    ({ wiki }) => ({
      title: wiki.title,
      body: wiki.body,
      editDocument: wiki.editDocument,
      editDocumentError: wiki.editDocumentError,
    }),
  );

  let localTitle;
  try {
    localTitle = title || JSON.parse(sessionStorage.getItem('wiki-title'));
  } catch (error) {
    throw new Error('cannot access sessionStorage');
  }
  const { _id } = localTitle;

  // 이벤트 정의
  // 문서 등록
  const onPublish = useCallback(() => {
    dispatch(writeDocument({ id: _id, body }));
  }, [dispatch, _id, body]);

  // 취소
  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  // 처리 후 작업
  useEffect(() => {
    if (editDocument) {
      const { name } = editDocument;
      history.replace(`/w/${name}`);
      history.goBack();
    }
    if (editDocumentError) {
      // TODO: Failure Write Document
    }
    try {
      sessionStorage.getItem('wiki-title');
    } catch (error) {
      throw new Error('cannot access sessionStorage');
    }
  }, [history, editDocument, editDocumentError]);

  return (
    <WriteActionButtons type="wiki" onClick={onPublish} onCancel={onCancel} />
  );
};

export default withRouter(WriteActionButtonsContainer);
