import React from 'react';

interface FormattedTextProps {
  text: string;
}

export default function FormattedText({ text }: FormattedTextProps) {
  if (!text) return null;

  // Split text by lines
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];
  let inList = false;
  let listType: 'ul' | 'ol' | null = null;

  const parseInlineMarkdown = (line: string): React.ReactNode[] => {
    // Basic bold **text** parsing
    const parts = line.split(/\*\*([\s\S]*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-bold text-amber-400">{part}</strong>;
      }
      return part;
    });
  };

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      if (listType === 'ul') {
        elements.push(
          <ul key={`list-${key}`} className="list-disc pl-5 my-3 space-y-1 text-slate-300 text-sm">
            {listItems}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`list-${key}`} className="list-decimal pl-5 my-3 space-y-1 text-slate-300 text-sm">
            {listItems}
          </ol>
        );
      }
      listItems = [];
      inList = false;
      listType = null;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Headers
    if (trimmed.startsWith('### ')) {
      flushList(index);
      elements.push(
        <h4 key={index} className="text-base font-semibold text-amber-200 mt-5 mb-2 font-sans tracking-tight">
          {parseInlineMarkdown(trimmed.substring(4))}
        </h4>
      );
    } else if (trimmed.startsWith('## ')) {
      flushList(index);
      elements.push(
        <h3 key={index} className="text-lg font-bold text-amber-300 mt-6 mb-3 font-sans tracking-tight border-b border-slate-800 pb-1">
          {parseInlineMarkdown(trimmed.substring(3))}
        </h3>
      );
    } else if (trimmed.startsWith('# ')) {
      flushList(index);
      elements.push(
        <h2 key={index} className="text-xl font-black text-amber-400 mt-7 mb-4 uppercase tracking-wider">
          {parseInlineMarkdown(trimmed.substring(2))}
        </h2>
      );
    }
    // Blockquote
    else if (trimmed.startsWith('> ')) {
      flushList(index);
      elements.push(
        <blockquote key={index} className="border-l-4 border-amber-500 bg-slate-900/50 px-4 py-2 my-4 italic text-slate-300 text-sm rounded-r-lg">
          {parseInlineMarkdown(trimmed.substring(2))}
        </blockquote>
      );
    }
    // Bullet Lists
    else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      if (!inList || listType !== 'ul') {
        flushList(index);
        inList = true;
        listType = 'ul';
      }
      listItems.push(
        <li key={`li-${index}`} className="leading-relaxed">
          {parseInlineMarkdown(trimmed.substring(2))}
        </li>
      );
    }
    // Ordered Lists
    else if (/^\d+\.\s/.test(trimmed)) {
      if (!inList || listType !== 'ol') {
        flushList(index);
        inList = true;
        listType = 'ol';
      }
      const textPart = trimmed.replace(/^\d+\.\s/, '');
      listItems.push(
        <li key={`li-${index}`} className="leading-relaxed">
          {parseInlineMarkdown(textPart)}
        </li>
      );
    }
    // Empty line
    else if (trimmed === '') {
      flushList(index);
    }
    // Plain paragraphs
    else {
      flushList(index);
      elements.push(
        <p key={index} className="text-slate-300 text-sm leading-relaxed mb-3">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    }
  });

  // Flush any remaining lists
  flushList(lines.length);

  return <div className="space-y-2">{elements}</div>;
}
