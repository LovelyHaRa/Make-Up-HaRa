import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';

import Header from '../Header';

const props = {
  user: null,
  onLogout: jest.fn(),
  isDarkTheme: false,
  currentPath: '/',
  searchQuery: '',
  handleSearchInput: jest.fn(),
  handleSearchKeyUp: jest.fn(),
  handleDarkThemeToggle: jest.fn(),
};

describe('<Header />', () => {
  it('should be render', () => {
    const { getByText, getByPlaceholderText } = render(<Header {...props} />, {
      wrapper: MemoryRouter,
    });

    expect(getByText('MAKE UP HARA')).toBeInTheDocument();
    expect(getByText('WIKI')).toBeInTheDocument();
    expect(getByText('Blog')).toBeInTheDocument();
    expect(getByPlaceholderText('검색')).toBeInTheDocument();
  });

  it('should be render if user is none', () => {
    const { getByText } = render(<Header {...props} />, {
      wrapper: MemoryRouter,
    });

    expect(getByText('로그인')).toBeInTheDocument();
  });

  it('should be dropdown render', () => {
    const { container, getByText } = render(<Header {...props} />, {
      wrapper: MemoryRouter,
    });

    const openDropdown = (target, list) => {
      const element = container.querySelector(target);
      fireEvent.click(element);
      list.map((item) => expect(getByText(item)).toBeInTheDocument());
    };

    openDropdown('.etc-menu-button a', ['작성이 필요한 문서[WIKI]']);
    openDropdown('.none-user-menu a', ['DARK THEME']);
  });

  it('should be render if user is exist', () => {
    const nextProps = { ...props, user: { username: 'test', name: 'test' } };
    const { container, getByText } = render(<Header {...nextProps} />, {
      wrapper: MemoryRouter,
    });

    const list = ['test', 'My Page', 'DARK THEME', '로그아웃'];

    const element = container.querySelector('.user-info a');
    fireEvent.click(element);
    list.map((item) => expect(getByText(item)).toBeInTheDocument());
  });
});
