"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import {
  User,
  Pitch,
  Feedback,
  Project,
  ProjectStage,
  PitchDeck
} from '../types';
import { initialMockUser, initialMockProjects } from '../mocks';

// import { UserRole } from '../types/investor';

type AppState = {
  user: User | null;
  currentProject: Project | null;
  projects: Project[];
  isLoading: boolean;
  error: string | null;
};

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'CREATE_PROJECT'; payload: Project }
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_PROJECT_STAGE'; payload: { projectId: string; stage: ProjectStage } }
  | { type: 'ADD_FEEDBACK'; payload: { projectId: string; feedback: Feedback } }
  | { type: 'UPDATE_PITCH'; payload: { projectId: string; pitch: Pitch } }
  | { type: 'UPDATE_PITCH_DECK'; payload: { projectId: string; pitchDeck: PitchDeck } };

const initialState: AppState = {
  user: initialMockUser,
  currentProject: initialMockProjects[0] || null,
  projects: initialMockProjects,
  isLoading: false,
  error: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, currentProject: null };
    case 'SET_PROJECT':
      return { ...state, currentProject: action.payload };
    case 'CREATE_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
        currentProject: action.payload
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.id ? { ...p, ...action.payload, locked: action.payload.locked } : p
        ),
        currentProject: state.currentProject?.id === action.payload.id
          ? { ...state.currentProject, ...action.payload, locked: action.payload.locked }
          : state.currentProject
      };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'UPDATE_PROJECT_STAGE':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.projectId
            ? { ...project, stage: action.payload.stage }
            : project
        ),
        currentProject: state.currentProject?.id === action.payload.projectId
          ? { ...state.currentProject, stage: action.payload.stage }
          : state.currentProject
      };
    case 'ADD_FEEDBACK':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.projectId
            ? {
                ...project,
                feedback: [...(project.feedback || []), action.payload.feedback]
              }
            : project
        ),
        currentProject: state.currentProject?.id === action.payload.projectId
          ? {
              ...state.currentProject,
              feedback: [...(state.currentProject.feedback || []), action.payload.feedback]
            }
          : state.currentProject
      };
    case 'UPDATE_PITCH':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.projectId
            ? { ...project, pitch: action.payload.pitch }
            : project
        ),
        currentProject: state.currentProject?.id === action.payload.projectId
          ? { ...state.currentProject, pitch: action.payload.pitch }
          : state.currentProject
      };
    case 'UPDATE_PITCH_DECK':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.projectId
            ? { ...project, pitchDeck: action.payload.pitchDeck }
            : project
        ),
        currentProject: state.currentProject?.id === action.payload.projectId
          ? { ...state.currentProject, pitchDeck: action.payload.pitchDeck }
          : state.currentProject
      };

    default:
      return state;
  }
};

type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
