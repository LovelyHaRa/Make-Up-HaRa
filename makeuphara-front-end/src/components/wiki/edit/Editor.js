import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import ImageResize from 'quill-image-resize-module-react';

Quill.debug('error');
Quill.register('modules/imageResize', ImageResize);

const EditorBlock = styled(Responsive)`
  padding: 1rem 0;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const TitleBlock = styled.div`
  margin-top: 2rem;
  h5 {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  .title {
    font-size: 1.25rem;
  }
`;

const QuillWrapper = styled.div`
  padding: 3rem 0;
  .ql-editor {
    padding: 0;
    min-height: 400px;
    font-size: 1rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.editorText};
  }
  .ql-editor.ql-blank::before {
    color: ${({ theme }) => theme.editorText};
    left: 0;
  }
  .ql-video {
    margin: 0 1%;
    width: 98%;
    height: 450px;
  }
`;

const Editor = ({ onChangeField, title, body }) => {
  let localTitle;
  try {
    localTitle = title || JSON.parse(sessionStorage.getItem('wiki-title'));
  } catch (error) {
    throw error;
  }
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '문서 작성...',
      modules: {
        imageResize: {
          modules: ['Resize', 'DisplaySize'],
        },
        // 참고: https://quilljs.com/docs/modules/toolbar/
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ align: [] }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          ['video'],
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

  /* useRef를 사용하여 에디터 내 편집할 데이터 삽입 */
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
  }, [body]);

  return (
    <EditorBlock>
      <TitleBlock>
        <h5>문서 제목</h5>
        <span className="title">{localTitle.name}</span>
      </TitleBlock>
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;
