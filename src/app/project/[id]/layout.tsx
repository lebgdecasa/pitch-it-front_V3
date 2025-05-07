import React from 'react';
import EntrepreneurSidebarLayout from '../../../components/layouts/EntrepreneurSidebarLayout';
import QuickInsightProvider from '@/components/project/insights/QuickInsightProvider';

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EntrepreneurSidebarLayout>
      <QuickInsightProvider>
        {children}
      </QuickInsightProvider>
    </EntrepreneurSidebarLayout>
  );
}