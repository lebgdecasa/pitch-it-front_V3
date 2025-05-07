import React from 'react';
import { DashboardHeader } from '../../components/client-components/layout/dashboard-header';
import { Sidebar } from '../../components/client-components/layout/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-0 lg:ml-64 transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>
    </div>
  );
}