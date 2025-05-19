// src/app/project/[id]/deck/edit/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Plus, Image, FileText, Save, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { initialMockProjects } from '../../../../../mocks'; // Updated import
import { Project, PitchDeckSlide } from '../../../../../types'; // Import necessary types
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { InsightsSidePanel } from '@/components/project/deck/InsightsSidePanel';
import { v4 as uuidv4 } from 'uuid'; // For generating unique string IDs

export default function EditDeckPage() {
  const { id: projectId } = useParams(); // Renamed for clarity
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [deckTitle, setDeckTitle] = useState('');
  const [slides, setSlides] = useState<PitchDeckSlide[]>([]);
  const [activeSlideId, setActiveSlideId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState<string | null>(null);
  const [insightsPanelCollapsed, setInsightsPanelCollapsed] = useState(false);
  const [hasEditedDeck, setHasEditedDeck] = useState(false);

  useEffect(() => {
    const foundProject = initialMockProjects.find(p => p.id === projectId);
    if (foundProject) {
      setProject(foundProject);
      setDeckTitle(foundProject.pitchDeck?.slides?.[0]?.content?.title ? `${foundProject.name} - Deck` : 'New Pitch Deck'); // Or a specific deck title field

      if (foundProject.pitchDeck && foundProject.pitchDeck.slides && foundProject.pitchDeck.slides.length > 0) {
        const initializedSlides = foundProject.pitchDeck.slides.map(slide => ({
          ...slide,
          id: slide.id || uuidv4(), // Ensure ID is a string
          notes: slide.notes || '',
          content: {
            title: slide.content?.title || `Slide ${slide.order}`,
            description: slide.content?.description || '', // Ensure description exists
            ...slide.content,
          }
        })).sort((a, b) => a.order - b.order);
        setSlides(initializedSlides);
        setActiveSlideId(initializedSlides[0]?.id || null);
      } else {
        // Initialize with a default slide if no deck or no slides exist
        const defaultSlideId = uuidv4();
        const defaultSlides: PitchDeckSlide[] = [{
          id: defaultSlideId,
          type: 'custom',
          content: { title: 'Welcome Slide', description: 'Start building your presentation.' },
          notes: '',
          order: 1
        }];
        setSlides(defaultSlides);
        setActiveSlideId(defaultSlideId);
        setDeckTitle(foundProject.name ? `${foundProject.name} - New Deck` : 'New Pitch Deck');
      }
    } else {
      toast.error("Project not found!");
      // router.push('/'); // Or a dedicated error page
    }
  }, [projectId, router]);

  const activeSlide = slides.find(slide => slide.id === activeSlideId);

  const handleSlideContentChange = (description: string) => {
    if (!activeSlideId) return;
    setHasEditedDeck(true);
    setSlides(slides.map(slide =>
      slide.id === activeSlideId ? {
        ...slide,
        content: { ...slide.content, description }
      } : slide
    ));
  };

  const handleSlideNotesChange = (notes: string) => {
    if (!activeSlideId) return;
    setHasEditedDeck(true);
    setSlides(slides.map(slide =>
      slide.id === activeSlideId ? { ...slide, notes } : slide
    ));
  };

  const handleSlideSelect = (id: string) => {
    setActiveSlideId(id);
  };

  const handleAddSlide = () => {
    const newId = uuidv4();
    const newOrder = slides.length > 0 ? Math.max(...slides.map(s => s.order)) + 1 : 1;
    const newSlide: PitchDeckSlide = {
      id: newId,
      type: 'custom', // Default type
      content: { title: `New Slide ${newOrder}`, description: '' },
      notes: '',
      order: newOrder
    };
    setSlides([...slides, newSlide]);
    setActiveSlideId(newId);
    setHasEditedDeck(true);
  };

  const handleDeleteSlide = (id: string) => {
    setSlideToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteSlide = () => {
    if (!slideToDelete) return;
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

    if (activeSlideId === slideToDelete) {
      setActiveSlideId(newSlides[0]?.id || null);
    }

    setDeleteDialogOpen(false);
    toast.success('Slide deleted');
    setHasEditedDeck(true);
  };

  const handleSlideTitleChange = (id: string, newTitle: string) => {
    setHasEditedDeck(true);
    setSlides(slides.map(slide =>
      slide.id === id ? {
        ...slide,
        content: { ...slide.content, title: newTitle }
      } : slide
    ));
  };

  const handleSaveDeck = () => {
    if (!deckTitle.trim()) {
      toast.error('Please enter a deck title');
      return;
    }
    if (!project) {
      toast.error('Project data not loaded.');
      return;
    }

    setIsSaving(true);
    // Here you would typically dispatch to a global state/context or send to a backend
    // For example:
    // dispatch({ type: 'UPDATE_PITCH_DECK', payload: { projectId: project.id, pitchDeck: { slides } } });

    console.log('Saving deck:', { title: deckTitle, slides });

    setTimeout(() => {
      setIsSaving(false);
      toast.success('Pitch deck successfully updated!');
      // Potentially update the global state before navigating
      // For now, just navigate back
      router.push(`/project/${project.id}/deck`);
    }, 1000);
  };

  const handleBack = () => {
    if (project) {
      router.push(`/project/${project.id}/deck`);
    } else {
      router.push('/'); // Fallback if project ID is not available
    }
  };

  const toggleInsightsPanel = () => {
    setInsightsPanelCollapsed(!insightsPanelCollapsed);
  };

  // Component for the slide content area with drop target functionality
  const SlideContentArea = () => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: 'INSIGHT',
      drop: (item: { insightContent: string }) => {
        if (!activeSlide) return;
        const currentNotes = activeSlide.notes || '';
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
        ref={(node) => { drop(node); }} // Ensure compatibility with LegacyRef<HTMLDivElement>
        className={`p-6 min-h-[400px] ${isOver ? 'bg-blue-50 border-2 border-blue-300 border-dashed' : ''}`}
      >
        <div className="flex flex-col h-full space-y-4">
          <div className="flex items-center mb-4 space-x-2">
            {/* These buttons are placeholders for future functionality */}
            <button className="p-2 rounded hover:bg-gray-100" title="Add text">
              <FileText size={18} />
            </button>
            <button className="p-2 rounded hover:bg-gray-100" title="Add image">
              <Image size={18} aria-label="Add image" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slide Content (Description)
            </label>
            <textarea
              value={activeSlide?.content?.description || ''}
              onChange={(e) => handleSlideContentChange(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 resize-none min-h-[200px]"
              placeholder="Enter main content (description) for this slide..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Presenter Notes (Drag Memories here)
            </label>
            <textarea
              value={activeSlide?.notes || ''}
              onChange={(e) => handleSlideNotesChange(e.target.value)}
              className={`w-full p-3 border rounded-md focus:outline-none resize-none min-h-[100px]
                ${isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              placeholder="Add presenter notes here or drag Memories..."
            />
          </div>
        </div>
      </div>
    );
  };

  if (!project && !slides.length) {
      return (
          <div className="flex justify-center items-center h-screen">
              Loading project data or project not found...
          </div>
      );
  }

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
                    className="flex-1 flex items-center mr-2 overflow-hidden" // Added mr-2 and overflow-hidden
                    onClick={() => handleSlideSelect(slide.id)}
                  >
                    <span className="text-gray-500 text-sm mr-2">{slide.order}.</span>
                    <p className="font-medium truncate">{slide.content?.title || 'Untitled Slide'}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteSlide(slide.id)}
                    className="p-1 rounded hover:text-red-600 flex-shrink-0" // Added flex-shrink-0
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
              <button
                onClick={handleSaveDeck}
                disabled={isSaving || !hasEditedDeck} // Disable if not edited
                className={`px-4 py-2 rounded-md transition flex items-center ${
                  isSaving || !hasEditedDeck
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
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
            {activeSlide ? (
              <div className="mx-auto max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
                {/* Slide Header */}
                <div className="border-b border-gray-200 p-4">
                  <input
                    value={activeSlide.content?.title || ''}
                    onChange={(e) => {
                      handleSlideTitleChange(activeSlide.id, e.target.value);
                    }}
                    className="text-lg font-semibold w-full focus:outline-none border-b border-transparent focus:border-gray-300"
                    placeholder="Slide Title"
                  />
                </div>
                <SlideContentArea />
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p>No slide selected or no slides available.</p>
                <p>Click 'Add Slide' to begin.</p>
              </div>
            )}
          </div>
        </div>

        {/* Insights Panel */}
        <InsightsSidePanel
          isCollapsed={insightsPanelCollapsed}
          onToggleCollapse={toggleInsightsPanel}
          // Pass any other necessary props related to insights here
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
