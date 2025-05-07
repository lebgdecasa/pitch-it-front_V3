// src/app/project/[id]/virtual-vc/setup/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '../../../../../components/ui/button';
import { Card, CardContent } from '@/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../components/ui/tabs';
import { Input } from '../../../../../components/ui/input';
import { Label } from '@/ui/label';
import { Slider } from '@/ui/slider';
import { mockInvestors, commonPitchQuestions } from '../../../../../mocks/virtual-vc-data';
import { CheckCircle, Clock, PlusCircle, MinusCircle } from 'lucide-react';

export default function VirtualVCSetup({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [selectedInvestor, setSelectedInvestor] = useState(mockInvestors[0].id);
  const [sessionDuration, setSessionDuration] = useState(10); // minutes
  const [difficulty, setDifficulty] = useState(2); // 1-3
  const [focusAreas, setFocusAreas] = useState({
    vision: true,
    product: true,
    market: true,
    business: true,
    team: true,
    investment: false,
  });

  const handleStartSession = () => {
    // In a real app, we would save these settings to state/context or backend
    router.push(`/project/${params.id}/virtual-vc/session`);
  };

  const toggleFocusArea = (area: string) => {
    setFocusAreas(prev => ({
      ...prev,
      [area]: !prev[area as keyof typeof prev],
    }));
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Setup Virtual VC Session</h1>
        <p className="text-gray-500">
          Practice your pitch in a simulated VC environment. Choose your investor,
          customize settings, and start when you&apos;re ready.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="investor" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="investor">Select Investor</TabsTrigger>
                  <TabsTrigger value="settings">Session Settings</TabsTrigger>
                  <TabsTrigger value="focus">Focus Areas</TabsTrigger>
                </TabsList>

                <TabsContent value="investor" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mockInvestors.map((investor) => (
                      <Card
                        key={investor.id}
                        className={`cursor-pointer hover:border-blue-400 transition-colors ${selectedInvestor === investor.id ? 'border-2 border-blue-500' : ''}`}
                        onClick={() => setSelectedInvestor(investor.id)}
                      >
                        <CardContent className="p-4 flex flex-col items-center">
                          <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-100 to-blue-50" />
                            {/* Placeholder for investor avatar */}
                            <div className="absolute inset-0 flex items-center justify-center text-blue-500 text-2xl">
                              {investor.name.charAt(0)}
                            </div>
                          </div>
                          <h3 className="font-medium text-center">{investor.name}</h3>
                          <div className="text-sm text-gray-500 text-center">{investor.title}</div>
                          <div className="text-xs mt-2 text-center px-2 py-1 bg-gray-100 rounded-full">
                            {investor.style}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Selected investor details */}
                  {mockInvestors.find(i => i.id === selectedInvestor) && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-2">Investor Profile</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {mockInvestors.find(i => i.id === selectedInvestor)?.bio}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <div className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                          Prefers: {mockInvestors.find(i => i.id === selectedInvestor)?.preferredStages.join(', ')}
                        </div>
                        <div className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full">
                          Industries: {mockInvestors.find(i => i.id === selectedInvestor)?.preferredIndustries.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="settings">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="sessionDuration" className="text-base font-medium flex items-center justify-between">
                        <span>Session Duration</span>
                        <span className="text-blue-600 text-sm">{sessionDuration} minutes</span>
                      </Label>
                      <div className="flex items-center mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                          onClick={() => setSessionDuration(Math.max(5, sessionDuration - 5))}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <Slider
                          id="sessionDuration"
                          min={5}
                          max={30}
                          step={5}
                          value={[sessionDuration]}
                          onValueChange={(value) => setSessionDuration(value[0])}
                          className="mx-4 flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                          onClick={() => setSessionDuration(Math.min(30, sessionDuration + 5))}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>5 min</span>
                        <span>30 min</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="difficulty" className="text-base font-medium flex items-center justify-between">
                        <span>Difficulty Level</span>
                        <span className="text-blue-600 text-sm">
                          {difficulty === 1 ? 'Easy' : difficulty === 2 ? 'Moderate' : 'Challenging'}
                        </span>
                      </Label>
                      <div className="flex items-center mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                          onClick={() => setDifficulty(Math.max(1, difficulty - 1))}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <Slider
                          id="difficulty"
                          min={1}
                          max={3}
                          step={1}
                          value={[difficulty]}
                          onValueChange={(value) => setDifficulty(value[0])}
                          className="mx-4 flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                          onClick={() => setDifficulty(Math.min(3, difficulty + 1))}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>Easy</span>
                        <span>Moderate</span>
                        <span>Challenging</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="focus">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">
                      Select areas your investor will focus on during the pitch session.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      <Card
                        className={`cursor-pointer hover:bg-gray-50 ${focusAreas.vision ? 'bg-blue-50 border-blue-200' : ''}`}
                        onClick={() => toggleFocusArea('vision')}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Vision & Mission</h3>
                            <p className="text-xs text-gray-500 mt-1">Your core purpose and long-term goals</p>
                          </div>
                          {focusAreas.vision && <CheckCircle className="h-5 w-5 text-blue-500" />}
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer hover:bg-gray-50 ${focusAreas.product ? 'bg-blue-50 border-blue-200' : ''}`}
                        onClick={() => toggleFocusArea('product')}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Product & Technology</h3>
                            <p className="text-xs text-gray-500 mt-1">Your solution and technical advantages</p>
                          </div>
                          {focusAreas.product && <CheckCircle className="h-5 w-5 text-blue-500" />}
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer hover:bg-gray-50 ${focusAreas.market ? 'bg-blue-50 border-blue-200' : ''}`}
                        onClick={() => toggleFocusArea('market')}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Market & Competition</h3>
                            <p className="text-xs text-gray-500 mt-1">Market analysis and competitive landscape</p>
                          </div>
                          {focusAreas.market && <CheckCircle className="h-5 w-5 text-blue-500" />}
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer hover:bg-gray-50 ${focusAreas.business ? 'bg-blue-50 border-blue-200' : ''}`}
                        onClick={() => toggleFocusArea('business')}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Business Model</h3>
                            <p className="text-xs text-gray-500 mt-1">Revenue model and unit economics</p>
                          </div>
                          {focusAreas.business && <CheckCircle className="h-5 w-5 text-blue-500" />}
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer hover:bg-gray-50 ${focusAreas.team ? 'bg-blue-50 border-blue-200' : ''}`}
                        onClick={() => toggleFocusArea('team')}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Team & Execution</h3>
                            <p className="text-xs text-gray-500 mt-1">Team capabilities and execution plan</p>
                          </div>
                          {focusAreas.team && <CheckCircle className="h-5 w-5 text-blue-500" />}
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer hover:bg-gray-50 ${focusAreas.investment ? 'bg-blue-50 border-blue-200' : ''}`}
                        onClick={() => toggleFocusArea('investment')}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Investment & Financials</h3>
                            <p className="text-xs text-gray-500 mt-1">Funding needs and financial projections</p>
                          </div>
                          {focusAreas.investment && <CheckCircle className="h-5 w-5 text-blue-500" />}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Session Summary</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <div className="relative w-8 h-8 rounded-full bg-gradient-to-b from-blue-200 to-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {mockInvestors.find(i => i.id === selectedInvestor)?.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{mockInvestors.find(i => i.id === selectedInvestor)?.name}</div>
                    <div className="text-xs text-gray-500">{mockInvestors.find(i => i.id === selectedInvestor)?.title}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm">{sessionDuration} minutes</span>
                </div>

                <div>
                  <div className="text-sm font-medium mb-1">Difficulty:
                    <span className="font-normal ml-1">
                      {difficulty === 1 ? 'Easy' : difficulty === 2 ? 'Moderate' : 'Challenging'}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(difficulty / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-1">Focus Areas:</div>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(focusAreas).map(([area, selected]) => (
                      selected && (
                        <div key={area} className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          {area.charAt(0).toUpperCase() + area.slice(1)}
                        </div>
                      )
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-1">Sample Questions:</div>
                  <ul className="text-xs space-y-1 ml-4">
                    {commonPitchQuestions
                      .filter(q => focusAreas[q.category as keyof typeof focusAreas])
                      .slice(0, 3)
                      .map(q => (
                        <li key={q.id} className="text-gray-600 list-disc">{q.text}</li>
                      ))
                    }
                  </ul>
                </div>
              </div>

              <Button onClick={handleStartSession} className="w-full mt-6" size="lg">
                Start Pitch Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
