"use client";

import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/card';

interface VersionNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (versionName: string) => void;
}

export default function VersionNameModal({ isOpen, onClose, onSubmit }: VersionNameModalProps) {
  const [versionName, setVersionName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (versionName.trim() === "") {
      setError("Version name cannot be empty.");
      return;
    }
    onSubmit(versionName);
    setVersionName(''); // Reset for next time
    setError('');
    onClose(); // Close modal on successful submit
  };

  const handleCancel = () => {
    setVersionName(''); // Reset
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Save Project Version</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-sm text-gray-600">Enter a name for this version of the project details.</p>
          <Input
            type="text"
            placeholder="E.g., Q1 Draft, Final Review"
            value={versionName}
            onChange={(e) => {
              setVersionName(e.target.value);
              if (error) setError(''); // Clear error when user starts typing
            }}
            className={`w-full ${error ? 'border-red-500' : ''}`}
            autoFocus
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSubmit}>
            Save Version
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
