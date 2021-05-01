import React, { useCallback } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import Category from '../common/Category';

/**
 * 위키 검색결과 정렬 카테고리
 */

const categories = [
  {
    name: 'normal',
    text: '위키 문서',
  },
  {
    name: 'oldest',
    text: 'OLDEST',
  },
  {
    name: 'shortest',
    text: '짧은 내용',
  },
  {
    name: 'longest',
    text: '긴 내용',
  },
];

const CategoriesBlock = styled.div`
  margin: 2rem;
  margin-bottom: 0;
  padding-top: 0.1rem;
  line-height: 3;
  border-top: 1px solid ${({ theme }) => theme.wikiBorder};
  border-bottom: 1px solid ${({ theme }) => theme.wikiBorder};
  color: ${({ theme }) => theme.text};
  display: flex;
  @media screen and (max-width: 768px) {
    overflow-x: auto;
  }
`;

const Categories = ({ location }) => {
  const { query, oldest, shortest, longest } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  // 카테고리 중 쿼리에 해당하는 것 하나만 활성화하기 위한 핸들링 함수
  const handleActive = useCallback(
    (name) => {
      if (name === 'oldest' && oldest === 'true') return true;
      if (name === 'shortest' && shortest === 'true') return true;
      if (name === 'longest' && longest === 'true') return true;
      if (
        name === 'normal' &&
        oldest === undefined &&
        shortest === undefined &&
        longest === undefined
      ) {
        return true;
      }
      return false;
    },
    [oldest, shortest, longest],
  );

  return (
    <CategoriesBlock>
      {categories.map((category) => (
        <Category
          key={category.name}
          activeClassName="active"
          exact
          isActive={() => handleActive(category.name)}
          to={
            category.name === 'normal'
              ? `/wiki/list?${qs.stringify({ query })}`
              : `/wiki/list?${qs.stringify({ query })}&${category.name}=true`
          }
        >
          {category.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default withRouter(Categories);
