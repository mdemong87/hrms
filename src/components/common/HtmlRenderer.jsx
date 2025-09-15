'use client'


export default function HtmlRenderer({ htmlContent }) {

    return (
        <div className="text-wrap" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
}
