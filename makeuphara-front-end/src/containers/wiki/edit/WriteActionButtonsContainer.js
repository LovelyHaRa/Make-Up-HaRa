import React, { useEffect } from 'react';
import WriteActionButtons from '../../../components/common/editor/WriteActionButtons';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
    throw error;
  }
  const { _id } = localTitle;
  // 이벤트 정의
  // 문서 등록
  const onPublish = () => {
    dispatch(writeDocument({ id: _id, body }));
  };
  // 취소
  const onCancel = () => {
    history.goBack();
  };
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
      throw error;
    }
  }, [history, editDocument, editDocumentError]);
  return (
    <WriteActionButtons type="wiki" onClick={onPublish} onCancel={onCancel} />
  );
};

export default withRouter(WriteActionButtonsContainer);
