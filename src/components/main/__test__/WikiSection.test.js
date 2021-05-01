import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import WikiSection from '../WikiSection';
import { sampleDocumentList as documentList } from '../../../lib/data/test';

const props = { loading: false, error: null };

describe('<WikiSection />', () => {
  const renderWithRouter = ({ documentList, props }) =>
    render(<WikiSection documentList={documentList} {...props} />, {
      wrapper: MemoryRouter,
    });
  it('should be render if wiki list is exist', () => {
    const { getByText } = renderWithRouter({ documentList, props });

    expect(getByText('최근 변경된 위키 문서')).toBeInTheDocument();
    documentList.map(({ title }) =>
      expect(getByText(title.name)).toBeInTheDocument(),
    );
    expect(getByText('MORE WIKI...')).toBeInTheDocument();
  });

  it('should be render when data is loading', () => {
    const { getByText, queryByText } = renderWithRouter({
      documentList,
      props: { ...props, loading: true },
    });

    expect(getByText('최근 변경된 위키 문서')).toBeInTheDocument();
    documentList.map(({ title }) =>
      expect(queryByText(title.name)).not.toBeInTheDocument(),
    );
    expect(getByText('MORE WIKI...')).toBeInTheDocument();
  });

  it('should be render if data fetching is failed', () => {
    const { getByText } = renderWithRouter({
      documentList: null,
      props: { ...props, error: { message: 'Not Found' } },
    });

    expect(getByText('WIKI 리스트 요청 실패.')).toBeInTheDocument();
    expect(getByText('ERROR MESSAGE: Not Found')).toBeInTheDocument();
  });
});
