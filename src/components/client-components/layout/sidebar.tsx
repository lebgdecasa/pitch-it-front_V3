// src/components/client-components/layout/sidebar.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNavItems, backNavItem } from './navigation';
import { useAppContext } from '../../../providers/app-provider';

export const Sidebar = () => {
  const { state } = useAppContext();
  const pathname = usePathname();
  const projectId = pathname.split('/')[2]; // Get project ID from URL

  // Replace :id placeholder in navigation hrefs with actual project ID
  const navItems = mainNavItems.map(item => ({
    ...item,
    href: item.href.replace(':id', projectId || '')
  }));

  return (
    <aside className="hidden lg:flex flex-col bg-white border-r border-gray-200 w-64 fixed h-screen pt-5">
      <div className="px-6 mb-6">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-deep-blue">Pitch-it</span>
        </Link>
      </div>
      
      {/* Plan information */}
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
      
      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center px-2 py-3 rounded-md text-sm font-medium ${
                isActive 
                  ? 'bg-blue-50 text-deep-blue' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-deep-blue' : 'text-gray-500'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      {/* Back to Projects */}
      <div className="px-4 py-4 border-t border-gray-200">
        <Link
          href={backNavItem.href}
          className="flex items-center px-2 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <backNavItem.icon className="h-5 w-5 mr-3 text-gray-500" />
          {backNavItem.label}
        </Link>
      </div>
    </aside>
  );
};