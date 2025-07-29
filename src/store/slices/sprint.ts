import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Sprint {
  id: string;
  name: string;
  description: string;
  projectId: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  goal?: string;
  completedPoints?: number;
  totalPoints?: number;
}

interface SprintState {
  sprints: Sprint[];
  currentSprint: Sprint | null;
  loading: boolean;
  error: string | null;
}

// Sample sprints data
const sampleSprints: Sprint[] = [
  {
    id: '1',
    name: 'User Authentication & Security',
    description: 'Implement user authentication, authorization, and security features',
    projectId: '1',
    status: 'active',
    startDate: '2024-03-15T00:00:00Z',
    endDate: '2024-03-29T23:59:59Z',
    createdAt: '2024-03-10T09:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
    goal: 'Complete user authentication system with OAuth and 2FA',
    completedPoints: 18,
    totalPoints: 24,
  },
  {
    id: '2',
    name: 'Payment Gateway Integration',
    description: 'Integrate multiple payment gateways and handle transactions',
    projectId: '1',
    status: 'planning',
    startDate: '2024-04-01T00:00:00Z',
    endDate: '2024-04-14T23:59:59Z',
    createdAt: '2024-03-25T10:15:00Z',
    updatedAt: '2024-03-25T10:15:00Z',
    goal: 'Integrate Stripe, PayPal, and local payment methods',
    completedPoints: 0,
    totalPoints: 32,
  },
  {
    id: '3',
    name: 'Core Banking Features',
    description: 'Implement account management, transfers, and transaction history',
    projectId: '2',
    status: 'active',
    startDate: '2024-03-18T00:00:00Z',
    endDate: '2024-04-01T23:59:59Z',
    createdAt: '2024-03-12T11:30:00Z',
    updatedAt: '2024-03-22T16:45:00Z',
    goal: 'Complete core banking functionalities with real-time updates',
    completedPoints: 12,
    totalPoints: 28,
  },
  {
    id: '4',
    name: 'Patient Registration System',
    description: 'Build comprehensive patient registration and management system',
    projectId: '3',
    status: 'completed',
    startDate: '2024-02-15T00:00:00Z',
    endDate: '2024-02-29T23:59:59Z',
    createdAt: '2024-02-10T08:45:00Z',
    updatedAt: '2024-03-01T17:20:00Z',
    goal: 'Complete patient onboarding and profile management',
    completedPoints: 26,
    totalPoints: 26,
  },
  {
    id: '5',
    name: 'Appointment Scheduling',
    description: 'Develop appointment booking and scheduling system for healthcare providers',
    projectId: '3',
    status: 'planning',
    startDate: '2024-04-05T00:00:00Z',
    endDate: '2024-04-19T23:59:59Z',
    createdAt: '2024-03-28T13:00:00Z',
    updatedAt: '2024-03-28T13:00:00Z',
    goal: 'Implement real-time appointment scheduling with conflict resolution',
    completedPoints: 0,
    totalPoints: 22,
  },
];

const initialState: SprintState = {
  sprints: sampleSprints,
  currentSprint: null,
  loading: false,
  error: null,
};

const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    fetchSprintsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSprintsSuccess: (state, action: PayloadAction<Sprint[]>) => {
      state.loading = false;
      state.sprints = action.payload;
      state.error = null;
    },
    fetchSprintsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentSprint: (state, action: PayloadAction<Sprint>) => {
      state.currentSprint = action.payload;
    },
    addSprint: (state, action: PayloadAction<Sprint>) => {
      state.sprints.push(action.payload);
    },
    updateSprint: (state, action: PayloadAction<Sprint>) => {
      const index = state.sprints.findIndex(sprint => sprint.id === action.payload.id);
      if (index !== -1) {
        state.sprints[index] = action.payload;
        if (state.currentSprint?.id === action.payload.id) {
          state.currentSprint = action.payload;
        }
      }
    },
    removeSprint: (state, action: PayloadAction<string>) => {
      state.sprints = state.sprints.filter(sprint => sprint.id !== action.payload);
      if (state.currentSprint?.id === action.payload) {
        state.currentSprint = null;
      }
    },
    clearCurrentSprint: (state) => {
      state.currentSprint = null;
    },
  },
});

export const {
  fetchSprintsStart,
  fetchSprintsSuccess,
  fetchSprintsFailure,
  setCurrentSprint,
  addSprint,
  updateSprint,
  removeSprint,
  clearCurrentSprint,
} = sprintSlice.actions;

export default sprintSlice.reducer;
