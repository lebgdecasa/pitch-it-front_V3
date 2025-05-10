"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import {
  Home,
  FolderKanban,
  FileText,
  Award,
  Settings,
  HelpCircle,
  Presentation,
  Menu,
  X,
  BarChart,
  Share2,
  PenLine,
  Layers,
  MessageCircle
} from 'lucide-react';
import { useAppContext } from '../../../providers/app-provider';
import { Button } from "../../ui/button";

export const ProjectSidebar = () => {
  const { state } = useAppContext();
  const pathname = usePathname();
  const params = useParams();
  const projectId = params.id as string;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [projects, setProjects] = useState<Array<any>>([]);

  // Get the current project based on ID
  const currentProject = projects.find(p => p.id === projectId) || {
    name: 'Project',
    id: projectId
  };

  useEffect(() => {
    // In a real app, we'd fetch this from state or API
    setProjects([
      { id: 'project-1', name: 'My SaaS Project' },
      { id: 'project-2', name: 'Mobile App Venture' },
      { id: 'project-3', name: 'AI Platform' },
    ]);
  }, []);

  // Main navigation for the specific project
  const projectNavItems = [
    {
      icon: Layers,
      label: 'Overview',
      href: `/project/${projectId}`
    },
    {
      icon: Presentation,
      label: 'Pitch Deck',
      href: `/project/${projectId}/deck`
    },
    {
      icon: BarChart,
      label: 'Pulse',
      href: `/project/${projectId}/pulse`
    },
    {
      icon: PenLine,
      label: 'Edit Project',
      href: `/project/${projectId}/edit`
    },
    {
      icon: Share2,
      label: 'Publish',
      href: `/project/${projectId}/publish`
    },
    {
      icon: MessageCircle,
      label: 'Chat',
      href: `/project/${projectId}/chat`
    },
    {
      icon: FileText,
      label: 'Documents',
      href: `/project/${projectId}/documents`,
    },
  ];

  // Bottom navigation similar to main sidebar
  const bottomNavItems = [
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: HelpCircle, label: 'Help', href: '/help' },
  ];

  // Global navigation
  const globalNavItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: FolderKanban, label: 'Projects', href: '/projects' },
  ];

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile menu button - fixed on all screens */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-full bg-white shadow-md"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - visible on desktop or when opened on mobile */}
      <aside
        className={`${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed z-50 top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out flex flex-col pt-5`}
      >
        <div className="px-6 mb-6 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-deep-blue">Pitch-it</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Current Project Info */}
        <div className="px-6 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{currentProject.name}</h2>
          <p className="text-xs text-gray-500 mt-1">Project ID: {projectId}</p>
        </div>

        {/* Project Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <div className="py-2">
            <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Project Navigation
            </p>
            {projectNavItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center px-2 py-2 rounded-md text-sm font-medium ${
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
          </div>

          <div className="py-2 mt-6 border-t border-gray-200">
            <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-2">
              Global Navigation
            </p>
            {globalNavItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center px-2 py-2 rounded-md text-sm font-medium ${
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
          </div>
        </nav>

        {/* Bottom links */}
        <div className="px-4 py-4 border-t border-gray-200">
          {bottomNavItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={index}
                href={item.href}
                className="flex items-center px-2 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                <Icon className="h-5 w-5 mr-3 text-gray-500" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
};
