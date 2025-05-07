// src/components/project/dashboard/analysis/FinalReportDisplay.tsx
import ReactMarkdown from 'react-markdown';
import { parseMarkdownSections } from './parseMarkdownSections';

interface Props { markdown: string; }
const card = 'rounded-md border p-4 shadow-sm bg-white';

export default function FinalReportDisplay({ markdown }: Props) {
  const sections = parseMarkdownSections(markdown);

  const rankings = sections.find(s => /Rankings/i.test(s.title));
  const rest     = sections.filter(s => s !== rankings);

  return (
    <article className="space-y-10">
      {rest.map(sec => (
        <section key={sec.title} className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">{sec.title}</h3>
          <ReactMarkdown
            components={{
              ul:  ({ children }) => <ul className={`${card} list-disc pl-6`}>{children}</ul>,
              p:   ({ children }) => <p className="text-gray-700">{children}</p>,
            }}
          >
            {sec.body}
          </ReactMarkdown>
        </section>
      ))}

      {/* Custom table — striped, sticky heading */}
      {rankings && (
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">{rankings.title}</h3>
          <div className="overflow-x-auto rounded-md border">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr className="[&>th]:px-3 [&>th]:py-2 [&>th]:text-left [&>th]:font-medium">
                  <th>Category</th><th>Item</th><th>Score</th><th className="w-full">Justification</th>
                </tr>
              </thead>
              <tbody className="[&>tr:nth-child(even)]:bg-gray-50">
                {/* quick CSV-style split on pipes */}
                {rankings.body
                  .split('\n')
                  .filter(r => r.startsWith('|') && !r.includes('---'))
                  .map((row, idx) => {
                    const cols = row.split('|').slice(1, -1).map(c => c.trim());
                    return (
                      <tr key={idx} className="[&>td]:px-3 [&>td]:py-2 align-top">
                        {cols.map((c, i) => <td key={i}>{c}</td>)}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </article>
  );
}
