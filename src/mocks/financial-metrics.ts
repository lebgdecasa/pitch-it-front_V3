// src/mocks/financial-metrics.ts
export interface FinancialMetric {
  value: number;
  label: string;
  tooltip: string;
  prefix?: string;
  suffix?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
}

export interface FinancialMetrics {
  cac: FinancialMetric;
  cltv: FinancialMetric;
  cacCltvRatio: FinancialMetric;
  tam: FinancialMetric;
  potentialEarnings: FinancialMetric;
  marketGrowthRate: FinancialMetric;
  projectedMarketShare: FinancialMetric;
  averageGrossMargin: FinancialMetric;
  typicalCacPayback: FinancialMetric;
  avgTimeToMvp: FinancialMetric;
  avgTimeToFirstRevenue: FinancialMetric;
  avgSalesCycleLength: FinancialMetric;
  seedToLaunchWindow: FinancialMetric;
}

export const financialMetrics: FinancialMetrics = {
  cac: {
    value: 150,
    label: 'CAC',
    tooltip: 'Average cost to acquire a new customer',
    prefix: '$',
    trend: 'down',
    trendValue: -5.2
  },
  cltv: {
    value: 750,
    label: 'CLTV',
    tooltip: 'Average revenue expected from a customer throughout the business relationship',
    prefix: '$',
    trend: 'up',
    trendValue: 12.8
  },
  cacCltvRatio: {
    value: 5,
    label: 'CAC:CLTV Ratio',
    tooltip: 'Ratio between customer lifetime value and acquisition cost. Higher is better.',
    suffix: ':1',
    trend: 'up',
    trendValue: 0.8
  },
  tam: {
    value: 5200000000,
    label: 'TAM',
    tooltip: 'Total market demand for your product or service in dollar value',
    prefix: '$',
    suffix: 'B',
    trend: 'up',
    trendValue: 15.3
  },
  potentialEarnings: {
    value: 3120000000,
    label: 'PEs',
    tooltip: 'Estimated potential earnings based on TAM × (CLTV - CAC)',
    prefix: '$',
    suffix: 'B',
    trend: 'up',
    trendValue: 18.7
  },
  marketGrowthRate: {
    value: 23.5,
    label: 'MGR',
    tooltip: 'Annual growth rate of the target market',
    suffix: '%',
    trend: 'up',
    trendValue: 2.1
  },
  projectedMarketShare: {
    value: 8.5,
    label: 'PMS',
    tooltip: 'Estimated market share that can be captured within 5 years',
    suffix: '%',
    trend: 'up',
    trendValue: 1.2
  },
  averageGrossMargin: {
    value: 60, // Assumed value
    label: 'Avg. Gross Margin',
    tooltip: 'Shows pricing power vs. cost structure in the vertical',
    suffix: '%',
    trend: 'up', // Assumed trend
    trendValue: 1.5 // Assumed trend value
  },
  typicalCacPayback: {
    value: 12, // Assumed value
    label: 'CAC Payback',
    tooltip: 'Payback ≤ 18 mo is a SaaS rule-of-thumb for capital-efficient growth',
    suffix: ' months',
    trend: 'down', // Assumed trend (lower is better)
    trendValue: -0.5 // Assumed trend value
  },
  avgTimeToMvp: {
    value: 16, // Assumed value
    label: 'Time to MVP',
    tooltip: 'Signals execution speed: how quickly similar startups ship, monetize, and close deals',
    suffix: ' weeks',
    trend: 'down', // Assumed trend (lower is better)
    trendValue: -1 // Assumed trend value
  },
  avgTimeToFirstRevenue: {
    value: 6, // Assumed value
    label: 'Time to Revenue',
    tooltip: 'Avg. Time to First Revenue (months)',
    suffix: ' months',
    trend: 'down', // Assumed trend (lower is better)
    trendValue: -0.3 // Assumed trend value
  },
  avgSalesCycleLength: {
    value: 90, // Assumed value
    label: 'Sales Cycle',
    tooltip: 'Avg. Sales-Cycle Length (days)',
    suffix: ' days',
    trend: 'down', // Assumed trend (lower is better)
    trendValue: -5 // Assumed trend value
  },
  seedToLaunchWindow: {
    value: 9, // Assumed value
    label: 'Seed to Launch',
    tooltip: 'Seed-to-Launch Window (months)',
    suffix: ' months',
    trend: 'down', // Assumed trend (lower is better)
    trendValue: -0.7 // Assumed trend value
  }
};
