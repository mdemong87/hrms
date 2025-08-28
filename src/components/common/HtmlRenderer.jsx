'use client'; // needed if you're using Next.js 13+ app directory

import { useEffect, useState } from 'react';

export default function HtmlRenderer({ htmlContent }) {

    const [cleanHTML, setCleanHTML] = useState('');

    useEffect(() => {
        import('dompurify').then((module) => {
            const DOMPurify = module.default;
            setCleanHTML(DOMPurify.sanitize(htmlContent));
        });
    }, [htmlContent]);

    return (
        <div
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
            className="prose" // optional Tailwind styling
        />
    );
}
