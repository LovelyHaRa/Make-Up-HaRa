import React, { useEffect, useRef, useState } from 'react';
import WikiList from '../../components/wiki/WikiList';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchList } from '../../module/redux/wiki';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import Categories from '../../components/wiki/Categories';

const isValidQuery = (oldest, shortest, longest) => {
  if (oldest !== undefined && shortest !== undefined) {
    return false;
  }
  if (shortest !== undefined && longest !== undefined) {
    return false;
  }
  if (oldest !== undefined && longest !== undefined) {
    return false;
  }
  if (oldest !== undefined && shortest !== undefined && longest !== undefined) {
    return false;
  }
  return true;
};

const WikiListContainer = ({ location, history }) => {
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
  const [documentList, setDocumentList] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [active, setActive] = useState(false);

  // 이벤트 정의하기
  useEffect(() => {
    if (searchList && active && !loading) {
      setIsLastPage(searchList.length === 0 ? true : false);
      setDocumentList((element) => [...element, ...searchList]);
    }
  }, [searchList, active, loading]);

  useEffect(() => {
    if (isValidQuery(oldest, shortest, longest)) {
      page.current = 1;
      dispatch(getSearchList({ query, oldest, shortest, longest }));
      console.log('출발');
      setActive(true);
    } else {
      history.replace(`/wiki/list?query=${query}`);
    }
  }, [dispatch, history, query, oldest, shortest, longest]);

  const lastDocumentRef = useRef(null);
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

  useEffect(() => {
    return () => {
      setIsLastPage(false);
      setActive(false);
      setDocumentList([]);
    };
  }, []);
  console.log(documentList);
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
