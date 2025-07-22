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

const initialState: SprintState = {
  sprints: [],
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
