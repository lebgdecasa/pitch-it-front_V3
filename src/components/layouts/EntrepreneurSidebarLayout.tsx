"use client";

import React from 'react';
import { Sidebar } from '@/components/client-components/layout/sidebar';

export default function EntrepreneurSidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto ml-0 lg:ml-64 bg-gray-50 transition-all duration-300 ease-in-out">
        {children}
      </main>
    </div>
  );
}
