import React from 'react';
import EntrepreneurSidebarLayout from '@/components/layouts/EntrepreneurSidebarLayout';

export default function ProjectDeckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EntrepreneurSidebarLayout>{children}</EntrepreneurSidebarLayout>;
}
