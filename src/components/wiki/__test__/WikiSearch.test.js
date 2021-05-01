import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import WikiSearch from '../WikiSearch';

const props = {
  query: '',
  onChangeField: jest.fn(),
  onSearch: jest.fn(),
  onDirect: jest.fn(),
  onShuffle: jest.fn(),
};

describe('<WikiSearch />', () => {
  it('should be render', () => {
    const { container, getByPlaceholderText } = render(
      <WikiSearch {...props} />,
    );

    expect(
      container.getElementsByClassName('fa-random')[0],
    ).toBeInTheDocument();
    expect(getByPlaceholderText('위키 문서 검색')).toBeInTheDocument();
    expect(
      container.getElementsByClassName('fa-search')[0],
    ).toBeInTheDocument();
    expect(
      container.getElementsByClassName('fa-arrow-right')[0],
    ).toBeInTheDocument();
  });

  it('should be call handler', () => {
    const { container, getByPlaceholderText } = render(
      <WikiSearch {...props} />,
    );

    const input = getByPlaceholderText('위키 문서 검색');
    userEvent.type(input, 'test');
    expect(props.onChangeField).toBeCalledTimes(4);

    userEvent.click(container.getElementsByClassName('fa-random')[0], {
      button: 0,
    });
    expect(props.onShuffle).toBeCalled();
    userEvent.click(container.getElementsByClassName('fa-search')[0], {
      button: 0,
    });
    expect(props.onSearch).toBeCalled();
    userEvent.click(container.getElementsByClassName('fa-arrow-right')[0], {
      button: 0,
    });
    expect(props.onDirect).toBeCalled();
  });
});
