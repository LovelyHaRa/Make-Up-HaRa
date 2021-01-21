import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { sampleDocumentSearchList as documentList } from '../../../lib/data/test';
import WikiList from '../WikiList';

const props = {
  documentList,
  error: null,
  loading: false,
  lastDocumenetRef: null,
  isLastPage: true,
};

describe('<WikiList />', () => {
  const renderWithProvider = ({ props }) => {
    const Wrapper = ({ children }) => (
      <MemoryRouter>
        <HelmetProvider>{children}</HelmetProvider>
      </MemoryRouter>
    );
    return render(<WikiList {...props} />, {
      wrapper: Wrapper,
    });
  };

  it('should be render', () => {
    const { getByText } = renderWithProvider({ props });

    documentList.forEach((document) => {
      expect(getByText(document.name)).toBeInTheDocument();
    });
  });

  it('should be render if documenetList is empty', () => {
    const nextProps = { ...props, documentList: [] };
    const { getByText } = renderWithProvider({ props: nextProps });

    expect(getByText('검색 결과가 없습니다.')).toBeInTheDocument();
    expect(
      getByText('다른 검색어를 입력해보는건 어떨까요???'),
    ).toBeInTheDocument();
  });

  it('should be render if error is existed', () => {
    const nextProps = {
      ...props,
      documentList: null,
      error: { response: { status: 404, statusText: 'Not Found' } },
    };
    const { getByText } = renderWithProvider({ props: nextProps });

    expect(getByText('검색 결과 요청 실패.')).toBeInTheDocument();
    expect(getByText('Status:')).toBeInTheDocument();
    expect(getByText(nextProps.error.response.status)).toBeInTheDocument();
    expect(getByText('Message:')).toBeInTheDocument();
    expect(getByText(nextProps.error.response.statusText)).toBeInTheDocument();
  });
});
