import React, { useState } from 'react';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
/**
 * 검색 옵션 컴포넌트
 */

const SearchOptionBlock = styled.div`
  display: flex;
  margin: 0rem 2rem;

  @media screen and (max-width: 768px) {
    overflow-x: auto;
  }
  border-bottom: 1px solid ${({ theme }) => theme.searchBorder};
  .option-group {
    display: flex;
    flex-direction: row;
  }
  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 2px solid ${({ theme }) => theme.categoryBorder};
  }
  .MuiInputBase-root::after {
    border-bottom: 2px solid ${({ theme }) => theme.categoryBorder};
  }
  .MuiSelect-root {
    font-family: 'NanumBarunGothic';
    color: ${({ theme }) => theme.text};
  }
  .MuiSelect-icon {
    color: ${({ theme }) => theme.hoverText};
  }
`;

const CustomMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    font-family: 'NanumBarunGothic';
  }
`;

const CustomOption = ({ data, optionValue, handleChange }) => {
  const { name, text, item } = data;
  return (
    <FormControl>
      <Select
        value={optionValue}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label', name: name }}
      >
        <CustomMenuItem value="" disabled>
          {text}
        </CustomMenuItem>
        {item.map((element, index) => (
          <CustomMenuItem key={index} value={element.value}>
            {element.name}
          </CustomMenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const TotalSearchOption = () => {
  const [optionValue, setOptionValue] = useState({
    sort: '',
    term: '',
  });
  const handleChange = (event) => {
    const key = event.target.name;
    setOptionValue({ ...optionValue, [key]: event.target.value });
  };
  const optionData = [
    {
      name: 'sort',
      text: '정렬',
      item: [
        { name: '최신순', value: 'lately' },
        { name: '오래된순', value: 'oldest' },
      ],
    },
    {
      name: 'term',
      text: '기간',
      item: [
        { name: '1일', value: '1' },
        { name: '7일', value: '7' },
        { name: '15일', value: '15' },
        { name: '30일', value: '30' },
      ],
    },
  ];
  return (
    <SearchOptionBlock>
      <div className="option-group">
        {optionData.map((data) => (
          <CustomOption
            key={data.name}
            data={data}
            optionValue={optionValue[data.name]}
            handleChange={handleChange}
          />
        ))}
      </div>
    </SearchOptionBlock>
  );
};

export const WikiSearchOption = () => {
  const [optionValue, setOptionValue] = useState({
    sort: '',
    length: '',
  });
  const handleChange = (event) => {
    const key = event.target.name;
    setOptionValue({ ...optionValue, [key]: event.target.value });
  };
  const optionData = [
    {
      name: 'sort',
      text: '정렬',
      item: [
        { name: '최신순', value: 'lately' },
        { name: '오래된순', value: 'oldest' },
      ],
    },
    {
      name: 'length',
      text: '내용 길이',
      item: [
        { name: '짧은 내용', value: 'shortest' },
        { name: '긴 내용', value: 'longest' },
      ],
    },
  ];
  return (
    <SearchOptionBlock>
      <div className="option-group">
        {optionData.map((data) => (
          <CustomOption
            key={data.name}
            data={data}
            optionValue={optionValue[data.name]}
            handleChange={handleChange}
          />
        ))}
      </div>
    </SearchOptionBlock>
  );
};

export const BlogSearchOption = () => {
  const [optionValue, setOptionValue] = useState({
    sort: '',
    term: '',
  });
  const handleChange = (event) => {
    const key = event.target.name;
    setOptionValue({ ...optionValue, [key]: event.target.value });
  };
  const optionData = [
    {
      name: 'sort',
      text: '정렬',
      item: [
        { name: '최신순', value: 'lately' },
        { name: '오래된순', value: 'oldest' },
      ],
    },
    {
      name: 'term',
      text: '기간',
      item: [
        { name: '1일', value: '1' },
        { name: '7일', value: '7' },
        { name: '15일', value: '15' },
        { name: '30일', value: '30' },
      ],
    },
  ];
  return (
    <SearchOptionBlock>
      <div className="option-group">
        {optionData.map((data) => (
          <CustomOption
            key={data.name}
            data={data}
            optionValue={optionValue[data.name]}
            handleChange={handleChange}
          />
        ))}
      </div>
    </SearchOptionBlock>
  );
};
