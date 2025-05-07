// src/components/project/dashboard/analysis/BlockRenderer.tsx
import { Block } from '@/types/report';

export default function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'paragraph':
      return <p className="text-gray-700">{block.text}</p>;

    case 'list':
      return (
        <ul className="list-disc pl-6 space-y-1">
          {block.items.map(item => (
            <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );

    case 'table':
      return (
        <div className="overflow-x-auto rounded-md border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                {block.headers.map(h => (
                  <th
                    key={h}
                    className="px-3 py-2 text-left font-medium whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="[&>tr:nth-child(even)]:bg-gray-50">
              {block.rows.map((row, rIdx) => (
                <tr key={rIdx} className="[&>td]:px-3 [&>td]:py-2 align-top">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}
