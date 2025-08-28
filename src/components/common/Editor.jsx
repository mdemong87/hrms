'use client'

import JoditEditor from 'jodit-react';
import { useMemo, useRef } from 'react';

const Editor = ({ content, setContent }) => {
    const editor = useRef(null);

    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typing...',
        toolbar: true,
        buttons: [
            'bold', 'italic', 'underline', 'strikethrough',
            'ul', 'ol',
            'outdent', 'indent',
            'font', 'fontsize',
            'brush', 'paragraph', 'image', 'link', 'source'
        ],
        format: {
            paragraph: 'Normal',
            h1: 'Heading 1',
            h2: 'Heading 2',
            h3: 'Heading 3'
        }

    }), []);







    return (
        <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={newContent => setContent(newContent)}
            onChange={newContent => setContent(newContent)}
        />
    );
};

export default Editor;