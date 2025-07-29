import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  id: string;
  name: string;
  description: string;
  key?: string; // Project key like 'PROJ'
  leadId?: string;
  status: 'active' | 'inactive' | 'archived' | 'completed' | 'on-hold';
  progress?: number; // Progress percentage
  dueDate?: string; // ISO date string
  teamMembers?: Array<{ name: string; email?: string; role?: string }>; // Team members
  createdAt: string;
  updatedAt: string;
  members?: string[]; // Array of user IDs (legacy)
  color?: string; // Hex color for project identification
}

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

// Sample projects data
const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Modern e-commerce platform with advanced features for online shopping',
    key: 'ECOM',
    leadId: 'user1',
    status: 'active',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
    members: ['user1', 'user2', 'user3', 'user4'],
    color: '#1976d2',
  },
  {
    id: '2',
    name: 'Mobile Banking App',
    description: 'Secure mobile banking application with real-time transactions and analytics',
    key: 'BANK',
    leadId: 'user2',
    status: 'active',
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-03-22T16:45:00Z',
    members: ['user2', 'user5', 'user6'],
    color: '#2e7d32',
  },
  {
    id: '3',
    name: 'Healthcare Management',
    description: 'Comprehensive healthcare management system for hospitals and clinics',
    key: 'HLTH',
    leadId: 'user3',
    status: 'active',
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-03-18T11:20:00Z',
    members: ['user3', 'user7', 'user8', 'user9'],
    color: '#ed6c02',
  },
];

const initialState: ProjectState = {
  projects: sampleProjects,
  currentProject: null,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    fetchProjectsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProjectsSuccess: (state, action: PayloadAction<Project[]>) => {
      state.loading = false;
      state.projects = action.payload;
      state.error = null;
    },
    fetchProjectsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentProject: (state, action: PayloadAction<Project>) => {
      state.currentProject = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(project => project.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
        if (state.currentProject?.id === action.payload.id) {
          state.currentProject = action.payload;
        }
      }
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
      if (state.currentProject?.id === action.payload) {
        state.currentProject = null;
      }
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
  },
});

export const {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  setCurrentProject,
  addProject,
  updateProject,
  removeProject,
  clearCurrentProject,
} = projectSlice.actions;

export default projectSlice.reducer;
