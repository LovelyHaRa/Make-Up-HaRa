import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { sampleWikiRequestList as requestList } from '../../../lib/data/test';
import WikiRequest from '../WikiRequest';

const props = {
  requestList,
  loading: false,
  error: null,
  onEdit: jest.fn(),
};

describe('<WikiRequest />', () => {
  it('should be render', () => {
    const { getByText, getAllByText } = render(<WikiRequest {...props} />);

    expect(getByText('작성이 필요한 문서')).toBeInTheDocument();
    requestList.forEach((request) => {
      expect(getByText(request.name)).toBeInTheDocument();
    });

    const buttons = getAllByText('작성하기');
    expect(buttons).toHaveLength(requestList.length);

    buttons.forEach((button) => {
      fireEvent.click(button);
    });

    expect(props.onEdit).toBeCalledTimes(buttons.length);
  });

  it('should be render if request list is empty', () => {
    const nextProps = { ...props, requestList: [] };
    const { getByText } = render(<WikiRequest {...nextProps} />);

    expect(
      getByText('지금 작성이 필요한 문서가 없습니다...ㅠ'),
    ).toBeInTheDocument();
  });

  it('should be render if error is existed', () => {
    const nextProps = {
      ...props,
      requestList: null,
      error: { response: { status: 404, statusText: 'Not Found' } },
    };
    const { getByText } = render(<WikiRequest {...nextProps} />);

    expect(getByText('리스트 요청 실패.')).toBeInTheDocument();
    expect(
      getByText(`Status: ${nextProps.error.response.status}`),
    ).toBeInTheDocument();
    expect(
      getByText(`Message: ${nextProps.error.response.statusText}`),
    ).toBeInTheDocument();
  });
});
