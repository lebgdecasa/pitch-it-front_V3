// src/components/project/edit/ProjectEditor.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, RefreshCw, Save } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import EditableField from './EditableField';
import { ProjectData, FieldEdit } from '../../../mocks/project-data';
import { Card } from '@/ui/card';
import { ProjectStage } from '../../../types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import VersionNameModal from './VersionNameModal'; // Import the modal

interface ProjectEditorProps {
  project: ProjectData;
  onUpdate: (projectId: string, updates: { fields: any[], editHistory: FieldEdit[] }) => void;
  onSaveVersion: (versionName: string, projectData: { fields: any[], editHistory: FieldEdit[] }) => void;
  projectStage?: ProjectStage;
  projectId?: string;
}

export default function ProjectEditor({ project, onUpdate, onSaveVersion, projectStage = ProjectStage.PRE_SEED, projectId = "proj-001" }: ProjectEditorProps) {
  const router = useRouter();
  const [fields, setFields] = useState(project.fields);
  const [editHistory, setEditHistory] = useState<FieldEdit[]>(project.editHistory);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [stage, setStage] = useState<ProjectStage>(projectStage);
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false); // State for modal visibility

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

  // Handle stage change
  const handleStageChange = (newStage: ProjectStage) => {
    setStage(newStage);
    // In a real app, this would make an API call to update the project stage
    console.log('Updating project stage:', projectId, newStage);
  };

  // Handle re-run analysis
  const handleRerunAnalysis = () => {
    setIsAnalysisRunning(true);

    // Simulate analysis running

    // In a real app, this would make an API call to start the analysis
    // Simulate completion after 3 seconds
    setTimeout(() => {
      setIsAnalysisRunning(false);
    }, 3000);
  };

  // Opens the modal
  const handleOpenSaveVersionModal = () => {
    setIsVersionModalOpen(true);
  };

  // Handles the submission from the modal
  const handleVersionNameSubmit = (versionName: string) => {
    onSaveVersion(versionName, { fields, editHistory });
    setIsVersionModalOpen(false);
    // Optionally, provide feedback to the user, e.g., a toast notification
    alert(`Project version "${versionName}" saved!`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Project
          </Button>
          <Button
            onClick={handleOpenSaveVersionModal} // Changed to open modal
            variant="default"
          >
            <Save className="h-4 w-4 mr-1" />
            Save Version
          </Button>
        </div>
        <h1 className="text-2xl font-bold">Edit Project Details</h1>
        <p className="text-gray-500">
          Update your project information. Some fields are locked to maintain project consistency.
        </p>
      </div>

      {/* Project Stage Dropdown and Analysis Button */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Project Stage</h3>
            <Select value={stage} onValueChange={(value) => handleStageChange(value as ProjectStage)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ProjectStage.IDEA}>IDEA</SelectItem>
                <SelectItem value={ProjectStage.PROTOTYPE}>PROTOTYPE</SelectItem>
                <SelectItem value={ProjectStage.MVP}>MVP</SelectItem>
                <SelectItem value={ProjectStage.PRE_SEED}>PRE-SEED</SelectItem>
                <SelectItem value={ProjectStage.SEED}>SEED</SelectItem>
                <SelectItem value={ProjectStage.SERIES_A}>SERIES A</SelectItem>
                <SelectItem value={ProjectStage.SERIES_B}>SERIES B</SelectItem>
                <SelectItem value={ProjectStage.SERIES_C}>SERIES C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Project Analysis</h3>
            <Button
              onClick={handleRerunAnalysis}
              variant="outline"
              disabled={isAnalysisRunning}
              className="w-full"
            >
              {isAnalysisRunning ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Re-run Analysis
                </>
              )}
            </Button>
          </div>
        </div>
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

      {/* Bottom Save changes button */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleOpenSaveVersionModal} // Changed to open modal
          variant="default"
        >
          <Save className="h-4 w-4 mr-1" />
          Save Version
        </Button>
      </div>

      {/* Modal for entering version name */}
      <VersionNameModal
        isOpen={isVersionModalOpen}
        onClose={() => setIsVersionModalOpen(false)}
        onSubmit={handleVersionNameSubmit}
      />
    </div>
  );
}
