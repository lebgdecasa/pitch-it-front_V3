// Mock data for investor analytics heatmap
interface AnalyticsDataPoint {
  day: number; // 0-6 for Sunday-Saturday
  hour: number; // 0-23
  value: number; // Number of views
}

export const analyticsData: AnalyticsDataPoint[] = [
  // Sunday
  { day: 0, hour: 10, value: 3 },
  { day: 0, hour: 11, value: 5 },
  { day: 0, hour: 12, value: 7 },
  { day: 0, hour: 13, value: 9 },
  { day: 0, hour: 14, value: 6 },
  { day: 0, hour: 15, value: 4 },

  // Monday
  { day: 1, hour: 9, value: 12 },
  { day: 1, hour: 10, value: 15 },
  { day: 1, hour: 11, value: 18 },
  { day: 1, hour: 12, value: 20 },
  { day: 1, hour: 13, value: 22 },
  { day: 1, hour: 14, value: 25 },
  { day: 1, hour: 15, value: 28 },
  { day: 1, hour: 16, value: 24 },
  { day: 1, hour: 17, value: 19 },
  { day: 1, hour: 18, value: 14 },
  { day: 1, hour: 19, value: 10 },
  { day: 1, hour: 20, value: 7 },

  // Tuesday
  { day: 2, hour: 9, value: 10 },
  { day: 2, hour: 10, value: 13 },
  { day: 2, hour: 11, value: 16 },
  { day: 2, hour: 12, value: 19 },
  { day: 2, hour: 13, value: 21 },
  { day: 2, hour: 14, value: 23 },
  { day: 2, hour: 15, value: 26 },
  { day: 2, hour: 16, value: 22 },
  { day: 2, hour: 17, value: 18 },
  { day: 2, hour: 18, value: 13 },
  { day: 2, hour: 19, value: 9 },
  { day: 2, hour: 20, value: 6 },

  // Wednesday
  { day: 3, hour: 9, value: 11 },
  { day: 3, hour: 10, value: 14 },
  { day: 3, hour: 11, value: 17 },
  { day: 3, hour: 12, value: 20 },
  { day: 3, hour: 13, value: 24 },
  { day: 3, hour: 14, value: 27 },
  { day: 3, hour: 15, value: 30 },
  { day: 3, hour: 16, value: 25 },
  { day: 3, hour: 17, value: 20 },
  { day: 3, hour: 18, value: 15 },
  { day: 3, hour: 19, value: 11 },
  { day: 3, hour: 20, value: 8 },

  // Thursday
  { day: 4, hour: 9, value: 14 },
  { day: 4, hour: 10, value: 17 },
  { day: 4, hour: 11, value: 21 },
  { day: 4, hour: 12, value: 25 },
  { day: 4, hour: 13, value: 29 },
  { day: 4, hour: 14, value: 32 },
  { day: 4, hour: 15, value: 28 },
  { day: 4, hour: 16, value: 24 },
  { day: 4, hour: 17, value: 19 },
  { day: 4, hour: 18, value: 14 },
  { day: 4, hour: 19, value: 10 },
  { day: 4, hour: 20, value: 7 },

  // Friday
  { day: 5, hour: 9, value: 9 },
  { day: 5, hour: 10, value: 12 },
  { day: 5, hour: 11, value: 15 },
  { day: 5, hour: 12, value: 18 },
  { day: 5, hour: 13, value: 21 },
  { day: 5, hour: 14, value: 18 },
  { day: 5, hour: 15, value: 15 },
  { day: 5, hour: 16, value: 13 },
  { day: 5, hour: 17, value: 10 },
  { day: 5, hour: 18, value: 7 },
  { day: 5, hour: 19, value: 5 },

  // Saturday
  { day: 6, hour: 11, value: 4 },
  { day: 6, hour: 12, value: 6 },
  { day: 6, hour: 13, value: 8 },
  { day: 6, hour: 14, value: 5 },
  { day: 6, hour: 15, value: 3 },
];

// Additional mock analytics data
export const topInvestors = [
  {
    name: 'Alpha Ventures',
    views: 12,
    lastVisit: 'Yesterday'
  },
  {
    name: 'Blue Harbor Capital',
    views: 8,
    lastVisit: '2 days ago'
  },
  {
    name: 'Tech Founders Fund',
    views: 7,
    lastVisit: 'Today'
  },
  {
    name: 'Sequoia Capital',
    views: 5,
    lastVisit: '3 days ago'
  },
  {
    name: 'Andreessen Horowitz',
    views: 3,
    lastVisit: '5 days ago'
  }
];