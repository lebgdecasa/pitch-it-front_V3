// src/mocks/analysis-content.ts
import { Report } from '@/types/report';

/*  ─────────────────────────────────────────────────────────────
    Helpers
   ───────────────────────────────────────────────────────────── */
const p = (text: string)               => ({ type: 'paragraph', text } as const);
const ul = (items: string[])           => ({ type: 'list',      items } as const);
const tbl = (h: string[], r: string[][]) =>
  ({ type: 'table', headers: h, rows: r } as const);

/*  ─────────────────────────────────────────────────────────────
    Data
   ───────────────────────────────────────────────────────────── */
export const analysisContent: Record<string, Report> = {
  /* ───────────────  KEY-TREND 001  ─────────────── */
  'kt-001': {
    id: 'kt-001',
    date: '2024-01-15',
    type: 'key-trend',
    title: 'Key Trend Analysis',
    sections: [
      {
        heading: 'Market Size & Growth',
        blocks: [
          ul([
            'Current market size: **$5.2 B**',
            'Expected CAGR: **15.3 %** (2024 – 2028)',
            'Market potential by 2028: **$9.1 B**',
          ]),
        ],
      },
      {
        heading: 'Key Trends',
        blocks: [
          p('1. Remote Work Solutions'),
          ul([
            '67 % increase in remote-work technology adoption',
            'Growing demand for collaborative tools',
            'Focus on security and compliance',
          ]),
          p('2. Technology Adoption'),
          ul([
            'AI integration becoming standard',
            'Cloud-native solutions preferred',
            'Mobile-first approach dominant',
          ]),
          p('3. Competitive Landscape'),
          ul([
            'Market consolidation ongoing',
            'New entrants focusing on niche solutions',
            'Integration capabilities driving success',
          ]),
        ],
      },
      {
        heading: 'Opportunities',
        blocks: [ul(['Enterprise-solution gaps', 'Mobile-workforce needs', 'AI-driven automation'])],
      },
      {
        heading: 'Risks',
        blocks: [ul(['Increasing competition', 'Regulatory changes', 'Technology-evolution pace'])],
      },
      {
        heading: 'Recommendations',
        blocks: [
          ul([
            'Focus on enterprise integration',
            'Develop AI capabilities',
            'Strengthen mobile presence',
          ]),
        ],
      },
    ],
  },

  /* ───────────────  KEY-TREND 004  ─────────────── */
  'kt-004': {
    id: 'kt-004',
    type: 'key-trend',
    title: 'EpiDub AI-Powered Dubbing Solution – Key-Trend Analysis',
    date: '2024-01-15',
    sections: [
      {
        heading: 'Executive Summary',
        blocks: [
          p(
            'Comprehensive netnographic analysis of the digital landscape for the upcoming EpiDub launch reveals strong demand for authenticity-preserving AI dubbing, regional localisation, and flexible customisation. Recommendations include leveraging community feedback loops, forging partnerships, and emphasising transparency.',
          ),
        ],
      },
      {
        heading: 'Introduction',
        blocks: [
          p(
            'AI-powered dubbing is moving from novelty to necessity for content localisation. Diverse online commentary shows rising expectations for cultural nuance and emotional authenticity. This report synthesises six months of social-media, blog, and forum data.',
          ),
        ],
      },
      {
        heading: 'Methodology',
        blocks: [
          ul([
            '**Data sources:** Twitter, Facebook groups, LinkedIn, Reddit (r/dubbing, r/voiceacting…), niche blogs',
            '**Time frame:** rolling six-month window',
            '**Thematic analysis:** authenticity, customisation, localisation, trust',
            '**Competitive mapping:** DeepDub AI, ReDub, niche hybrid platforms',
            '**Validation:** qualitative insights cross-checked with engagement & sentiment metrics',
          ]),
        ],
      },
      {
        heading: 'Social-Media Sentiments',
        blocks: [
          ul([
            '**Authenticity expected** – creators worry about tone & emotion loss',
            '**Demand for flexibility** – need granular voice-mod tools',
            '**Tech optimism vs scepticism** – polarised reactions to “mechanistic” voices',
          ]),
        ],
      },
      {
        heading: 'Pain Points',
        blocks: [
          ul([
            'Voice mismatch & cultural incongruences',
            'Over-reliance on automation → quality fears',
            'Licensing / job-displacement worries among voice actors',
          ]),
        ],
      },
      {
        heading: 'Competitive Benchmark',
        blocks: [
          ul([
            '**DeepDub AI** – strong accents, weak customisation',
            '**ReDub** – speed & scale, but quality trade-offs',
            '**Niche hybrids** – good authenticity, poor scalability',
            '**EpiDub differentiator** – balance of high fidelity + granular controls',
          ]),
        ],
      },
      {
        heading: 'Regional Nuances',
        blocks: [
          ul([
            'Creators in South Asia, Latin America, Europe want accent-faithful voices',
            'Wellness & lifestyle sectors require high cultural sensitivity',
            'Older creators more cautious → need supportive onboarding',
          ]),
        ],
      },
      {
        heading: 'Opportunities & Strategic Recommendations',
        blocks: [
          ul([
            'Granular customisation UI + live feedback loop',
            'Hybrid human–AI verification layer',
            'Transparent algorithm dashboards & clear licensing',
            'Localised AI training with linguistic experts',
            'Partnerships with editing / social platforms',
            'R&D in real-time adaptive accent modulation',
          ]),
        ],
      },
      {
        heading: 'Conclusion',
        blocks: [
          p(
            'Success in AI dubbing hinges on quality control, cultural sensitivity, and user-driven customisation. An iterative, beta-driven launch will let EpiDub refine its value prop and capture market share.',
          ),
        ],
      },
    ],
  },

  /* ───────────────  NETNOGRAPHIC 001  ─────────────── */
  'na-001': {
    id: 'na-001',
    date: '2024-01-15',
    type: 'netnographic',
    title: 'Netnographic Analysis',
    sections: [
      {
        heading: 'Social-Media Sentiment',
        blocks: [
          tbl(
            ['Platform', 'Metric'],
            [
              ['Twitter', '73 % positive sentiment'],
              ['LinkedIn', '82 % positive engagement'],
              ['Product Hunt', '4.6 / 5 average rating'],
            ],
          ),
        ],
      },
      {
        heading: 'User-Feedback Themes',
        blocks: [
          p('1. Product Features'),
          ul([
            'Intuitive interface (67 % of reviews)',
            'Integration capabilities (52 % positive)',
            'Mobile experience (mixed)',
          ]),
          p('2. Customer Support'),
          ul(['Fast response time', 'Knowledge-base gaps', 'Strong community support']),
          p('3. Pain Points'),
          ul([
            'Advanced-feature discovery',
            'Enterprise deployment',
            'Custom-integration complexity',
          ]),
        ],
      },
      {
        heading: 'Community Engagement',
        blocks: [
          tbl(
            ['Group', 'Share'],
            [
              ['Enterprise IT', '35 %'],
              ['Startup founders', '28 %'],
              ['Individual devs', '37 %'],
            ],
          ),
          ul(['Feature requests: automation, better reporting, custom workflows']),
        ],
      },
      {
        heading: 'Recommendations',
        blocks: [
          ul(['Improve documentation', 'Enhance onboarding', 'Focus on power users']),
        ],
      },
    ],
  },

  /* ───────────────  NETNOGRAPHIC 004  ─────────────── */
  'na-004': {
    id: 'na-004',
    type: 'netnographic',
    title: 'Netnographic Analysis',
    date: '2024-01-15',
    sections: [
      {
        heading: 'Overview',
        blocks: [p('This report slot is reserved; data will be populated in a future iteration.')],
      },
    ],
  },

  /* ───────────────  FINAL-REPORT 001  ─────────────── */
  'fr-001': {
    id: 'fr-001',
    type: 'final-report',
    date: '2024-01-15',
    title: 'Final Analysis Report',
    sections: [
      {
        heading: 'Executive Summary',
        blocks: [
          p(
            'The company holds a top-10 position, enjoys strong brand recognition, and shows clear opportunities for growth and optimisation.',
          ),
        ],
      },
      {
        heading: 'Key Findings – Market Position',
        blocks: [
          ul([
            'Top 10 in segment',
            'Strong brand recognition',
            'Growing market share',
          ]),
        ],
      },
      {
        heading: 'Key Findings – Technical',
        blocks: [
          p('1. Product Architecture'),
          ul([
            'Scalable infrastructure',
            'Modern tech stack',
            'Strong security foundation',
          ]),
          p('2. Performance Metrics'),
          ul([
            '99.9 % uptime',
            '300 ms average response time',
            '45 % YoY growth',
          ]),
        ],
      },
      {
        heading: 'Key Findings – Customers',
        blocks: [
          ul([
            '82 % retention',
            'NPS 68',
            'CAC payback: 6 months',
          ]),
        ],
      },
      {
        heading: 'Strategic Recommendations',
        blocks: [
          p('Short-term (0 – 6 mths)'),
          ul(['Feature optimisation', 'UX improvements', 'Performance enhancements']),
          p('Medium-term (6 – 12 mths)'),
          ul(['Market expansion', 'Product-line extension', 'Partnerships']),
          p('Long-term (12 + mths)'),
          ul(['International expansion', 'Platform evolution', 'Ecosystem development']),
        ],
      },
      {
        heading: 'Implementation Roadmap',
        blocks: [ul(['Q1 – Foundation', 'Q2 – Features', 'Q3 – Expansion', 'Q4 – Scale'])],
      },
    ],
  },

  /* ───────────────  FINAL-REPORT 004  ─────────────── */
  'fr-004': {
    id: 'fr-004',
    type: 'final-report',
    title: 'Final Analysis Report',
    date: '2024-01-15',
    sections: [
      {
        heading: '1 · Introduction',
        blocks: [
          p(
            'Netnographic research of Reddit data uncovers podcast-creator needs, frustrations, and desires. The analysis combines Jobs-to-Be-Done, Pains, Gains, and a ranked matrix.',
          ),
        ],
      },
      {
        heading: '2 · Jobs to Be Done',
        blocks: [
          ul([
            '**Create engaging podcast content efficiently**',
            '**Build community and authority**',
            '**Achieve creative fulfilment and recognition**',
            '**Overcome technical barriers**',
            '**Be perceived as innovative & professional**',
            '**Feel empowered and efficient**',
          ]),
        ],
      },
      {
        heading: '3 · Pains',
        blocks: [
          ul([
            'High time / effort cost',
            'Lack of authentic emotion',
            'Limited voice customisation',
            'Inflexible script editing',
            'Missing multimedia integration',
            'Technical limitations',
            'Risk of disengagement',
          ]),
        ],
      },
      {
        heading: '4 · Gains',
        blocks: [
          ul([
            'Time & effort savings',
            'High-quality, engaging content',
            'Personalisation & control',
            'Ease of use',
            'Community support',
            'Success & influence',
            'Future possibilities',
          ]),
        ],
      },
      {
        heading: '5 · Rankings',
        blocks: [
          tbl(
            ['Category', 'Item', 'Score', 'Justification'],
            [
              [
                'Jobs to Be Done',
                'Creating Engaging Podcast Content Efficiently',
                'Important',
                'Core functional need; frequent mentions of automation and customisation.',
              ],
              [
                'Pains',
                'High Time / Effort Cost',
                'Extreme',
                'Manual emotion adjustment & script tweaks consume time and drain creativity.',
              ],
              [
                'Gains',
                'Time & Effort Savings',
                'Essential',
                'Efficiency is consistently valued across user segments.',
              ],
              // …additional rows omitted for brevity…
            ],
          ),
        ],
      },
      {
        heading: '6 · Conclusions & Recommendations',
        blocks: [
          ul([
            'Automate emotion & script customisation',
            'Invest in natural, human-like synthesis',
            'Offer diverse voice prints & localisation',
            'Provide seamless script-editing tools',
            'Keep UI intuitive; minimise learning curve',
          ]),
        ],
      },
    ],
  },
};
