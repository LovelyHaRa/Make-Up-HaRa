import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputBarcodeModal from '../InputBarcodeModal';

const props = {
  className: 'modal',
  visible: true,
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  value: '',
  onCancel: jest.fn(),
  error: false,
  resultMessage: '',
};

describe('<InputBarcodeModal />', () => {
  it('should be render', () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(
      <InputBarcodeModal {...props} />,
    );

    expect(getByText('바코드 등록')).toBeInTheDocument();
    expect(getByText('바코드 번호를 등록할 수 있습니다.')).toBeInTheDocument();
    expect(getByLabelText('BARCODE')).toBeInTheDocument();
    expect(getByPlaceholderText('13자리 바코드 번호')).toBeInTheDocument();
    expect(getByText('닫기')).toBeInTheDocument();
    expect(getByText('코드 등록')).toBeInTheDocument();
  });

  it('should be call handler', () => {
    const { getByText, getByPlaceholderText } = render(
      <InputBarcodeModal {...props} />,
    );

    props.onSubmit.mockImplementation((e) => {
      e.preventDefault();
    });

    const input = getByPlaceholderText('13자리 바코드 번호');
    userEvent.type(input, 'test');
    expect(props.onChange).toBeCalledTimes(4);

    userEvent.click(getByText('닫기'), { button: 0 });
    expect(props.onCancel).toBeCalled();
    userEvent.click(getByText('코드 등록'), { button: 0 });
    expect(props.onSubmit).toBeCalled();
  });
});
