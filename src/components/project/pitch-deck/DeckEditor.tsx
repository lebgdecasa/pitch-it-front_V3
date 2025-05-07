// src/components/project/pitch-deck/DeckEditor.tsx
"use client";

import React, { useState } from 'react';
import { PitchDeck, Slide } from '../../../mocks/pitch-deck';
import { Card } from '@/ui/card';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

interface DeckEditorProps {
  deck: PitchDeck;
}

export default function DeckEditor({ deck: initialDeck }: DeckEditorProps) {
  const [deck, setDeck] = useState(initialDeck);
  const [activeSlide, setActiveSlide] = useState<Slide>(deck.slides[0]);

  const updateSlide = (updatedSlide: Slide) => {
    setDeck(prev => ({
      ...prev,
      slides: prev.slides.map(slide =>
        slide.id === updatedSlide.id ? updatedSlide : slide
      ),
      editHistory: [
        {
          timestamp: new Date().toISOString(),
          editor: 'Current User',
          changes: `Updated ${updatedSlide.title} slide`
        },
        ...prev.editHistory
      ],
      lastModified: new Date().toISOString(),
      version: prev.version + 1
    }));
    setActiveSlide(updatedSlide);
  };

  const addSlide = (type: Slide['type']) => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      type,
      title: `New ${type} slide`,
      content: {
        heading: '',
        bullets: []
      }
    };
    setDeck(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide],
      editHistory: [
        {
          timestamp: new Date().toISOString(),
          editor: 'Current User',
          changes: `Added new ${type} slide`
        },
        ...prev.editHistory
      ],
      lastModified: new Date().toISOString(),
      version: prev.version + 1
    }));
    setActiveSlide(newSlide);
  };

  const deleteSlide = (slideId: string) => {
    if (deck.slides.length <= 1) return;
    const newSlides = deck.slides.filter(slide => slide.id !== slideId);
    setDeck(prev => ({
      ...prev,
      slides: newSlides,
      editHistory: [
        {
          timestamp: new Date().toISOString(),
          editor: 'Current User',
          changes: `Deleted slide`
        },
        ...prev.editHistory
      ],
      lastModified: new Date().toISOString(),
      version: prev.version + 1
    }));
    setActiveSlide(newSlides[0]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{deck.name}</h1>
          <p className="text-sm text-muted-foreground">
            Last modified: {new Date(deck.lastModified).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select onValueChange={(value) => addSlide(value as Slide['type'])}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Add new slide" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title Slide</SelectItem>
              <SelectItem value="problem">Problem Slide</SelectItem>
              <SelectItem value="solution">Solution Slide</SelectItem>
              <SelectItem value="market">Market Slide</SelectItem>
              <SelectItem value="business">Business Model Slide</SelectItem>
              <SelectItem value="team">Team Slide</SelectItem>
              <SelectItem value="financials">Financials Slide</SelectItem>
              <SelectItem value="contact">Contact Slide</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => deleteSlide(activeSlide.id)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Slide
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-1 space-y-2">
          {deck.slides.map(slide => (
            <Card
              key={slide.id}
              className={`p-3 cursor-pointer ${
                activeSlide.id === slide.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setActiveSlide(slide)}
            >
              <p className="text-sm font-medium truncate">{slide.title}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {slide.type}
              </p>
            </Card>
          ))}
        </div>

        <div className="col-span-4 space-y-4">
          <Input
            value={activeSlide.title}
            onChange={e =>
              updateSlide({ ...activeSlide, title: e.target.value })
            }
            className="text-lg font-bold"
            placeholder="Slide Title"
          />

          <div className="space-y-4">
            {activeSlide.content.heading !== undefined && (
              <Input
                value={activeSlide.content.heading}
                onChange={e =>
                  updateSlide({
                    ...activeSlide,
                    content: {
                      ...activeSlide.content,
                      heading: e.target.value
                    }
                  })
                }
                placeholder="Heading"
              />
            )}

            {activeSlide.content.subheading !== undefined && (
              <Input
                value={activeSlide.content.subheading}
                onChange={e =>
                  updateSlide({
                    ...activeSlide,
                    content: {
                      ...activeSlide.content,
                      subheading: e.target.value
                    }
                  })
                }
                placeholder="Subheading"
              />
            )}

            {activeSlide.content.text !== undefined && (
              <Textarea
                value={activeSlide.content.text}
                onChange={e =>
                  updateSlide({
                    ...activeSlide,
                    content: {
                      ...activeSlide.content,
                      text: e.target.value
                    }
                  })
                }
                placeholder="Content"
                className="min-h-[200px]"
              />
            )}

            {activeSlide.content.bullets !== undefined && (
              <div className="space-y-2">
                {activeSlide.content.bullets.map((bullet, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={bullet}
                      onChange={e => {
                        const newBullets = [...activeSlide.content.bullets!];
                        newBullets[index] = e.target.value;
                        updateSlide({
                          ...activeSlide,
                          content: {
                            ...activeSlide.content,
                            bullets: newBullets
                          }
                        });
                      }}
                      placeholder={`Bullet point ${index + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newBullets = activeSlide.content.bullets!.filter(
                          (_, i) => i !== index
                        );
                        updateSlide({
                          ...activeSlide,
                          content: {
                            ...activeSlide.content,
                            bullets: newBullets
                          }
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newBullets = [
                      ...(activeSlide.content.bullets || []),
                      ''
                    ];
                    updateSlide({
                      ...activeSlide,
                      content: {
                        ...activeSlide.content,
                        bullets: newBullets
                      }
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Bullet Point
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
