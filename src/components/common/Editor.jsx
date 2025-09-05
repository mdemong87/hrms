'use client'

import { useTheme } from '@/context/ThemeContext';
import JoditEditor from 'jodit-react';
import { useMemo, useRef } from 'react';

const Editor = ({ content, setContent }) => {

    const themeContext = useTheme();


    const editor = useRef(null);

    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typing...',
        toolbar: true,
        theme: themeContext?.theme == "dark" ? 'dark' : 'default', // change theme dynamically
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
        },

        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        processPasteHTML: (html) => {
            // Create a temporary div to clean the HTML
            const div = document.createElement("div");
            div.innerHTML = html;

            // Remove background-color and color styles
            div.querySelectorAll("*").forEach((el) => {
                el.style.backgroundColor = "red";
                el.style.color = "";
                // If you want to remove all inline styles except font-size and font-weight:
                const fontSize = el.style.fontSize;
                const fontWeight = el.style.fontWeight;
                el.removeAttribute("style");
                if (fontSize) el.style.fontSize = fontSize;
                if (fontWeight) el.style.fontWeight = fontWeight;
            });

            return div.innerHTML;
        }

    }), [themeContext?.theme]);







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