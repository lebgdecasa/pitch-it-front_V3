// src/components/project/dashboard/analysis/parseMarkdownSections.ts
export interface Section {
  title: string;
  body: string;
}

/** Split on level-2 or level-3 headings (`##`, `###`) and keep order. */
export function parseMarkdownSections(md: string): Section[] {
  return md
    .split(/\n(?=##[^#])/g)              // break on each heading level-2
    .map(raw => {
      const [first, ...rest] = raw.trim().split('\n');
      const title = first.replace(/^#+\s*/, '');
      return { title, body: rest.join('\n').trim() };
    })
    .filter(s => s.title.length);
}
