// src/components/client-components/project/metrics-badges.tsx
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, HelpCircle, Target, Briefcase, BarChart, Percent } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipWrapper } from '@/components/ui/tooltip';
import { FinancialMetric } from '@/mocks/financial-metrics';

interface MetricsBadgesProps {
  cac?: FinancialMetric;
  cltv?: FinancialMetric;
  ratio?: FinancialMetric;
  tam?: FinancialMetric;
  potentialEarnings?: FinancialMetric;
  marketGrowthRate?: FinancialMetric;
  projectedMarketShare?: FinancialMetric;
  isLoading?: boolean;
}

const MetricTooltips = {
  cac: "Customer Acquisition Cost (CAC) represents the total cost of acquiring a new customer, including marketing and sales expenses. A lower CAC is generally better for business efficiency.",
  cltv: "Customer Lifetime Value (CLTV) represents the total revenue expected from a customer throughout the business relationship. Higher CLTV indicates better customer retention and revenue potential.",
  ratio: "The LTV:CAC Ratio compares Customer Lifetime Value to Customer Acquisition Cost. A ratio of 3:1 or higher is considered healthy, indicating good return on customer acquisition investment."
};

const formatLargeNumber = (num: number): string => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B';
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  }
  return num.toString();
};

const MetricBadge = ({ metric, icon: Icon, defaultIconColor = 'text-gray-600' }: { metric?: FinancialMetric, icon: React.ElementType, defaultIconColor?: string }) => {
  if (!metric) return null;

  const isGood = metric.trend === 'up';
  const trendIcon = metric.trend === 'up' ? TrendingUp : metric.trend === 'down' ? TrendingDown : null;
  const trendColor = metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-500';
  const iconColor = metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : defaultIconColor;
  const bgColor = metric.trend === 'up' ? 'bg-green-100' : metric.trend === 'down' ? 'bg-red-100' : 'bg-gray-100';

  let displayValue = metric.prefix ? `${metric.prefix}${formatLargeNumber(metric.value)}` : `${formatLargeNumber(metric.value)}${metric.suffix || ''}`;
  if (metric.label === 'CAC:CLTV Ratio') {
    displayValue = `${metric.value}${metric.suffix || ':1'}`;
  }
  if (metric.label === 'MGR' || metric.label === 'PMS') {
    displayValue = `${metric.value}${metric.suffix || '%'}`;
  }
  if (metric.label === 'PEs') {
    displayValue = `${metric.prefix}${formatLargeNumber(metric.value)}`;
  }
  if (metric.label === 'TAM') {
    displayValue = `${metric.prefix}${formatLargeNumber(metric.value)}`;
  }
  if (metric.label === 'CAC') {
    displayValue = `${metric.prefix}${formatLargeNumber(metric.value)}`;
  }
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <p className="text-xs font-medium text-gray-500 mb-1 truncate">{metric.label}</p>
          <Tooltip>
            <TooltipTrigger>
              <span className="flex items-center justify-center">
                <HelpCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {metric.tooltip}
            </TooltipContent>
          </Tooltip>
        </div>
        <div className={`p-2 rounded-full ${bgColor} flex-shrink-0`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 break-words">{displayValue}</h3>
      {metric.trend && metric.trendValue !== undefined && trendIcon && (
        <div className="mt-1 flex items-center">
          {React.createElement(trendIcon, { className: `h-4 w-4 ${trendColor} mr-1` })}
          <span className={`text-xs font-medium ${trendColor}`}>
            {`${Math.abs(metric.trendValue)}${metric.label.includes('Rate') || metric.label.includes('Share') ? '%' : ''} ${metric.trend === 'up' ? 'increase' : 'decrease'}`}
          </span>
        </div>
      )}
    </div>
  );
};

export const MetricsBadges = ({ cac, cltv, ratio, tam, potentialEarnings, marketGrowthRate, projectedMarketShare, isLoading = false }: MetricsBadgesProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <div key={item} className="h-24 w-full bg-gray-200 rounded-md"></div>
        ))}
      </div>
    );
  }

  return (
    <TooltipWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <MetricBadge metric={cac} icon={DollarSign} defaultIconColor="text-red-600" />
        <MetricBadge metric={cltv} icon={Users} defaultIconColor="text-green-600" />
        <MetricBadge metric={ratio} icon={TrendingUp} defaultIconColor="text-green-600" />
        <MetricBadge metric={tam} icon={Target} defaultIconColor="text-blue-600" />
        <MetricBadge metric={potentialEarnings} icon={Briefcase} defaultIconColor="text-purple-600" />
        <MetricBadge metric={marketGrowthRate} icon={BarChart} defaultIconColor="text-yellow-600" />
        <MetricBadge metric={projectedMarketShare} icon={Percent} defaultIconColor="text-indigo-600" />
      </div>
    </TooltipWrapper>
  );
};
