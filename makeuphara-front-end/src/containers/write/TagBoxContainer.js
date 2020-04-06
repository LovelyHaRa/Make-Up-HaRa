import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField } from '../../module/redux/post';
import TagBox from '../../components/write/TagBox';

const TagBoxContainer = () => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 상태 불러오기
  const tags = useSelector(state => state.post.tags);

  // 이벤트 정의
  const onChangeTags = nextTags => {
    dispatch(changeField({ key: 'tags', value: nextTags }));
  };

  return <TagBox onChangeTags={onChangeTags} tags={tags} />;
};

export default TagBoxContainer;
