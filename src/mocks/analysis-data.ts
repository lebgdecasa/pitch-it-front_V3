// src/mocks/analysis-data.ts
export interface Analysis {
  id: string;
  title: string;
  type: 'key-trend' | 'netnographic' | 'final-report';
  summary: string;
  details: string[];
  date: string;
}

export interface ProjectAnalysis {
  [projectId: string]: Analysis[];
}

const analysisByProjectId: ProjectAnalysis = {
  "project-1": [
    {
      id: "kt-001",
      title: "Key Trend Analysis",
      type: "key-trend",
      summary: "Market trends and competitive landscape analysis",
      details: [
        "Growing market size of $5.2B by 2025",
        "Increasing demand in remote work solutions",
        "Emerging technological adoption trends",
        "Key competitor analysis and market positioning"
      ],
      date: "2024-01-15"
    },
    {
      id: "na-001",
      title: "Netnographic Analysis",
      type: "netnographic",
      summary: "Customer behavior and online community insights",
      details: [
        "Social media sentiment analysis",
        "Online community engagement patterns",
        "User feedback and pain points",
        "Brand perception and positioning"
      ],
      date: "2024-01-20"
    },
    {
      id: "fr-001",
      title: "Final Report",
      type: "final-report",
      summary: "Comprehensive project analysis and recommendations",
      details: [
        "Executive summary",
        "Key findings and insights",
        "Strategic recommendations",
        "Implementation roadmap"
      ],
      date: "2024-01-25"
    }
  ]
};

export default analysisByProjectId;