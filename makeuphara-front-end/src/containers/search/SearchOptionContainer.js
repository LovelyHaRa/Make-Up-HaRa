import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeOption, initializeOption } from '../../module/redux/search';
import {
  TotalSearchOption,
  WikiSearchOption,
  BlogSearchOption,
} from '../../components/search/SearchOption';
import qs from 'qs';

export const TotalSearchOptionContainer = withRouter(
  ({ location, history }) => {
    const dispatch = useDispatch();
    const { option } = useSelector(({ search }) => ({
      option: search.option,
    }));

    const handleChange = (event) => {
      const key = event.target.name;
      dispatch(changeOption({ key, value: event.target.value }));
    };

    const optionData = [
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
    ];

    useEffect(() => {
      const { totalSort, totalTerm } = option;
      const optionQuery = {
        oldest: totalSort === 'oldest',
        day: totalTerm,
      };
      if (!optionQuery.oldest || optionQuery.oldest === '') {
        delete optionQuery.oldest;
      }
      if (optionQuery.day === '0' || optionQuery.day === '') {
        delete optionQuery.day;
      }
      const { query, page } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      const queryString = qs.stringify({ query, page, ...optionQuery });
      history.replace(`/search?${queryString}`);
    }, [option, history, location.search]);

    useEffect(() => {
      return () => {
        dispatch(initializeOption());
      };
    }, [dispatch]);

    return (
      <TotalSearchOption
        option={option}
        optionData={optionData}
        handleChange={handleChange}
      />
    );
  },
);

export const WikiSearchOptionContainer = withRouter(({ location, history }) => {
  const dispatch = useDispatch();
  const { option } = useSelector(({ search }) => ({
    option: search.option,
  }));

  const handleChange = (event) => {
    const key = event.target.name;
    dispatch(changeOption({ key, value: event.target.value }));
  };

  const optionData = [
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
  ];

  useEffect(() => {
    const { wikiSort, wikilength } = option;
    const optionQuery = {
      oldest: wikiSort === 'oldest',
      longest: wikilength === 'longest',
      shortest: wikilength === 'shortest',
    };
    if (!optionQuery.oldest || optionQuery.oldest === '') {
      delete optionQuery.oldest;
    }
    if (!optionQuery.longest || optionQuery.longest === '') {
      delete optionQuery.longest;
    }
    if (!optionQuery.shortest || optionQuery.shortest === '') {
      delete optionQuery.shortest;
    }
    const { wiki, query, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const queryString = qs.stringify({ wiki, query, page, ...optionQuery });
    history.replace(`/search?${queryString}`);
  }, [option, history, location.search]);

  useEffect(() => {
    return () => {
      dispatch(initializeOption());
    };
  }, [dispatch]);

  return (
    <WikiSearchOption
      option={option}
      optionData={optionData}
      handleChange={handleChange}
    />
  );
});

export const BlogSearchOptionContainer = withRouter(({ location, history }) => {
  const dispatch = useDispatch();
  const { option } = useSelector(({ search }) => ({
    option: search.option,
  }));

  const handleChange = (event) => {
    const key = event.target.name;
    dispatch(changeOption({ key, value: event.target.value }));
  };

  const optionData = [
    {
      name: 'blogSort',
      text: '정렬',
      item: [
        { name: '최신순', value: 'lately' },
        { name: '오래된순', value: 'oldest' },
      ],
    },
    {
      name: 'blogTerm',
      text: '기간',
      item: [
        { name: '전체', value: '0' },
        { name: '1일', value: '1' },
        { name: '7일', value: '7' },
        { name: '30일', value: '30' },
      ],
    },
  ];

  useEffect(() => {
    const { blogSort, blogTerm } = option;
    const optionQuery = {
      oldest: blogSort === 'oldest',
      day: blogTerm,
    };
    if (!optionQuery.oldest || optionQuery.oldest === '') {
      delete optionQuery.oldest;
    }
    if (optionQuery.day === '0' || optionQuery.day === '') {
      delete optionQuery.day;
    }
    const { blog, query, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const queryString = qs.stringify({ blog, query, page, ...optionQuery });
    history.replace(`/search?${queryString}`);
  }, [option, history, location.search]);

  useEffect(() => {
    return () => {
      dispatch(initializeOption());
    };
  }, [dispatch]);

  return (
    <BlogSearchOption
      option={option}
      optionData={optionData}
      handleChange={handleChange}
    />
  );
});
