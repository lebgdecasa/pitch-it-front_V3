"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface EquitySettings {
  availableEquity: number;
  minimumInvestment: number;
  valuation: number;
}

export const DealRoomSettings = () => {
  const [visibility, setVisibility] = useState<'Private' | 'Link-only' | 'Marketplace'>('Private');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [equitySettings, setEquitySettings] = useState<EquitySettings>({
    availableEquity: 15,
    minimumInvestment: 25000,
    valuation: 5000000
  });

  const handleVisibilityChange = (option: 'Private' | 'Link-only' | 'Marketplace') => {
    setVisibility(option);
    setIsDropdownOpen(false);
  };

  const handleEquityChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof EquitySettings) => {
    const value = parseFloat(e.target.value) || 0;
    setEquitySettings({ ...equitySettings, [field]: value });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <section>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Deal-Room Settings</h2>
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deal Room Visibility
          </label>
          <div className="relative">
            <button
              type="button"
              className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-between items-center w-full text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{visibility}</span>
              <ChevronDown className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>

            {isDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button
                    className={`block px-4 py-2 text-sm w-full text-left ${visibility === 'Private' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`}
                    onClick={() => handleVisibilityChange('Private')}
                  >
                    Private
                  </button>
                  <button
                    className={`block px-4 py-2 text-sm w-full text-left ${visibility === 'Link-only' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`}
                    onClick={() => handleVisibilityChange('Link-only')}
                  >
                    Link-only
                  </button>
                  <button
                    className={`block px-4 py-2 text-sm w-full text-left ${visibility === 'Marketplace' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`}
                    onClick={() => handleVisibilityChange('Marketplace')}
                  >
                    Marketplace
                  </button>
                </div>
              </div>
            )}
          </div>
          <p className="mt-2 text-xs text-gray-500">
            {visibility === 'Private' && 'Only you can view and share your pitch deck.'}
            {visibility === 'Link-only' && 'Anyone with the link can view your pitch deck.'}
            {visibility === 'Marketplace' && 'Your pitch will appear in our investor marketplace, visible to accredited investors.'}
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Equity Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="available-equity" className="block text-xs font-medium text-gray-700 mb-1">
                Available Equity (%)
              </label>
              <input
                type="number"
                id="available-equity"
                name="availableEquity"
                value={equitySettings.availableEquity}
                onChange={(e) => handleEquityChange(e, 'availableEquity')}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label htmlFor="minimum-investment" className="block text-xs font-medium text-gray-700 mb-1">
                Minimum Investment
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="minimum-investment"
                  name="minimumInvestment"
                  value={equitySettings.minimumInvestment}
                  onChange={(e) => handleEquityChange(e, 'minimumInvestment')}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  min="0"
                  step="1000"
                />
              </div>
            </div>
            <div>
              <label htmlFor="valuation" className="block text-xs font-medium text-gray-700 mb-1">
                Company Valuation
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="valuation"
                  name="valuation"
                  value={equitySettings.valuation}
                  onChange={(e) => handleEquityChange(e, 'valuation')}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  min="0"
                  step="100000"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-md p-4 mt-4">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
              <div>
                <span className="font-medium">Investment for {equitySettings.availableEquity}% equity:</span>{' '}
                {formatCurrency(equitySettings.valuation * (equitySettings.availableEquity / 100))}
              </div>
              <div>
                <span className="font-medium">Price per 1% equity:</span>{' '}
                {formatCurrency(equitySettings.valuation / 100)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
};