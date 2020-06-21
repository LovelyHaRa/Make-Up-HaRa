import React, { useEffect } from 'react';
import Categories from '../../components/search/Categories';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import {
  TotalSearchOptionContainer,
  WikiSearchOptionContainer,
  BlogSearchOptionContainer,
} from './SearchOptionContainer';
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
  const { query, blog, wiki, page, oldest, day, longest, shortest } = qs.parse(
    location.search,
    {
      ignoreQueryPrefix: true,
    },
  );

  useEffect(() => {
    if (query && query !== '') {
      dispatch(getList({ query, page, block: 5, oldest, day }));
      dispatch(
        getSearchList({ query, page, block: 10, oldest, longest, shortest }),
      );
    }
  }, [dispatch, query, page, oldest, day, longest, shortest]);

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
          <TotalSearchOptionContainer />
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
          {!postListLoading && !wikiListLoading && <TotalPaginationContainer />}
        </>
      )}
      {wiki && wiki === 'true' && (
        <>
          <WikiSearchOptionContainer />
          <WikiSearchResult
            includeTitle
            wikiList={wikiList}
            wikiListError={wikiListError}
            wikiListLoading={wikiListLoading}
          />
          {!wikiListLoading && <WikiPaginationContainer />}
        </>
      )}
      {blog && blog === 'true' && (
        <>
          <BlogSearchOptionContainer />
          <BlogSearchResult
            includeTitle
            postList={postList}
            postListError={postListError}
            postListLoading={postListLoading}
          />
          {!postListLoading && <BlogPaginationContainer />}
        </>
      )}
    </>
  );
};

export default withRouter(LocalSearchContainer);
