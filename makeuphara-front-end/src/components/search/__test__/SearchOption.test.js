import React from 'react';
import { render } from '@testing-library/react';
import {
  BlogSearchOption,
  TotalSearchOption,
  WikiSearchOption,
} from '../SearchOption';

const option = {
  totalSort: '',
  totalTerm: '',
  wikiSort: '',
  wikilength: '',
  blogSort: '',
  blogTerm: '',
};

describe('<TotalSearchOption />', () => {
  const props = {
    option,
    optionData: [
      {
        name: 'totalSort',
        text: '정렬',
        item: [
          { name: '최신순', value: 'lately' },
          { name: '오래된순', value: 'oldest' },
        ],
      },
      {
        name: 'totalTerm',
        text: '기간',
        item: [
          { name: '전체', value: '0' },
          { name: '1일', value: '1' },
          { name: '7일', value: '7' },
          { name: '30일', value: '30' },
        ],
      },
    ],
    handleChange: jest.fn(),
  };

  it('should be render', () => {
    const { getByText } = render(<TotalSearchOption {...props} />);
    const sortOption = getByText('정렬');
    expect(sortOption).toBeInTheDocument();
    const termOption = getByText('기간');
    expect(termOption).toBeInTheDocument();
  });
});

describe('<WikiSearchOption />', () => {
  const props = {
    option,
    optionData: [
      {
        name: 'wikiSort',
        text: '정렬',
        item: [
          { name: '최신순', value: 'lately' },
          { name: '오래된순', value: 'oldest' },
        ],
      },
      {
        name: 'wikilength',
        text: '내용 길이',
        item: [
          { name: '짧은 내용', value: 'shortest' },
          { name: '긴 내용', value: 'longest' },
        ],
      },
    ],
    handleChange: jest.fn(),
  };

  it('should be render', () => {
    const { getByText } = render(<WikiSearchOption {...props} />);
    const sortOption = getByText('정렬');
    expect(sortOption).toBeInTheDocument();
    const lengthOption = getByText('내용 길이');
    expect(lengthOption).toBeInTheDocument();
  });
});

describe('<BlogSearchOption />', () => {
  const props = {
    option,
    optionData: [
      {
        name: 'totalSort',
        text: '정렬',
        item: [
          { name: '최신순', value: 'lately' },
          { name: '오래된순', value: 'oldest' },
        ],
      },
      {
        name: 'totalTerm',
        text: '기간',
        item: [
          { name: '전체', value: '0' },
          { name: '1일', value: '1' },
          { name: '7일', value: '7' },
          { name: '30일', value: '30' },
        ],
      },
    ],
    handleChange: jest.fn(),
  };

  it('should be render', () => {
    const { getByText } = render(<BlogSearchOption {...props} />);
    const sortOption = getByText('정렬');
    expect(sortOption).toBeInTheDocument();
    const termOption = getByText('기간');
    expect(termOption).toBeInTheDocument();
  });
});
