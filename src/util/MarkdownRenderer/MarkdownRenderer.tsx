import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import './MarkdownRenderer.css';

interface MarkdownRendererProps {
  content: string;
}

const removeFrontMatter = (markdown: string): string => {
  const frontMatterRegex = /^---[\s\S]*?---\n*/;
  return markdown.replace(frontMatterRegex, '').trimStart();
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const contentWithoutFrontMatter = removeFrontMatter(content);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      className="markdown-content"
      components={{
        span: ({ node, ...props }) => <span className="custom-tag" {...props} />,
        section: ({ node, ...props }) => <section className="body-text" {...props} />,
        div: ({ node, ...props }) => <div className="center-info" {...props} />,
      }}
    >
      {contentWithoutFrontMatter}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;