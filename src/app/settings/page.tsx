"use client";

import React, { useState } from 'react';
import { DealRoomSettings } from '@/components/client-components/settings/deal-room-settings';
import { useAppContext } from '../../providers/app-provider';
import { Settings as SettingsIcon, MessageCircle, Users, Eye, Lock, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function Settings() {
  const { state } = useAppContext();
  const user = state.user;
  const [activeTab, setActiveTab] = useState('platform');
  const router = useRouter(); // Initialize router

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pitch Settings</h1>
            <p className="text-sm text-gray-500 mt-1">
              Configure how you present your projects to investors
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard')} // Updated onClick handler
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded text-sm"
          >
            Back to Dashboard
          </button>
        </header>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Settings tabs">
            <button
              onClick={() => setActiveTab('platform')}
              className={`${activeTab === 'platform' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <SettingsIcon className="w-5 h-5 inline mr-2" />
              Platform Preferences
            </button>
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Conditional Rendering Based on Active Tab */}
          {activeTab === 'platform' && (
            <>
              <section>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Platform Preferences</h2>
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Dark Mode</h3>
                        <p className="text-xs text-gray-500">Use dark theme for the platform interface</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                        <p className="text-xs text-gray-500">Receive updates about your projects</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Weekly Reports</h3>
                        <p className="text-xs text-gray-500">Weekly summary of project activity and metrics</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 mt-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Subscription Plan</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className={`border rounded-lg p-4 ${user?.plan === 'free' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-semibold text-gray-900">Free</h4>
                            {user?.plan === 'free' && <span className="text-xs font-medium text-blue-600 px-2 py-1 bg-blue-100 rounded-full">Current</span>}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Basic pitch creation and limited investor reach</p>
                          <div className="mt-2 text-base font-bold text-gray-900">$0</div>
                        </div>
                        <div className={`border rounded-lg p-4 ${user?.plan === 'pro' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-semibold text-gray-900">Pro</h4>
                            {user?.plan === 'pro' && <span className="text-xs font-medium text-blue-600 px-2 py-1 bg-blue-100 rounded-full">Current</span>}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Advanced AI tools and preferred marketplace placement</p>
                          <div className="mt-2 text-base font-bold text-gray-900">$29/month</div>
                        </div>
                        <div className={`border rounded-lg p-4 ${user?.plan === 'enterprise' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-semibold text-gray-900">Enterprise</h4>
                            {user?.plan === 'enterprise' && <span className="text-xs font-medium text-blue-600 px-2 py-1 bg-blue-100 rounded-full">Current</span>}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Direct VC connections and premium support</p>
                          <div className="mt-2 text-base font-bold text-gray-900">$99/month</div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Manage Subscription</button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Account Information</h2>
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <div className="text-sm font-normal text-gray-800">{user?.name || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="text-sm font-normal text-gray-800">{user?.email || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                      <div className="text-sm font-normal text-gray-800">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Projects</label>
                      <div className="text-sm font-normal text-gray-800">{user?.projectsCount || 0}</div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

        </div>
      </div>
    </main>
  );
}
