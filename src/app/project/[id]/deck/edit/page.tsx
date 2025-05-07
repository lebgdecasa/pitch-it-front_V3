// src/app/project/[id]/deck/edit/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Plus, Image, FileText, Save, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { projectData } from '../../../../../mocks';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { InsightsSidePanel } from '@/components/project/deck/InsightsSidePanel';

export default function EditDeckPage() {
  const { id } = useParams();
  const router = useRouter();
  const project = [projectData].find((p: { id: string | string[]; }) => p.id === id) || projectData;

  // Mock data for existing deck
  const [deckTitle, setDeckTitle] = useState('Pitch Deck for Investors');
  const [slides, setSlides] = useState([
    { id: 1, title: 'Problem Statement', content: 'Our target customers struggle with X problem that impacts their ability to achieve Y.', notes: '', order: 1 },
    { id: 2, title: 'Solution', content: 'Our product addresses this by providing A, B, and C features that help customers overcome their challenges.', notes: '', order: 2 },
    { id: 3, title: 'Market Opportunity', content: 'The market size for this solution is estimated at $X billion with a Y% annual growth rate.', notes: '', order: 3 },
    { id: 4, title: 'Business Model', content: 'We monetize through a subscription model with an average customer value of $X per year.', notes: '', order: 4 },
    { id: 5, title: 'Ask', content: 'We are raising $X to achieve Y milestones over the next Z months.', notes: '', order: 5 }
  ]);
  const [activeSlideId, setActiveSlideId] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState<number | null>(null);
  const [insightsPanelCollapsed, setInsightsPanelCollapsed] = useState(false);
  const [hasEditedDeck, setHasEditedDeck] = useState(false);

  const activeSlide = slides.find(slide => slide.id === activeSlideId) || slides[0];

  const handleSlideContentChange = (content: string) => {
    setHasEditedDeck(true);
    setSlides(slides.map(slide =>
      slide.id === activeSlideId ? { ...slide, content } : slide
    ));
  };

  const handleSlideNotesChange = (notes: string) => {
    setHasEditedDeck(true);
    setSlides(slides.map(slide =>
      slide.id === activeSlideId ? { ...slide, notes } : slide
    ));
  };

  const handleSlideSelect = (id: number) => {
    setActiveSlideId(id);
  };

  const handleAddSlide = () => {
    const newId = Math.max(...slides.map(s => s.id)) + 1;
    const newSlide = {
      id: newId,
      title: `New Slide`,
      content: '',
      notes: '',
      order: slides.length + 1
    };
    setSlides([...slides, newSlide]);
    setActiveSlideId(newId);
    setHasEditedDeck(true);
  };

  const handleDeleteSlide = (id: number) => {
    setSlideToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteSlide = () => {
    if (slides.length <= 1) {
      toast.error("You can't delete the last slide");
      setDeleteDialogOpen(false);
      return;
    }

    const newSlides = slides.filter(slide => slide.id !== slideToDelete)
      .map((slide, index) => ({
        ...slide,
        order: index + 1
      }));

    setSlides(newSlides);

    // If we deleted the active slide, select the first slide
    if (activeSlideId === slideToDelete) {
      setActiveSlideId(newSlides[0]?.id);
    }

    setDeleteDialogOpen(false);
    toast.success('Slide deleted');
    setHasEditedDeck(true);
  };

  const handleSlideTitleChange = (id: number, newTitle: string) => {
    setHasEditedDeck(true);
    setSlides(slides.map(slide =>
      slide.id === id ? { ...slide, title: newTitle } : slide
    ));
  };

  const handleSaveDeck = () => {
    if (!deckTitle.trim()) {
      toast.error('Please enter a deck title');
      return;
    }

    setIsSaving(true);

    // Simulate saving with a delay
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Pitch deck successfully updated!');
      router.push(`/project/${id}/deck`);
    }, 1000);
  };

  const handleBack = () => {
    router.push(`/project/${id}/deck`);
  };

  const toggleInsightsPanel = () => {
    setInsightsPanelCollapsed(!insightsPanelCollapsed);
  };

  // Component for the slide content area with drop target functionality
  const SlideContentArea = () => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: 'INSIGHT',
      drop: (item: { insightContent: string }) => {
        const currentNotes = activeSlide.notes;
        const newNotes = currentNotes
          ? `${currentNotes}\n\n${item.insightContent}`
          : item.insightContent;

        handleSlideNotesChange(newNotes);
        toast.success('Insight added to slide notes');
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }));

    return (
      <div
        ref={(node) => { drop(node); }}
        className={`p-6 min-h-[400px] ${isOver ? 'bg-blue-50 border-2 border-blue-300 border-dashed' : ''}`}
      >
        <div className="flex flex-col h-full space-y-4">
          <div className="flex items-center mb-4 space-x-2">
            <button className="p-2 rounded hover:bg-gray-100" title="Add text">
              <FileText size={18} />
            </button>
            <button className="p-2 rounded hover:bg-gray-100" title="Add image">
              <Image size={18} aria-label="Add image" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slide Content
            </label>
            <textarea
              value={activeSlide?.content || ''}
              onChange={(e) => handleSlideContentChange(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 resize-none min-h-[200px]"
              placeholder="Enter content for this slide..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Presenter Notes (Drag insights here)
            </label>
            <textarea
              value={activeSlide?.notes || ''}
              onChange={(e) => handleSlideNotesChange(e.target.value)}
              className={`w-full p-3 border rounded-md focus:outline-none resize-none min-h-[100px]
                ${isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              placeholder="Add presenter notes here or drag insights..."
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft size={18} className="mr-1" />
              Back to Deck
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
                className={`p-3 border-b border-gray-100 cursor-pointer ${activeSlideId === slide.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex-1 flex items-center"
                    onClick={() => handleSlideSelect(slide.id)}
                  >
                    <span className="text-gray-500 text-sm mr-2">{slide.order}.</span>
                    <p className="font-medium truncate">{slide.title}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteSlide(slide.id)}
                    className="p-1 rounded hover:text-red-600"
                  >
                    <Trash size={14} />
                  </button>
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
                <div className="flex items-center">
                  <input
                    value={deckTitle}
                    onChange={(e) => {
                      setDeckTitle(e.target.value);
                      setHasEditedDeck(true);
                    }}
                    className="text-xl font-bold focus:outline-none border-b border-transparent focus:border-gray-300"
                    placeholder="Enter deck title"
                  />
                </div>
              </div>
              <button
                onClick={handleSaveDeck}
                disabled={isSaving}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center"
              >
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </>
                )}
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
                  onChange={(e) => {
                    handleSlideTitleChange(activeSlide.id, e.target.value);
                  }}
                  className="text-lg font-semibold w-full focus:outline-none border-b border-transparent focus:border-gray-300"
                  placeholder="Slide Title"
                />
              </div>

              {/* Slide Content Area */}
              <SlideContentArea />
            </div>
          </div>
        </div>

        {/* Insights Panel */}
        <InsightsSidePanel
          isCollapsed={insightsPanelCollapsed}
          onToggleCollapse={toggleInsightsPanel}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Slide</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Are you sure you want to delete this slide? This action cannot be undone.</p>
            </div>
            <DialogFooter>
              <button
                onClick={() => setDeleteDialogOpen(false)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteSlide}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  );
}
