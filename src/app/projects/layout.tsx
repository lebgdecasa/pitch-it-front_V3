'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import EntrepreneurSidebarLayout from '@/components/layouts/EntrepreneurSidebarLayout';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/projects/new') {
    return <>{children}</>;
  }

  return <EntrepreneurSidebarLayout>{children}</EntrepreneurSidebarLayout>;
}
