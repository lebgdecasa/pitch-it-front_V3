// Types for the Pitch Assistant feature

export interface PitchDimension {
  id: string;
  name: string;
  keywords: string[];
  description: string;
  example: string;
}

// Update the Pitch interface in src/types/index.ts to include fullDescription
// This needs to be done with the Editor.edit_file_by_replace

export interface PitchAssistantResult {
  coveredDimensions: PitchDimension[];
  nextDimension: PitchDimension | null;
  feedback: string;
}