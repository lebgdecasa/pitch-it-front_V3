"use client";

import React from 'react';
import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6">
          <AlertCircle className="h-12 w-12 text-red-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-3">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          We couldn&apos;t find the page you&apos;re looking for. The page might have been moved, deleted, 
          or might never have existed.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Button asChild>
            <Link href="/dashboard" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/projects">
              View Projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}