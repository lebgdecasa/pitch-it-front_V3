// src/components/project/insights/QuickInsightProvider.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import QuickInsightButton from './QuickInsightButton';
import { AddInsightProps } from './ManualInsights';
import { toast } from 'react-hot-toast';

/**
 * Provider component that adds the QuickInsight floating button to all project pages.
 * This component checks if the current path is within a project and renders the button accordingly.
 */
export default function QuickInsightProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isProjectPage, setIsProjectPage] = useState(false);

  // Check if the current page is within a project path
  useEffect(() => {
    // Project pages have paths like /project/{id}/...
    const projectPathRegex = /^\/project\/[^\/]+/;
    setIsProjectPage(projectPathRegex.test(pathname));
  }, [pathname]);

  // Handle adding a new insight through the floating button
  const handleQuickInsightAdd = (insightData: Omit<AddInsightProps, 'id' | 'timestamp' | 'lastEdited'>) => {
    // @ts-ignore - Access the globally exposed method from ManualInsights
    if (window.addQuickInsight) {
      // @ts-ignore
      window.addQuickInsight(insightData);
      toast.success('Insight added successfully');
    } else {
      console.error('addQuickInsight function not available');
      toast.error('Could not add insight. Please try again later.');
    }
  };

  return (
    <>
      {children}
      {isProjectPage && <QuickInsightButton onInsightAdd={handleQuickInsightAdd} />}
    </>
  );
}
