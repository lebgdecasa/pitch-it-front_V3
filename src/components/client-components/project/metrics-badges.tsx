// src/components/client-components/project/metrics-badges.tsx
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, HelpCircle } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';

interface MetricsBadgesProps {
  cac?: number;
  cltv?: number;
  ratio?: number;
  isLoading?: boolean;
}

const MetricTooltips = {
  cac: "Customer Acquisition Cost (CAC) represents the total cost of acquiring a new customer, including marketing and sales expenses. A lower CAC is generally better for business efficiency.",
  cltv: "Customer Lifetime Value (CLTV) represents the total revenue expected from a customer throughout the business relationship. Higher CLTV indicates better customer retention and revenue potential.",
  ratio: "The LTV:CAC Ratio compares Customer Lifetime Value to Customer Acquisition Cost. A ratio of 3:1 or higher is considered healthy, indicating good return on customer acquisition investment."
};

export const MetricsBadges = ({ cac = 250, cltv = 2800, ratio = 11.2, isLoading = false }: MetricsBadgesProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 animate-pulse">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-20 w-full sm:w-1/3 bg-gray-200 rounded-md"></div>
        ))}
      </div>
    );
  }

  const isCACGood = cac < 300;
  const isCLTVGood = cltv > 2000;
  const isRatioGood = ratio >= 3;

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium text-gray-500 mb-1">Customer Acquisition Cost</p>
            <Tooltip content={MetricTooltips.cac}>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <div className={`p-2 rounded-full ${isCACGood ? 'bg-green-100' : 'bg-red-100'}`}>
            <DollarSign className={`h-5 w-5 ${isCACGood ? 'text-green-600' : 'text-red-600'}`} />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900">${cac.toLocaleString()}</h3>
        <div className="mt-1 flex items-center">
          {isCACGood ? (
            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={`text-xs font-medium ${isCACGood ? 'text-green-600' : 'text-red-600'}`}>
            {isCACGood ? '12% lower than industry average' : '15% higher than ideal'}
          </span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium text-gray-500 mb-1">Customer Lifetime Value</p>
            <Tooltip content={MetricTooltips.cltv}>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <div className={`p-2 rounded-full ${isCLTVGood ? 'bg-green-100' : 'bg-red-100'}`}>
            <Users className={`h-5 w-5 ${isCLTVGood ? 'text-green-600' : 'text-red-600'}`} />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900">${cltv.toLocaleString()}</h3>
        <div className="mt-1 flex items-center">
          {isCLTVGood ? (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={`text-xs font-medium ${isCLTVGood ? 'text-green-600' : 'text-red-600'}`}>
            {isCLTVGood ? '23% higher than similar startups' : '18% below target'}
          </span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium text-gray-500 mb-1">LTV:CAC Ratio</p>
            <Tooltip content={MetricTooltips.ratio}>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <div className={`p-2 rounded-full ${isRatioGood ? 'bg-green-100' : 'bg-red-100'}`}>
            <TrendingUp className={`h-5 w-5 ${isRatioGood ? 'text-green-600' : 'text-red-600'}`} />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900">{ratio}x</h3>
        <div className="mt-1 flex items-center">
          {isRatioGood ? (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={`text-xs font-medium ${isRatioGood ? 'text-green-600' : 'text-red-600'}`}>
            {isRatioGood ? 'Excellent ratio (VC standard is 3x)' : 'Needs improvement (VC standard is 3x)'}
          </span>
        </div>
      </div>
    </div>
  );
};