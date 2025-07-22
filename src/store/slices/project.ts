import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  id: string;
  name: string;
  description: string;
  key: string; // Project key like 'PROJ'
  leadId: string;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  updatedAt: string;
  members: string[]; // Array of user IDs
  color: string; // Hex color for project identification
}

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
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
