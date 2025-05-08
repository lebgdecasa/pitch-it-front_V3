// src/components/client-components/layout/sidebar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNavItems, backNavItem } from './navigation';
import { useAppContext } from '../../../providers/app-provider';
import { usePulseContext } from '../../../providers/pulse-provider';

interface IconProps {
  className?: string;
}

const ChevronLeft: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export const Sidebar = () => {
  const { state } = useAppContext();
  const { isResultReady, markResultAsViewed } = usePulseContext();
  const pathname = usePathname();
  const projectId = pathname.split('/')[2]; // Get project ID from URL

  // Add state for sidebar collapsed status
  const [collapsed, setCollapsed] = useState(false);

  // Load user preference from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setCollapsed(savedState === 'true');
    }
  }, []);

  // Save collapsed state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', collapsed.toString());
  }, [collapsed]);

  // Replace :id placeholder in navigation hrefs with actual project ID
  const navItems = mainNavItems.map(item => ({
    ...item,
    href: item.href.replace(':id', projectId || '')
  }));

  // Toggle sidebar collapsed state
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={`hidden lg:flex flex-col bg-white border-r border-gray-200 fixed h-screen pt-5 transition-all duration-300 ease-in-out ${collapsed ? 'w-16' : 'w-64'}`}
    >
      <div className={`px-3 mb-6 flex ${collapsed ? 'justify-center' : 'justify-between'} items-center`}>
        {!collapsed && (
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-deep-blue">Pitch-it</span>
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Plan information */}
      {!collapsed && (
        <div className="bg-blue-50 mx-4 p-3 rounded-md mb-6">
          <p className="text-xs font-medium text-blue-800 mb-1">Current Plan</p>
          <div className="flex justify-between items-center">
            <span className="font-medium text-sm">
              {state.user?.plan === 'free' ? 'Free' : state.user?.plan === 'pro' ? 'Pro' : 'Enterprise'}
            </span>
            {state.user?.plan === 'free' && (
              <Link href="/upgrade" className="text-xs font-medium text-deep-blue hover:underline">
                Upgrade
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className={`flex-1 ${collapsed ? 'px-2' : 'px-4'} space-y-1`}>
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const isPulseItem = item.label === 'Pulse';
          const showNotification = isPulseItem && projectId && isResultReady(projectId);

          // Handle click on the Pulse item
          const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (isPulseItem && projectId && isResultReady(projectId)) {
              markResultAsViewed(projectId);
            }
          };

          return (
            <Link
              key={index}
              href={item.href}
              onClick={handleItemClick}
              className={`flex items-center ${collapsed ? 'justify-center' : ''} px-2 py-3 rounded-md text-sm font-medium ${
                isActive
                  ? 'bg-blue-50 text-deep-blue'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              title={item.label}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'} ${isActive ? 'text-deep-blue' : 'text-gray-500'}`} />
                {showNotification && (
                  <span className="absolute -top-1.5 -right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full" />
                )}
              </div>
              {!collapsed && (
                <div className="flex items-center">
                  <span>{item.label}</span>
                  {showNotification && !collapsed && (
                    <span className="ml-2 h-2 w-2 bg-red-500 rounded-full" />
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Back to Projects */}
      <div className={`${collapsed ? 'px-2' : 'px-4'} py-4 border-t border-gray-200`}>
        <Link
          href={backNavItem.href}
          className={`flex items-center ${collapsed ? 'justify-center' : ''} px-2 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50`}
          title={backNavItem.label}
        >
          <backNavItem.icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'} text-gray-500`} />
          {!collapsed && backNavItem.label}
        </Link>
      </div>
    </aside>
  );
};
