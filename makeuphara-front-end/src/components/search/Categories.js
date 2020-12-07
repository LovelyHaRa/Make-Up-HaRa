import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import Category from '../common/Category';

/**
 * 검색 결과 카테고리
 */

const categories = [
  { name: 'total', text: '통합검색', to: '/search?' },
  { name: 'wiki', text: '위키검색', to: '/search?wiki=true' },
  { name: 'blog', text: '블로그', to: '/search?blog=true' },
];

const CategoriesBlock = styled.div`
  margin: 2rem;
  margin-bottom: 0;
  padding-top: 0.1rem;
  line-height: 3;
  border-top: 1px solid ${({ theme }) => theme.searchBorder};
  border-bottom: 1px solid ${({ theme }) => theme.searchBorder};
  color: ${({ theme }) => theme.text};
  display: flex;
  @media screen and (max-width: 768px) {
    overflow-x: auto;
  }
`;

const Categories = ({ location }) => {
  const { query, wiki, blog } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  // 카테고리 중 쿼리에 해당하는 것 하나만 활성화하기 위한 핸들링 함수
  const handleActive = (name) => {
    if (name === 'wiki' && wiki === 'true') return true;
    if (name === 'blog' && blog === 'true') return true;
    if (
      name === 'total' &&
      (wiki === undefined || wiki !== 'true') &&
      (blog === undefined || blog !== 'true')
    ) {
      return true;
    }
    return false;
  };

  return (
    <CategoriesBlock>
      {categories.map((category) => (
        <Category
          key={category.name}
          activeClassName="active"
          exact
          isActive={() => handleActive(category.name)}
          to={`${category.to}&query=${query}`}
        >
          {category.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default withRouter(Categories);
