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
}

export const financialMetrics: FinancialMetrics = {
  cac: {
    value: 150,
    label: 'Customer Acquisition Cost',
    tooltip: 'Average cost to acquire a new customer',
    prefix: '$',
    trend: 'down',
    trendValue: -5.2
  },
  cltv: {
    value: 750,
    label: 'Customer Lifetime Value',
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
    label: 'Total Addressable Market',
    tooltip: 'Total market demand for your product or service in dollar value',
    prefix: '$',
    suffix: 'B',
    trend: 'up',
    trendValue: 15.3
  },
  potentialEarnings: {
    value: 3120000000,
    label: 'Potential Earnings',
    tooltip: 'Estimated potential earnings based on TAM × (CLTV - CAC)',
    prefix: '$',
    suffix: 'B',
    trend: 'up',
    trendValue: 18.7
  },
  marketGrowthRate: {
    value: 23.5,
    label: 'Market Growth Rate',
    tooltip: 'Annual growth rate of the target market',
    suffix: '%',
    trend: 'up',
    trendValue: 2.1
  },
  projectedMarketShare: {
    value: 8.5,
    label: 'Projected Market Share',
    tooltip: 'Estimated market share that can be captured within 5 years',
    suffix: '%',
    trend: 'up',
    trendValue: 1.2
  }
};