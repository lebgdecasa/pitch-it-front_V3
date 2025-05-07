// src/components/project/dashboard/analysis/KeyTrendReportDisplay.tsx
import ReactMarkdown from 'react-markdown';
import { parseMarkdownSections } from './parseMarkdownSections';

interface Props { markdown: string; }

const card = 'rounded-md border p-4 shadow-sm bg-gray-50';

export default function KeyTrendReportDisplay({ markdown }: Props) {
  const sections = parseMarkdownSections(markdown);

  return (
    <article className="space-y-10">
      {sections.map(sec => (
        <section key={sec.title} className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">{sec.title}</h3>

          {/* prettify well-known blocks */}
          {sec.title.match(/Methodology|Findings|Opportunities/)
            ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ReactMarkdown
                  components={{
                    ul: ({ children }) => <ul className={`${card} list-disc pl-6`}>{children}</ul>,
                    ol: ({ children }) => <ol className={`${card} list-decimal pl-6`}>{children}</ol>,
                    p : ({ children }) => <p className="text-gray-700">{children}</p>,
                  }}
                >
                  {sec.body}
                </ReactMarkdown>
              </div>
            )
            : (
              <div className="prose max-w-none">
                <ReactMarkdown>{sec.body}</ReactMarkdown>
              </div>
            )
          }
        </section>
      ))}
    </article>
  );
}
