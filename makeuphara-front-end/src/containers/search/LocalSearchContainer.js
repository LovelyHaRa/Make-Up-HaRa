import React from 'react';
import Categories from '../../components/search/Categories';
import LocalSearch from '../../components/search/LocalSearch';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import {
  BlogSearchOption,
  WikiSearchOption,
  TotalSearchOption,
} from '../../components/search/SearchOption';

const LocalSearchContainer = ({ location }) => {
  const { blog, wiki } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  return (
    <>
      <Categories />
      {!wiki && !blog && <TotalSearchOption />}
      {wiki && wiki === 'true' && <WikiSearchOption />}
      {blog && blog === 'true' && <BlogSearchOption />}
      <LocalSearch />
    </>
  );
};

export default withRouter(LocalSearchContainer);
