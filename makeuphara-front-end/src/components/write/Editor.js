import React, { useRef } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import { useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';

const EditorBlock = styled(Responsive)`
  padding: 5rem 0;
`;

const TitleInput = styled.input`
  font-size: 2rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.EditorTitleBorder};
  background: ${({ theme }) => theme.body};
  margin-bottom: 2rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.EditorText};
  }
  .ql-editor.ql-blank::before {
    color: ${({ theme }) => theme.EditorText};
    left: 0;
  }
`;

const Editor = ({ title, body, onChangeField }) => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '포스트 작성...',
      modules: {
        // https://quilljs.com/docs/modules/toolbar/
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          ['blockquote', 'code-block', 'link', 'image'],
          ['clean'],
        ],
      },
    });
  }, []);
  return (
    <EditorBlock>
      <TitleInput placeholder="포스트 제목" />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;
