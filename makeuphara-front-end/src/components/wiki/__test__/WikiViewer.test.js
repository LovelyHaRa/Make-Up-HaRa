import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { format } from 'date-fns';
import { renderWithRouter } from '../../../lib/test-utils';

import { sampleDocumentList as documentList } from '../../../lib/data/test';
import WikiViewer from '../WikiViewer';

const props = {
  document: documentList[0],
  error: null,
  loading: false,
  onEdit: jest.fn(),
  docName: documentList[0].title.name,
  handleBarcodeChange: jest.fn(),
  handleBarcodeSubmit: jest.fn(),
  barcode: '',
  inputBarcodeError: false,
  resultMessage: {
    success: '',
    failure: '',
  },
  availableBarcode: false,
};

describe('<WikiViewer />', () => {
  const renderWithProvider = ({ props }) => {
    const Wrapper = ({ children }) => (
      <MemoryRouter>
        <HelmetProvider>{children}</HelmetProvider>
      </MemoryRouter>
    );
    return render(<WikiViewer {...props} />, {
      wrapper: Wrapper,
    });
  };

  it('should be render', () => {
    const { getByText } = renderWithProvider({ props });

    const { title, publishedDate } = props.document;

    expect(getByText('편집')).toBeInTheDocument();
    expect(getByText('역사')).toBeInTheDocument();

    expect(getByText(title.name)).toBeInTheDocument();
    expect(
      getByText(
        `최근 수정시각: ${format(
          new Date(publishedDate),
          'yyyy-MM-dd HH:mm:ss',
        )}`,
      ),
    ).toBeInTheDocument();
  });

  it('should be render when available regist barcode', () => {
    const nextProps = { ...props, availableBarcode: true };
    const { getByText } = renderWithProvider({ props: nextProps });

    expect(getByText('코드 등록')).toBeInTheDocument();
  });

  it('should be called function when click edit button', () => {
    const { getByText } = renderWithProvider({ props });

    const button = getByText('편집');

    fireEvent.click(button);
    expect(props.onEdit).toBeCalled();
  });

  it('redirect page when click history button', () => {
    const { getByText } = renderWithRouter(
      <HelmetProvider>
        <WikiViewer {...props} />
      </HelmetProvider>,
    );

    const button = getByText('역사');
    fireEvent.click(button);
  });

  it('should be render if error is existed', () => {
    const nextProps = {
      ...props,
      document: null,
      error: { response: { status: 404 } },
    };
    const { getByText } = renderWithProvider({ props: nextProps });

    expect(getByText('존재하지 않는 위키 문서입니다.')).toBeInTheDocument();
  });
});
