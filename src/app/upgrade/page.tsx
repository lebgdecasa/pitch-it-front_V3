"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { useAppContext } from '../../providers/app-provider';
import { Button } from '../../components/ui/button';

export default function Upgrade() {
  const { state, dispatch } = useAppContext();
  const { user } = state;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
        <p className="mb-6 text-center">You need to be logged in to upgrade your account.</p>
        <Button asChild>
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    );
  }

  const handleUpgrade = (plan: 'pro' | 'enterprise') => {
    // Update the user's plan in the app context
    dispatch({
      type: 'SET_USER',
      payload: {
        ...user,
        plan
      }
    });
    
    // In a real application, this would trigger payment processing
    // For now, we simply update the state and show a success message
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Upgrade Your Pitch-it Experience
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the plan that&apos;s right for you and take your startup pitching to the next level
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Free</h2>
            <div className="mt-2">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-gray-600 ml-1">/month</span>
            </div>
            <p className="text-gray-500 mt-2">Perfect for getting started</p>
          </div>
          
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">1 project</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">Basic pitch deck template</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">Limited AI assistance</span>
            </li>
          </ul>
          
          <div className="text-center">
            <Button disabled={user.plan === 'free'} variant="outline" className="w-full" size="lg">
              {user.plan === 'free' ? 'Current Plan' : 'Downgrade'}
            </Button>
          </div>
        </div>
        
        {/* Pro Plan */}
        <div className="border-2 border-deep-blue rounded-lg p-6 bg-white shadow-lg relative">
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
            <span className="bg-deep-blue text-white text-xs font-bold px-3 py-1 rounded-full">
              POPULAR
            </span>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Pro</h2>
            <div className="mt-2">
              <span className="text-3xl font-bold">$19</span>
              <span className="text-gray-600 ml-1">/month</span>
            </div>
            <p className="text-gray-500 mt-2">For serious founders</p>
          </div>
          
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">10 projects</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">Premium pitch deck templates</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">Full AI-powered pitch generation</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">Export to PDF/PowerPoint</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">Email support</span>
            </li>
          </ul>
          
          <div className="text-center">
            <Button 
              onClick={() => handleUpgrade('pro')}
              disabled={user.plan === 'pro'} 
              size="lg"
              className="w-full"
            >
              {user.plan === 'pro' ? 'Current Plan' : 'Upgrade to Pro'}
              {user.plan !== 'pro' && <ArrowRight className="ml-1 h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Enterprise Plan */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Enterprise</h2>
            <div className="mt-2">
              <span className="text-3xl font-bold">$49</span>
              <span className="text-gray-600 ml-1">/month</span>
            </div>
            <p className="text-gray-500 mt-2">For growing startups</p>
          </div>
          
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">Unlimited projects</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">All Pro features</span>
            </li>
            <li className="flex items-start">
              <Sparkles className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">Advanced investor matching</span>
            </li>
            <li className="flex items-start">
              <Sparkles className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">Custom branding</span>
            </li>
            <li className="flex items-start">
              <Sparkles className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">Dedicated support</span>
            </li>
          </ul>
          
          <div className="text-center">
            <Button 
              onClick={() => handleUpgrade('enterprise')}
              disabled={user.plan === 'enterprise'} 
              variant="outline"
              size="lg"
              className="w-full"
            >
              {user.plan === 'enterprise' ? 'Current Plan' : 'Upgrade to Enterprise'}
              {user.plan !== 'enterprise' && <ArrowRight className="ml-1 h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold mb-4">Need a custom solution?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We offer tailored packages for startups with specific needs. Get in touch with our team to discuss your requirements.
        </p>
        <Button asChild variant="outline">
          <Link href="/contact">Contact Sales</Link>
        </Button>
      </div>
    </div>
  );
}