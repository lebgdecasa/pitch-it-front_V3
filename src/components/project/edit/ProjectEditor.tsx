// src/components/project/edit/ProjectEditor.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import EditableField from './EditableField';
import { ProjectData, FieldEdit } from '../../../mocks/project-data';
import { Card } from '@/ui/card';

interface ProjectEditorProps {
  project: ProjectData;
  onUpdate: (projectId: string, updates: { fields: any[], editHistory: FieldEdit[] }) => void;
}

export default function ProjectEditor({ project, onUpdate }: ProjectEditorProps) {
  const router = useRouter();
  const [fields, setFields] = useState(project.fields);
  const [editHistory, setEditHistory] = useState<FieldEdit[]>(project.editHistory);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleSave = (fieldId: string, newValue: string) => {
    const field = fields.find(f => f.id === fieldId);
    if (!field) return;

    const edit: FieldEdit = {
      timestamp: new Date().toISOString(),
      fieldName: field.name,
      previousValue: field.value,
      newValue,
      userId: "current-user" // In a real app, this would come from auth context
    };

    const updatedFields = fields.map(f =>
      f.id === fieldId ? { ...f, value: newValue } : f
    );

    setFields(updatedFields);
    setEditHistory([...editHistory, edit]);
    setActiveField(null);

    // Update the project data
    onUpdate(project.id, {
      fields: updatedFields,
      editHistory: [...editHistory, edit]
    });
  };

  const handleCancel = () => {
    setActiveField(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Project
        </Button>
        <h1 className="text-2xl font-bold">Edit Project Details</h1>
        <p className="text-gray-500">
          Update your project information. Some fields are locked to maintain project consistency.
        </p>
      </div>

      <div className="space-y-6">
        {fields.map((field) => (
          <Card key={field.id} className="p-4">
            <EditableField
              field={field}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </Card>
        ))}
      </div>

      {editHistory.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Edit History</h2>
          <div className="space-y-2">
            {editHistory.map((edit, index) => (
              <div
                key={index}
                className="text-sm p-3 bg-gray-50 rounded-md"
              >
                <div className="flex justify-between text-gray-500">
                  <span>{edit.fieldName}</span>
                  <span>{new Date(edit.timestamp).toLocaleString()}</span>
                </div>
                <div className="mt-1">
                  <span className="text-red-500 line-through">{edit.previousValue}</span>
                  <span className="mx-2">→</span>
                  <span className="text-green-500">{edit.newValue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
