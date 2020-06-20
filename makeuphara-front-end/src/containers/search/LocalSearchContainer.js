import React, { useEffect } from 'react';
import Categories from '../../components/search/Categories';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import {
  BlogSearchOption,
  WikiSearchOption,
  TotalSearchOption,
} from '../../components/search/SearchOption';
import { useDispatch, useSelector } from 'react-redux';
import { getList } from '../../module/redux/post';
import BlogSearchResult from '../../components/search/BlogSearchResult';
import { getSearchList } from '../../module/redux/wiki';
import WikiSearchResult from '../../components/search/WikiSearchResult';
import { initialize } from '../../module/redux/search';
import {
  TotalPaginationContainer,
  WikiPaginationContainer,
  BlogPaginationContainer,
} from './PaginationContainer';

const LocalSearchContainer = ({ location }) => {
  const dispatch = useDispatch();
  const {
    postList,
    postListError,
    postListLoading,
    wikiList,
    wikiListError,
    wikiListLoading,
  } = useSelector(({ post, wiki, loading }) => ({
    postList: post.postList,
    postListError: post.postListError,
    postListLoading: loading['post/GET_LIST'],
    wikiList: wiki.searchList,
    wikiListError: wiki.searchListError,
    wikiListLoading: loading['wiki/GET_SEARCH_LIST'],
  }));
  const { query, blog, wiki, page } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  useEffect(() => {
    if (query && query !== '') {
      dispatch(getList({ query, page, block: 5 }));
      dispatch(getSearchList({ query, page, block: 10 }));
    }
  }, [dispatch, query, page]);

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <>
      <Categories />
      {!wiki && !blog && (
        <>
          <TotalSearchOption />
          <BlogSearchResult
            includeTitle
            postList={postList}
            postListError={postListError}
            postListLoading={postListLoading}
          />
          <WikiSearchResult
            includeTitle
            wikiList={wikiList}
            wikiListError={wikiListError}
            wikiListLoading={wikiListLoading}
          />
          <TotalPaginationContainer />
        </>
      )}
      {wiki && wiki === 'true' && (
        <>
          <WikiSearchOption />
          <WikiSearchResult
            includeTitle
            wikiList={wikiList}
            wikiListError={wikiListError}
            wikiListLoading={wikiListLoading}
          />
          <WikiPaginationContainer />
        </>
      )}
      {blog && blog === 'true' && (
        <>
          <BlogSearchOption />
          <BlogSearchResult
            includeTitle
            postList={postList}
            postListError={postListError}
            postListLoading={postListLoading}
          />
          <BlogPaginationContainer />
        </>
      )}
    </>
  );
};

export default withRouter(LocalSearchContainer);
