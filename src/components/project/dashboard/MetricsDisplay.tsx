// src/components/project/dashboard/MetricsDisplay.tsx
"use client";

import React from 'react';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { financialMetrics, FinancialMetric } from '../../../mocks/financial-metrics';

const formatValue = (value: number, prefix?: string, suffix?: string): string => {
  let formattedValue = value;
  let finalSuffix = suffix || '';

  if (suffix === 'B') {
    formattedValue = value / 1000000000;
  } else if (suffix === 'M') {
    formattedValue = value / 1000000;
  } else if (suffix === 'K') {
    formattedValue = value / 1000;
  }

  return `${prefix || ''}${formattedValue.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: suffix === '%' ? 1 : 0
  })}${finalSuffix}`;
};

const MetricCard: React.FC<{ metric: FinancialMetric }> = ({ metric }) => {
  return (
    <Card>
      <CardHeader className="pb-2">

          <Tooltip>
            <TooltipTrigger>
              <CardTitle className="text-sm font-medium text-muted-foreground cursor-help">
                {metric.tooltip}
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent>
              {metric.tooltip}
            </TooltipContent>
          </Tooltip>

      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold">
            {formatValue(metric.value, metric.prefix, metric.suffix)}
          </div>
          {metric.trend && (
            <div className={`flex items-center space-x-1
              ${metric.trend === 'up' ? 'text-green-500' :
                metric.trend === 'down' ? 'text-red-500' :
                'text-gray-500'}`}
            >
              {metric.trend === 'up' ? (
                <ArrowUp className="h-4 w-4" />
              ) : metric.trend === 'down' ? (
                <ArrowDown className="h-4 w-4" />
              ) : (
                <Minus className="h-4 w-4" />
              )}
              <span className="text-sm">
                {metric.trendValue?.toFixed(1)}%
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const MetricsDisplay: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard metric={financialMetrics.tam} />
      <MetricCard metric={financialMetrics.potentialEarnings} />
      <MetricCard metric={financialMetrics.marketGrowthRate} />
      <MetricCard metric={financialMetrics.projectedMarketShare} />
      <MetricCard metric={financialMetrics.cac} />
      <MetricCard metric={financialMetrics.cltv} />
      <MetricCard metric={financialMetrics.cacCltvRatio} />
    </div>
  );
};

export default MetricsDisplay;
