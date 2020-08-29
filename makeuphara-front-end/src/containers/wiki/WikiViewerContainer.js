import React, { useCallback, useEffect, useState } from 'react';
import WikiViewer from '../../components/wiki/WikiViewer';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  readDocument,
  unloadDocument,
  setOriginalDocument,
  addBarcodeNumber,
} from '../../module/redux/wiki';
import qs from 'qs';

const WikiViewerContainer = ({ location, match, history }) => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 상태 불러오기
  const { docName } = match.params;
  const { document, error, loading, result, resultError, user } = useSelector(
    ({ wiki, user, loading }) => ({
      document: wiki.document,
      error: wiki.documentError,
      loading: loading['wiki/READ_DOCUMENT'],
      result: wiki.addBarcodeNumberResult,
      resultError: wiki.addBarcodeNumberResultError,
      user: user.user,
    }),
  );
  const { r } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const [barcode, setBarcode] = useState('');
  const [inputBarcodeError, setInputBarcodeError] = useState(false);
  const [resultMessage, setResultMessage] = useState({
    success: '',
    failure: '',
  });
  const [availableBarcode, setAvailableBarcode] = useState(false);

  // 이벤트 정의
  const onEdit = useCallback(() => {
    dispatch(setOriginalDocument(document));
    history.push('/wiki/edit');
  }, [dispatch, history, document]);

  const handleBarcodeChange = useCallback((event) => {
    const data = event.target.value;
    // 14자 이후로는 허용 안함
    if (data.length < 14) {
      setBarcode(event.target.value);
    }
    // 검증
    if ((data.length > 0 && data.length < 13) || isNaN(data)) {
      setInputBarcodeError(true);
    } else {
      setInputBarcodeError(false);
    }
    // 결과 메시지 초기화
    setResultMessage({
      success: '',
      failure: '',
    });
  }, []);

  // 바코드 등록 submit 이벤트
  const handleBarcodeSubmit = useCallback(
    (event) => {
      event.preventDefault();
      // 검증 성공시 액션 디스패치
      if (!inputBarcodeError && barcode !== '') {
        dispatch(
          addBarcodeNumber({ title: document.title.name, code: barcode }),
        );
      }
    },
    [dispatch, inputBarcodeError, barcode, document],
  );

  useEffect(() => {
    if (docName) {
      dispatch(readDocument({ id: docName, r }));
    } else {
      history.replace('/w/MAKE UP HARA WIKI: 대문');
    }
    // 언마운트 될 때 포스트 데이터 제거
    return () => {
      dispatch(unloadDocument());
      setBarcode('');
    };
  }, [dispatch, history, docName, r]);

  useEffect(() => {
    if (user) setAvailableBarcode(true);
    else setAvailableBarcode(false);
  }, [user]);

  useEffect(() => {
    if (result == null && resultError == null) {
      return;
    }
    if (result) {
      if (!result.error) {
        setResultMessage({
          success: '바코드 번호가 등록되었습니다!',
          failure: '',
        });
      } else {
        setResultMessage({
          success: '',
          failure: result.message,
        });
      }
    } else if (resultError) {
      if (resultError.response && resultError.response.status === 401) {
        setResultMessage({
          success: '',
          failure: '로그인 후 등록할 수 있습니다.',
        });
      } else {
        setResultMessage({
          success: '',
          failure: resultError.message,
        });
      }
    }
  }, [result, resultError]);

  return (
    <WikiViewer
      document={document}
      error={error}
      loading={loading}
      onEdit={onEdit}
      docName={docName}
      handleBarcodeChange={handleBarcodeChange}
      handleBarcodeSubmit={handleBarcodeSubmit}
      barcode={barcode}
      inputBarcodeError={inputBarcodeError}
      resultMessage={resultMessage}
      user={user}
      availableBarcode={availableBarcode}
    />
  );
};

export default withRouter(WikiViewerContainer);
