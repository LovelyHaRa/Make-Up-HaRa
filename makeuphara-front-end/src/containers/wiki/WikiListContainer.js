import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { getSearchList } from '../../module/redux/wiki';
import WikiList from '../../components/wiki/WikiList';
import Categories from '../../components/wiki/Categories';

const WikiListContainer = ({ location, history }) => {
  // 한가지 조건만 쿼리요청할 수 있도록 제어
  const isValidQuery = useCallback((oldest, shortest, longest) => {
    if (oldest !== undefined && shortest !== undefined) {
      return false;
    }
    if (shortest !== undefined && longest !== undefined) {
      return false;
    }
    if (oldest !== undefined && longest !== undefined) {
      return false;
    }
    if (
      oldest !== undefined &&
      shortest !== undefined &&
      longest !== undefined
    ) {
      return false;
    }
    return true;
  }, []);

  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 설정 불러오기
  const { searchList, error, loading } = useSelector(({ wiki, loading }) => ({
    searchList: wiki.searchList,
    error: wiki.searchListError,
    loading: loading['wiki/GET_SEARCH_LIST'],
  }));
  const { query, oldest, shortest, longest } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const page = useRef(1);
  const [documentList, setDocumentList] = useState([]); // 검색 결과 문서 리스트
  const [isLastPage, setIsLastPage] = useState(false); // 마지막 페이지 여부
  const [active, setActive] = useState(false); // 언마운트시 API 요청 결과를 무시한다

  // 이벤트 정의하기
  // 문서 리스트 업데이트
  useEffect(() => {
    if (searchList && active && !loading) {
      setIsLastPage(searchList.length === 0);
      setDocumentList((element) => [...element, ...searchList]);
    }
  }, [searchList, active, loading]);

  // 쿼리 요청
  useEffect(() => {
    setDocumentList([]);
    if (isValidQuery(oldest, shortest, longest)) {
      page.current = 1;
      dispatch(getSearchList({ query, oldest, shortest, longest }));
      setActive(true);
    } else {
      history.replace(`/wiki/list?query=${query}`);
    }
  }, [dispatch, history, query, oldest, shortest, longest, isValidQuery]);

  // 인피니티 스크롤 핸들링
  const lastDocumentRef = useRef(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const intersectionObserver = new IntersectionObserver((entries, observer) => {
    const lastDocument = entries[0];
    if (lastDocument.intersectionRatio > 0) {
      observer.unobserve(lastDocument.target);
      lastDocumentRef.current = null;
      setTimeout(() => {
        if (!isLastPage) {
          page.current += 1;
        }
        dispatch(
          getSearchList({
            query,
            oldest,
            shortest,
            longest,
            page: page.current,
          }),
        );
      }, 2000);
    }
  });

  useEffect(() => {
    if (lastDocumentRef.current) {
      intersectionObserver.observe(lastDocumentRef.current);
    }
  }, [lastDocumentRef, intersectionObserver]);

  // 언마운트시 처리
  useEffect(
    () => () => {
      setIsLastPage(false);
      setActive(false);
      setDocumentList([]);
    },
    [],
  );

  return (
    <>
      <Categories />
      <WikiList
        documentList={documentList}
        error={error}
        loading={loading}
        lastDocumentRef={lastDocumentRef}
        isLastPage={isLastPage}
      />
    </>
  );
};

export default withRouter(WikiListContainer);
