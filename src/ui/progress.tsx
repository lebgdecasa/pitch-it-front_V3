'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showValue?: boolean;
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'destructive';
}

const progressVariants = {
  default: 'bg-blue-600',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  destructive: 'bg-red-600'
};

const progressSizes = {
  sm: 'h-2',
  default: 'h-3',
  lg: 'h-4'
};

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, showValue = false, size = 'default', variant = 'default', ...props }, ref) => {
    const percentage = Math.round((value / max) * 100);

    return (
      <div
        ref={ref}
        className={cn('relative w-full overflow-hidden rounded-full bg-gray-100', progressSizes[size], className)}
        {...props}
      >
        <div
          className={cn('h-full w-full flex-1 transition-all', progressVariants[variant])}
          style={{ width: `${percentage}%` }}
        />
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
            {percentage}%
          </div>
        )}
      </div>
    );
  }
);
Progress.displayName = 'Progress';

export { Progress };
