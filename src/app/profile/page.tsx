"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useAppContext } from '../../providers/app-provider';
import { User, Pencil, Bell, Shield, LogOut, Check } from 'lucide-react';

export default function Profile() {
  const { state } = useAppContext();
  const user = state.user;
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    title: 'Founder & CEO',
    bio: 'Passionate entrepreneur with a background in technology and finance, looking to disrupt the market with innovative solutions.',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/username',
    twitter: 'twitter.com/username',
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to an API
    setIsEditing(false);
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => window.history.back()} // Or use Next.js router for internal navigation
            className="px-4 py-2 bg-white-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            - Back to Dashboard
          </button>
        </div>
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your personal information and preferences
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white shadow rounded-lg p-6 sticky top-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24 mb-3">
                  <Image
                    src={user?.ImageUrl || '/placeholder-avatar.jpg'}
                    alt="Profile Picture"
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full">
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-base font-medium text-gray-900">
                  {user?.name || 'User Name'}
                </h2>
                <p className="text-sm text-gray-500">{formData.title}</p>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'personal' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <User className="mr-3 h-5 w-5" />
                  Personal Info
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <Bell className="mr-3 h-5 w-5" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'security' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <Shield className="mr-3 h-5 w-5" />
                  Security
                </button>
                <button
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 rounded-md mt-6"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div className="bg-white shadow rounded-lg">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        onClick={handleSaveProfile}
                        className="text-sm font-medium text-green-600 hover:text-green-500 flex items-center"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Save Changes
                      </button>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  {isEditing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Professional Title</label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Bio</label>
                          <textarea
                            name="bio"
                            rows={3}
                            value={formData.bio}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Location</label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-4">Social Profiles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                https://
                              </span>
                              <input
                                type="text"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleInputChange}
                                className="flex-1 min-w-0 block w-full border-gray-300 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Twitter</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                https://
                              </span>
                              <input
                                type="text"
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleInputChange}
                                className="flex-1 min-w-0 block w-full border-gray-300 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-xs font-medium text-gray-500">NAME</h3>
                          <p className="mt-1 text-sm text-gray-900">{formData.name}</p>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-500">PROFESSIONAL TITLE</h3>
                          <p className="mt-1 text-sm text-gray-900">{formData.title}</p>
                        </div>
                        <div className="md:col-span-2">
                          <h3 className="text-xs font-medium text-gray-500">BIO</h3>
                          <p className="mt-1 text-sm text-gray-900">{formData.bio}</p>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-500">EMAIL ADDRESS</h3>
                          <p className="mt-1 text-sm text-gray-900">{formData.email}</p>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-500">PHONE NUMBER</h3>
                          <p className="mt-1 text-sm text-gray-900">{formData.phone}</p>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-500">LOCATION</h3>
                          <p className="mt-1 text-sm text-gray-900">{formData.location}</p>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-4">Social Profiles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-xs font-medium text-gray-500">LINKEDIN</h4>
                            <a href={`https://${formData.linkedin}`} className="mt-1 text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                              {formData.linkedin}
                            </a>
                          </div>
                          <div>
                            <h4 className="text-xs font-medium text-gray-500">TWITTER</h4>
                            <a href={`https://${formData.twitter}`} className="mt-1 text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                              {formData.twitter}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white shadow rounded-lg">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Control how and when you receive notifications
                  </p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-start">


                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="meetings"
                              name="meetings"
                              type="checkbox"
                              defaultChecked
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="meetings" className="font-medium text-gray-700">Meeting Requests</label>
                            <p className="text-gray-500">Get notified when an investor wants to schedule a meeting</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-4">Push Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="push_everything"
                              name="push_notifications"
                              type="radio"
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="push_everything" className="font-medium text-gray-700">Everything</label>
                            <p className="text-gray-500">Get all push notifications</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="push_important"
                              name="push_notifications"
                              type="radio"
                              defaultChecked
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="push_important" className="font-medium text-gray-700">Only Important</label>
                            <p className="text-gray-500">Only get notified about important updates</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="push_none"
                              name="push_notifications"
                              type="radio"
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="push_none" className="font-medium text-gray-700">No Push Notifications</label>
                            <p className="text-gray-500">Never receive push notifications</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white shadow rounded-lg">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage your account security and authentication
                  </p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-4">Change Password</h3>
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">Current Password</label>
                          <input
                            type="password"
                            id="current_password"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                        <div>
                          <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">New Password</label>
                          <input
                            type="password"
                            id="new_password"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                        <div>
                          <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                          <input
                            type="password"
                            id="confirm_password"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                        <div>
                          <button
                            type="button"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                          >
                            Update Password
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-4">Two Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-700">Add an extra layer of security to your account</p>
                          <p className="text-xs text-gray-500 mt-1">We'll ask for an authentication code in addition to your password when you sign in.</p>
                        </div>
                        <div className="ml-4">
                          <button
                            type="button"
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Enable 2FA
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-4">Sessions</h3>
                      <p className="text-sm text-gray-500 mb-4">This is a list of devices that have logged into your account. Revoke any sessions that you don't recognize.</p>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Current Session</p>
                            <p className="text-xs text-gray-500 mt-1">San Francisco, CA &bull; May 12, 2025 at 3:14 PM</p>
                          </div>
                          <div className="ml-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active now
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Chrome on Windows</p>
                            <p className="text-xs text-gray-500 mt-1">New York, NY • May 10, 2025 at 9:30 AM</p>
                          </div>
                          <div className="ml-4">
                            <button
                              type="button"
                              className="text-sm text-red-600 hover:text-red-500"
                            >
                              Revoke access
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Safari on Mac</p>
                            <p className="text-xs text-gray-500 mt-1">Miami, FL • May 8, 2025 at 5:42 PM</p>
                          </div>
                          <div className="ml-4">
                            <button
                              type="button"
                              className="text-sm text-red-600 hover:text-red-500"
                            >
                              Revoke access
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
