import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { sampleHistoryList as historyList } from '../../../lib/data/test';
import WikiHistory from '../WikiHistory';

const props = {
  historyList,
  error: null,
  loading: false,
  docName: historyList[0].title.name,
};

describe('<WikiHistory />', () => {
  it('should be render', () => {
    const { getByText, getAllByText } = render(<WikiHistory {...props} />, {
      wrapper: MemoryRouter,
    });

    expect(getByText(props.docName)).toBeInTheDocument();
    expect(getByText('(문서 역사)')).toBeInTheDocument();

    expect(getAllByText('(보기)')).toHaveLength(historyList.length);
  });

  it('should be render when error is existed', () => {
    const nextProps = {
      ...props,
      error: { response: { status: 404, statusText: 'Not Found' } },
      historyList: null,
    };
    const { getByText } = render(<WikiHistory {...nextProps} />, {
      wrapper: MemoryRouter,
    });

    expect(getByText('히스토리 요청 실패.')).toBeInTheDocument();
    expect(getByText('Status:')).toBeInTheDocument();
    expect(getByText(nextProps.error.response.status)).toBeInTheDocument();
    expect(getByText('Message:')).toBeInTheDocument();
    expect(getByText(nextProps.error.response.statusText)).toBeInTheDocument();
  });
});
