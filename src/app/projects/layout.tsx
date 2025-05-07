import React from 'react';
import EntrepreneurSidebarLayout from '@/components/layouts/EntrepreneurSidebarLayout';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EntrepreneurSidebarLayout>{children}</EntrepreneurSidebarLayout>;
}
