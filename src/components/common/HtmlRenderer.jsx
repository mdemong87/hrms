'use client'; // needed if you're using Next.js 13+ app directory

export default function HtmlRenderer({ htmlContent }) {
    return (
        <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="prose" // optional Tailwind styling
        />
    );
}
