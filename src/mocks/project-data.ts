// src/mocks/project-data.ts
export interface FieldEdit {
  timestamp: string;
  fieldName: string;
  previousValue: string;
  newValue: string;
  userId: string;
}

export interface ProjectField {
  id: string;
  name: string;
  value: string;
  isEditable: boolean;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
}

export interface ProjectData {
  find: any;
  id: string;
  fields: ProjectField[];
  editHistory: FieldEdit[];
}

export const mockProjectData: ProjectData = {
  id: "proj-001",
  fields: [
    {
      id: "name",
      name: "Project Name",
      value: "EcoTech Solutions",
      isEditable: true
    },
    {
      id: "industry",
      name: "Industry",
      value: "CleanTech",
      isEditable: false
    },
    {
      id: "description",
      name: "Main Description",
      value: "Innovative clean technology solutions for sustainable future",
      isEditable: true
    },
    {
      id: "problem",
      name: "Problem Statement",
      value: "Rising carbon emissions and inefficient energy consumption",
      isEditable: true,
      validation: {
        required: true,
        minLength: 20,
        maxLength: 500
      }
    },
    {
      id: "solution",
      name: "Solution",
      value: "AI-powered energy optimization platform",
      isEditable: true,
      validation: {
        required: true,
        minLength: 20,
        maxLength: 500
      }
    },
    {
      id: "targetAudience",
      name: "Target Audience",
      value: "Commercial building operators and facility managers",
      isEditable: true,
      validation: {
        required: true,
        minLength: 10,
        maxLength: 200
      }
    },
    {
      id: "businessModel",
      name: "Business Model",
      value: "SaaS subscription with tiered pricing",
      isEditable: true,
      validation: {
        required: true,
        minLength: 10,
        maxLength: 300
      }
    },
    {
      id: "competition",
      name: "Competition",
      value: "Traditional BMS providers and emerging IoT platforms",
      isEditable: true,
      validation: {
        required: true,
        minLength: 10,
        maxLength: 300
      }
    },
    {
      id: "usp",
      name: "Unique Selling Proposition",
      value: "AI-first approach with proven 40% energy savings",
      isEditable: true,
      validation: {
        required: true,
        minLength: 10,
        maxLength: 200
      }
    },
    {
      id: "marketingStrategy",
      name: "Marketing Strategy",
      value: "Direct B2B sales and industry partnerships",
      isEditable: true,
      validation: {
        required: true,
        minLength: 10,
        maxLength: 300
      }
    }
  ],
  editHistory: [],
  find: undefined
};
