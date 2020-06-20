import React from 'react';
import Pagination from '../../components/common/Pagination';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qs from 'qs';

export const TotalPaginationContainer = withRouter(({ location }) => {
  // 전역 변수 불러오기
  const {
    postList,
    postListLoading,
    postLastPage,
    wikiList,
    wikiListLoading,
    wikiLastPage,
  } = useSelector(({ post, wiki, loading }) => ({
    postList: post.postList,
    postListLoading: loading['post/GET_LIST'],
    postLastPage: post.lastPage,
    wikiList: wiki.searchList,
    wikiListLoading: loading['wiki/GET_SEARCH_LIST'],
    wikiLastPage: wiki.lastPage,
  }));

  if ((!postList || postListLoading) && (!wikiList || wikiListLoading)) {
    return null;
  }

  // page가 없으면 1을 기본으로 사용
  const { query, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const queryString = qs.stringify({ query });

  const compare = (a, b) => {
    return a > b ? a : b;
  };

  return (
    <Pagination
      path={`/search`}
      query={queryString}
      page={parseInt(page, 10)}
      lastPage={compare(postLastPage, wikiLastPage)}
    />
  );
});

export const WikiPaginationContainer = withRouter(({ location }) => {
  // 전역 변수 불러오기
  const { wikiList, wikiListLoading, wikiLastPage } = useSelector(
    ({ wiki, loading }) => ({
      wikiList: wiki.searchList,
      wikiListLoading: loading['wiki/GET_SEARCH_LIST'],
      wikiLastPage: wiki.lastPage,
    }),
  );

  if (!wikiList || wikiListLoading) {
    return null;
  }

  // page가 없으면 1을 기본으로 사용
  const { query, wiki, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const queryString = qs.stringify({ query, wiki });

  return (
    <Pagination
      path={`/search`}
      query={queryString}
      page={parseInt(page, 10)}
      lastPage={wikiLastPage}
    />
  );
});

export const BlogPaginationContainer = withRouter(({ location }) => {
  // 전역 변수 불러오기
  const { postList, postListLoading, postLastPage } = useSelector(
    ({ post, loading }) => ({
      postList: post.postList,
      postListLoading: loading['post/GET_LIST'],
      postLastPage: post.lastPage,
    }),
  );

  if (!postList || postListLoading) {
    return null;
  }

  // page가 없으면 1을 기본으로 사용
  const { query, blog, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const queryString = qs.stringify({ query, blog });

  return (
    <Pagination
      path={`/search`}
      query={queryString}
      page={parseInt(page, 10)}
      lastPage={postLastPage}
    />
  );
});
