// src/components/project/dashboard/analysis/ReportDisplay.tsx
import BlockRenderer from './BlockRenderer';
import { Report } from '@/types/report';

export default function ReportDisplay({ report }: { report: Report }) {
  return (
    <article className="space-y-10">
      {(report.sections ?? []).map(section => (
        <section key={section.heading} className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {section.heading}
          </h3>
          {section.blocks.map((block, idx) => (
            <BlockRenderer key={idx} block={block} />
          ))}
        </section>
      ))}
    </article>
  );
}
