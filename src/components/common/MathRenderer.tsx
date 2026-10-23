import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  text?: string | null;
  className?: string;
  block?: boolean;
}

/**
 * Parses a string containing LaTeX markers ($...$, $$...$$, \(...\), \[...\])
 * and renders both text and KaTeX math safely.
 */
const MathRendererComponent: React.FC<MathRendererProps> = ({
  text = '',
  className = '',
  block = false
}) => {
  const content = text || '';

  const parsedSegments = useMemo(() => {
    if (!content) return [];

    // Instant fast-path for plain text (no LaTeX markers: zero regex overhead!)
    if (!content.includes('$') && !content.includes('\\(') && !content.includes('\\[')) {
      return [{ type: 'text' as const, value: content }];
    }

    // Regex to capture LaTeX markers
    const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$(?!\s)[\s\S]*?(?<!\s)\$|\\\([\s\S]*?\\\))/g;

    const parts: { type: 'text' | 'inline-math' | 'block-math'; value: string }[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          value: content.slice(lastIndex, match.index)
        });
      }

      const raw = match[0];
      if (raw.startsWith('$$') && raw.endsWith('$$')) {
        parts.push({
          type: 'block-math',
          value: raw.slice(2, -2)
        });
      } else if (raw.startsWith('\\[') && raw.endsWith('\\]')) {
        parts.push({
          type: 'block-math',
          value: raw.slice(2, -2)
        });
      } else if (raw.startsWith('\\(') && raw.endsWith('\\)')) {
        parts.push({
          type: 'inline-math',
          value: raw.slice(2, -2)
        });
      } else if (raw.startsWith('$') && raw.endsWith('$')) {
        parts.push({
          type: 'inline-math',
          value: raw.slice(1, -1)
        });
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        value: content.slice(lastIndex)
      });
    }

    return parts;
  }, [content]);

  if (!content) return null;

  // If no math markers found, render plain text with newlines
  if (parsedSegments.length === 1 && parsedSegments[0].type === 'text') {
    const textVal = parsedSegments[0].value;
    if (!textVal.includes('\n')) {
      return <span className={`inline-block ${className}`}>{textVal}</span>;
    }
    return (
      <span className={`inline-block ${className}`}>
        {textVal.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {i > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </span>
    );
  }

  const renderMathHtml = (mathCode: string, displayMode: boolean) => {
    try {
      return katex.renderToString(mathCode.trim(), {
        displayMode,
        throwOnError: false,
        output: 'htmlAndMathml'
      });
    } catch {
      return mathCode;
    }
  };

  return (
    <span className={`${block ? 'block' : 'inline'} ${className}`}>
      {parsedSegments.map((segment, idx) => {
        if (segment.type === 'block-math') {
          return (
            <span
              key={idx}
              className="block my-2 text-center overflow-x-auto py-1"
              dangerouslySetInnerHTML={{
                __html: renderMathHtml(segment.value, true)
              }}
            />
          );
        }

        if (segment.type === 'inline-math') {
          return (
            <span
              key={idx}
              className="inline-block mx-0.5 align-middle"
              dangerouslySetInnerHTML={{
                __html: renderMathHtml(segment.value, false)
              }}
            />
          );
        }

        return (
          <span key={idx}>
            {segment.value.includes('\n') ? (
              segment.value.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </React.Fragment>
              ))
            ) : (
              segment.value
            )}
          </span>
        );
      })}
    </span>
  );
};

export const MathRenderer = React.memo(MathRendererComponent);

