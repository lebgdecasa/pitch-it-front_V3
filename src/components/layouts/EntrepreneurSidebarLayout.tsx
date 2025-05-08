"use client";

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/client-components/layout/sidebar';

export default function EntrepreneurSidebarLayout({ children }: { children: React.ReactNode }) {
  // Track sidebar collapsed state for adjusting main content margin
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Check localStorage on mount to sync with sidebar component
  useEffect(() => {
    const checkSidebarState = () => {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState !== null) {
        setSidebarCollapsed(savedState === 'true');
      }
    };

    // Initial check
    checkSidebarState();

    // Setup event listener for storage changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'sidebarCollapsed') {
        setSidebarCollapsed(event.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also poll occasionally since storage events don't trigger in the same window
    const interval = setInterval(checkSidebarState, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main
        className={`flex-1 overflow-y-auto bg-gray-50 transition-all duration-300 ease-in-out ml-0 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}
      >
        {children}
      </main>
    </div>
  );
}
