'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Plus, Image, FileText, Edit, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { projectData } from '@/mocks';

export default function CreateDeckPage() {
  const { id } = useParams();
  const router = useRouter();
  const project = projectData.find((p: { id: string | string[]; }) => p.id === id) || (projectData as unknown as Array<{ id: string | string[]; }>)[0];

  const [deckTitle, setDeckTitle] = useState('');
  const [slides, setSlides] = useState([
    { id: 1, title: 'Problem Statement', content: '', order: 1 },
    { id: 2, title: 'Solution', content: '', order: 2 },
    { id: 3, title: 'Market Opportunity', content: '', order: 3 }
  ]);
  const [activeSlideId, setActiveSlideId] = useState(1);
  const [editingTitle, setEditingTitle] = useState(false);

  const activeSlide = slides.find(slide => slide.id === activeSlideId) || slides[0];

  const handleSlideContentChange = (content: string) => {
    setSlides(slides.map(slide =>
      slide.id === activeSlideId ? { ...slide, content } : slide
    ));
  };

  const handleSlideSelect = (id: number) => {
    setActiveSlideId(id);
  };

  const handleAddSlide = () => {
    const newSlide = {
      id: slides.length + 1,
      title: `New Slide`,
      content: '',
      order: slides.length + 1
    };
    setSlides([...slides, newSlide]);
    setActiveSlideId(newSlide.id);
  };

  const handleSlideTitleChange = (id: number, newTitle: string) => {
    setSlides(slides.map(slide =>
      slide.id === id ? { ...slide, title: newTitle } : slide
    ));
  };

  const handleSaveDeck = () => {
    if (!deckTitle.trim()) {
      toast.error('Please enter a deck title');
      return;
    }

    // In a real app, this would save to a database
    toast.success('Pitch deck successfully created!');
    router.push(`/project/${id}/deck`);
  };

  const handleBack = () => {
    router.push(`/project/${id}`);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={18} className="mr-1" />
            Back to Project
          </button>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">Slides</h2>
            <button
              onClick={handleAddSlide}
              className="p-1 rounded-full hover:bg-gray-100 text-blue-600"
              title="Add slide"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {slides.map((slide) => (
            <div
              key={slide.id}
              onClick={() => handleSlideSelect(slide.id)}
              className={`p-3 border-b border-gray-100 cursor-pointer ${activeSlideId === slide.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm mr-2">{slide.order}.</span>
                <div className="flex-1">
                  <p className="font-medium truncate">{slide.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {!editingTitle ? (
                <h1
                  onClick={() => setEditingTitle(true)}
                  className="text-xl font-bold cursor-pointer flex items-center"
                >
                  {deckTitle || 'Untitled Deck'} <Edit size={14} className="ml-2 text-gray-400" />
                </h1>
              ) : (
                <div className="flex items-center">
                  <input
                    value={deckTitle}
                    onChange={(e) => setDeckTitle(e.target.value)}
                    autoFocus
                    onBlur={() => setEditingTitle(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditingTitle(false)}
                    className="text-xl font-bold border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter deck title"
                  />
                  <button
                    onClick={() => setEditingTitle(false)}
                    className="ml-2 p-1 text-blue-600"
                  >
                    <Check size={16} />
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={handleSaveDeck}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Save Deck
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
          <div className="mx-auto max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
            {/* Slide Header */}
            <div className="border-b border-gray-200 p-4">
              <input
                value={activeSlide?.title || ''}
                onChange={(e) => handleSlideTitleChange(activeSlide.id, e.target.value)}
                className="text-lg font-semibold w-full focus:outline-none border-b border-transparent focus:border-gray-300"
                placeholder="Slide Title"
              />
            </div>

            {/* Slide Content Area */}
            <div className="p-6 min-h-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4 space-x-2">
                  <button className="p-2 rounded hover:bg-gray-100" title="Add text">
                    <FileText size={18} />
                  </button>
                  <button className="p-2 rounded hover:bg-gray-100" title="Add image">
                    <Image size={18} aria-label="Add image" />
                  </button>
                  {/* More editing tools */}
                </div>
                <textarea
                  value={activeSlide?.content || ''}
                  onChange={(e) => handleSlideContentChange(e.target.value)}
                  className="flex-1 w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Enter content for this slide..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
