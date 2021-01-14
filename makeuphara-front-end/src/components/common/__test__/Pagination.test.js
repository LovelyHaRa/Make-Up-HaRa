import React from 'react';
import { renderWithRouter } from '../../../lib/test-utils';

import Pagination from '../Pagination';
import { getPageNumber } from '../../../lib/util';

const props = {
  path: '/blog',
  query: '',
  page: 1,
  lastPage: 20,
};

describe('<Pagination />', () => {
  it('should be render if page is 1 and last page is 20', () => {
    const { container, getByText } = renderWithRouter(
      <Pagination {...props} />,
    );

    const { mid: midGroup } = getPageNumber(1, 20);

    midGroup.forEach((element) =>
      expect(getByText(element)).toBeInTheDocument(),
    );
    expect(getByText('20')).toBeInTheDocument();
    expect(container.querySelectorAll('.page-skip')).toHaveLength(1);
  });

  it('should be render if page is 10 and last page is 20', () => {
    const nextProps = { ...props, page: 10 };
    const { container, getByText } = renderWithRouter(
      <Pagination {...nextProps} />,
    );

    const { front: frontGroup, mid: midGroup } = getPageNumber(10, 20);

    frontGroup.forEach((element) =>
      expect(getByText(element)).toBeInTheDocument(),
    );
    midGroup.forEach((element) =>
      expect(getByText(element)).toBeInTheDocument(),
    );
    expect(getByText('20')).toBeInTheDocument();
    expect(container.querySelectorAll('.page-skip')).toHaveLength(2);
  });

  it('should be render if page is 20 and last page is 20', () => {
    const nextProps = { ...props, page: 20 };
    const { container, getByText } = renderWithRouter(
      <Pagination {...nextProps} />,
    );

    const { mid: midGroup } = getPageNumber(20, 20);

    expect(getByText('1')).toBeInTheDocument();
    midGroup.forEach((element) =>
      expect(getByText(element)).toBeInTheDocument(),
    );
    expect(container.querySelectorAll('.page-skip')).toHaveLength(1);
  });
});
