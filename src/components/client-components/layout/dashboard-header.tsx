"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Bell, Search, ChevronDown } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useAppContext } from '../../../providers/app-provider';

export const DashboardHeader = () => {
  const { state } = useAppContext();
  const { user } = state;
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left section */}
          <div className="flex items-center">
            <Link href="/dashboard" >
              <span className="text-xl font-bold text-deep-blue mr-2">Pitch-it</span>
            </Link>
            <button className="p-2 rounded-md text-gray-500 lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Search bar - hidden on small screens */}
          {/* <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-deep-blue focus:border-deep-blue text-sm"
              />
            </div>
          </div> */}

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
              <Bell className="h-5 w-5" />
            </button>

            {user ? (
              <div className="relative">
                <button
                  className="flex items-center text-sm focus:outline-none"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden md:block ml-2">{user.name}</span>
                  <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile Settings
                    </Link>
                    <Link href="/subscription" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Subscription
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign out
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Button asChild size="sm">
                <Link href="/login">Log in</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
