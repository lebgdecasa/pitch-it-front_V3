// src/components/project/insights/QuickInsightModal.tsx
"use client";

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Insight } from '@/mocks/insights';

interface QuickInsightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, category: Insight['category']) => void;
}

export default function QuickInsightModal({ 
  isOpen,
  onClose,
  onSubmit
}: QuickInsightModalProps) {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Insight['category']>('general');

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setContent('');
      setCategory('general');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content.trim(), category);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Quick Insight</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Textarea
              placeholder="Enter your insight..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px]"
              autoFocus
            />
          </div>
          <div className="space-y-1">
            <Select
              value={category}
              onValueChange={(value: any) => setCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="market">Market</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!content.trim()}>
            Add Insight
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}