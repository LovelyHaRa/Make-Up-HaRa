import React from 'react';
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
  .MuiInput-underline:hover:not(.Mui-disabled)::before {
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

export const TotalSearchOption = ({ option, optionData, handleChange }) => {
  return (
    <SearchOptionBlock>
      <div className="option-group">
        {optionData.map((data) => (
          <CustomOption
            key={data.name}
            data={data}
            optionValue={option[data.name]}
            handleChange={handleChange}
          />
        ))}
      </div>
    </SearchOptionBlock>
  );
};

export const WikiSearchOption = ({ option, optionData, handleChange }) => {
  return (
    <SearchOptionBlock>
      <div className="option-group">
        {optionData.map((data) => (
          <CustomOption
            key={data.name}
            data={data}
            optionValue={option[data.name]}
            handleChange={handleChange}
          />
        ))}
      </div>
    </SearchOptionBlock>
  );
};

export const BlogSearchOption = ({ option, optionData, handleChange }) => {
  return (
    <SearchOptionBlock>
      <div className="option-group">
        {optionData.map((data) => (
          <CustomOption
            key={data.name}
            data={data}
            optionValue={option[data.name]}
            handleChange={handleChange}
          />
        ))}
      </div>
    </SearchOptionBlock>
  );
};
