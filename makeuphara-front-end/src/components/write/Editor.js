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
  border-bottom: 1px solid ${({ theme }) => theme.editorTitleBorder};
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
    color: ${({ theme }) => theme.editorText};
  }
  .ql-editor.ql-blank::before {
    color: ${({ theme }) => theme.editorText};
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
        // 참고: https://quilljs.com/docs/modules/toolbar/
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

    // 참고: https://quilljs.com/docs/api/#events
    const quill = quillInstance.current;
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField({ key: 'body', value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const onChangeTitle = e => {
    onChangeField({ key: 'title', value: e.target.value });
  };
  return (
    <EditorBlock>
      <TitleInput
        placeholder="포스트 제목"
        value={title}
        onChange={onChangeTitle}
      />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;
