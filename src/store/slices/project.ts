import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  id: string;
  name: string;
  description: string;
  key?: string; // Project key like 'PROJ'
  leadId?: string;
  status: 'active' | 'inactive' | 'archived' | 'completed' | 'on-hold' | 'planning' | 'inprogress' | 'onhold';
  progress?: number; // Progress percentage
  dueDate?: string; // ISO date string
  teamMembers?: Array<{ name: string; email?: string; role?: string }>; // Team members
  totalTasks?: number; // Total number of tasks
  completedTasks?: number; // Number of completed tasks
  activities?: number; // Number of activities
  client?: string; // Client name
  budget?: string; // Budget amount
  startDate?: string; // Start date
  priority?: 'High' | 'Medium' | 'Low'; // Priority level
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

// Sample projects data with Taskora-style data
const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'Figma Design System',
    description: 'UI component library for design system',
    key: 'FDS',
    leadId: 'user1',
    status: 'inprogress',
    progress: 65,
    dueDate: '2023-11-15T23:59:59Z',
    startDate: '2023-10-01T00:00:00Z',
    totalTasks: 24,
    completedTasks: 16,
    activities: 128,
    client: 'Acme Inc.',
    budget: '$12,500',
    priority: 'High',
    teamMembers: [
      { name: 'Sarah Johnson', email: 'sarah@company.com', role: 'UI Designer' },
      { name: 'Mike Chen', email: 'mike@company.com', role: 'Frontend Developer' },
      { name: 'Lisa Wong', email: 'lisa@company.com', role: 'UX Researcher' }
    ],
    createdAt: '2023-10-01T08:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
    members: ['user1', 'user2', 'user3'],
    color: '#ff9800',
  },
  {
    id: '2',
    name: 'Keep React',
    description: 'React component library development',
    key: 'KR',
    leadId: 'user2',
    status: 'planning',
    progress: 25,
    dueDate: '2023-12-05T23:59:59Z',
    startDate: '2023-10-15T00:00:00Z',
    totalTasks: 18,
    completedTasks: 5,
    activities: 86,
    client: 'TechCorp',
    budget: '$18,000',
    priority: 'Medium',
    teamMembers: [
      { name: 'Sarah Johnson', email: 'sarah@company.com', role: 'React Developer' },
      { name: 'David Kim', email: 'david@company.com', role: 'Component Architect' },
      { name: 'Alex Morgan', email: 'alex@company.com', role: 'QA Engineer' }
    ],
    createdAt: '2023-10-15T09:15:00Z',
    updatedAt: '2024-03-22T16:45:00Z',
    members: ['user2', 'user5', 'user6'],
    color: '#2196f3',
  },
  {
    id: '3',
    name: 'StaticMania',
    description: 'Marketing website redesign project',
    key: 'SM',
    leadId: 'user3',
    status: 'completed',
    progress: 100,
    dueDate: '2023-10-25T23:59:59Z',
    startDate: '2023-09-05T00:00:00Z',
    totalTasks: 32,
    completedTasks: 32,
    activities: 214,
    client: 'StaticMania',
    budget: '$8,800',
    priority: 'Medium',
    teamMembers: [
      { name: 'Emma Davis', email: 'emma@company.com', role: 'Web Designer' },
      { name: 'Tom Wilson', email: 'tom@company.com', role: 'Frontend Developer' },
      { name: 'Jessica Lee', email: 'jessica@company.com', role: 'Content Manager' },
      { name: 'Chris Taylor', email: 'chris@company.com', role: 'SEO Specialist' }
    ],
    createdAt: '2023-09-05T10:30:00Z',
    updatedAt: '2023-10-25T11:20:00Z',
    members: ['user3', 'user7', 'user8', 'user9'],
    color: '#4caf50',
  },
  {
    id: '4',
    name: 'AI Analytics Dashboard',
    description: 'Advanced analytics dashboard powered by artificial intelligence',
    key: 'AI',
    leadId: 'user4',
    status: 'onhold',
    progress: 45,
    dueDate: '2024-02-20T23:59:59Z',
    startDate: '2023-11-10T00:00:00Z',
    totalTasks: 28,
    completedTasks: 13,
    activities: 156,
    client: 'DataCorp',
    budget: '$25,000',
    priority: 'High',
    teamMembers: [
      { name: 'Alex Rodriguez', email: 'alex@company.com', role: 'AI Engineer' },
      { name: 'Sophie Turner', email: 'sophie@company.com', role: 'Data Scientist' },
      { name: 'Mark Anderson', email: 'mark@company.com', role: 'Backend Developer' }
    ],
    createdAt: '2023-11-10T11:00:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
    members: ['user4', 'user10', 'user11'],
    color: '#9c27b0',
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
        Object.assign(state.projects[index], action.payload);
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
