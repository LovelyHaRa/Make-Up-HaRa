import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

const TagBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.EditorTagComponentBorder};
  padding-top: 2rem;

  h4 {
    color: ${({ theme }) => theme.EditorTagTitle};
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const TagForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 256px;
  border: 1px solid ${({ theme }) => theme.EditorTagBoxBorder};
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }

  input {
    padding: 0.5rem;
    flex: 1;
    min-width: 0;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.EditorText};
  }
  button {
    cursor: pointer;
    padding: 0 1rem;
    background: ${({ theme }) => theme.EditorTagButtonBody};
    color: ${({ theme }) => theme.EditorTagButtonText};
    &:hover {
      background: ${({ theme }) => theme.EditorHoverTagButtonBody};
    }
  }
`;

const Tag = styled.div`
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.EditorTagText};
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const TagListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const TagItem = React.memo(({ tag, onRemove }) => (
  <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));

const TagList = React.memo(({ tags, onRemove }) => (
  <TagListBlock>
    {tags.map(tag => (
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </TagListBlock>
));

const TagBox = ({ tags = [] }) => {
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);

  const insertTag = useCallback(
    tag => {
      if (!tag) return;
      if (localTags.includes(tag)) return;
      const nextTags = [...localTags, tag];
      setLocalTags(nextTags);
    },
    [localTags],
  );

  const onRemove = useCallback(
    tag => {
      const nextTags = localTags.filter(t => t !== tag);
      setLocalTags(nextTags);
    },
    [localTags],
  );

  const onChange = useCallback(e => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      insertTag(input.trim());
      setInput('');
    },
    [input, insertTag],
  );

  return (
    <TagBoxBlock>
      <h4>태그</h4>
      <TagForm onSubmit={onSubmit}>
        <input placeholder="태그 입력..." onChange={onChange} />
        <button type="submit">추가</button>
      </TagForm>
      <TagList tags={localTags} onRemove={onRemove} />
    </TagBoxBlock>
  );
};

export default TagBox;
