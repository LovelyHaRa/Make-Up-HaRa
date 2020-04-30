import React from 'react';
import styled from 'styled-components';
import Category from '../common/Category';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

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
  const handleActive = (name) => {
    if (name === 'oldest' && oldest === 'true') return true;
    else if (name === 'shortest' && shortest === 'true') return true;
    else if (name === 'longest' && longest === 'true') return true;
    else if (
      name === 'normal' &&
      oldest === undefined &&
      shortest === undefined &&
      longest === undefined
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
          exact={true}
          isActive={() => handleActive(category.name)}
          to={
            category.name === 'normal'
              ? `/wiki/list?${qs.stringify({ query: query })}`
              : `/wiki/list?${qs.stringify({ query: query })}&${
                  category.name
                }=true`
          }
        >
          {category.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default withRouter(Categories);
