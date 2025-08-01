import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TicketStatus {
    id: string;
    name: string;
    color: string;
    description?: string;
    order: number;
    active: boolean;
    isDefault?: boolean;
    isDeleted?: boolean;
    createdAt: string;
    updatedAt: string;
}

interface StatusState {
    statuses: TicketStatus[];
    loading: boolean;
    error: string | null;
}

// Default statuses - using static timestamps to prevent SSR hydration issues
const baseTimestamp = '2024-01-01T00:00:00.000Z';

const defaultStatuses: TicketStatus[] = [
    {
        id: 'status-default-1',
        name: 'To Do',
        color: '#64748b',
        description: 'Tasks that are planned but not started',
        order: 1,
        active: true,
        isDefault: true,
        createdAt: baseTimestamp,
        updatedAt: baseTimestamp,
    },
    {
        id: 'status-default-2',
        name: 'In Progress',
        color: '#3b82f6',
        description: 'Tasks currently being worked on',
        order: 2,
        active: true,
        isDefault: true,
        createdAt: baseTimestamp,
        updatedAt: baseTimestamp,
    },
    {
        id: 'status-default-3',
        name: 'QA',
        color: '#f59e0b',
        description: 'Tasks in quality assurance testing',
        order: 3,
        active: true,
        isDefault: true,
        createdAt: baseTimestamp,
        updatedAt: baseTimestamp,
    },
    {
        id: 'status-default-4',
        name: 'Completed',
        color: '#10b981',
        description: 'Tasks that are finished and verified',
        order: 4,
        active: true,
        isDefault: true,
        createdAt: baseTimestamp,
        updatedAt: baseTimestamp,
    },
];

const initialState: StatusState = {
    statuses: defaultStatuses,
    loading: false,
    error: null,
};

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        // Create new status
        addStatus: (state, action: PayloadAction<Omit<TicketStatus, 'id' | 'createdAt' | 'updatedAt'>>) => {
            // Generate a more predictable ID for SSR consistency
            const timestamp = Date.now();
            const newStatus: TicketStatus = {
                ...action.payload,
                id: `status-custom-${timestamp}`,
                createdAt: new Date(timestamp).toISOString(),
                updatedAt: new Date(timestamp).toISOString(),
            };
            state.statuses.push(newStatus);
        },

        // Update existing status
        updateStatus: (state, action: PayloadAction<{ id: string; updates: Partial<TicketStatus> }>) => {
            const { id, updates } = action.payload;
            const statusIndex = state.statuses.findIndex(status => status.id === id);
            if (statusIndex !== -1) {
                state.statuses[statusIndex] = {
                    ...state.statuses[statusIndex],
                    ...updates,
                    updatedAt: new Date().toISOString(),
                };
            }
        },

        // Delete status (soft delete for default statuses)
        deleteStatus: (state, action: PayloadAction<string>) => {
            const statusId = action.payload;
            const statusIndex = state.statuses.findIndex(status => status.id === statusId);
            if (statusIndex !== -1) {
                const status = state.statuses[statusIndex];
                if (status.isDefault) {
                    // Soft delete for default statuses
                    state.statuses[statusIndex].isDeleted = true;
                    state.statuses[statusIndex].updatedAt = new Date().toISOString();
                } else {
                    // Hard delete for custom statuses
                    state.statuses.splice(statusIndex, 1);
                }
            }
        },

        // Reorder statuses
        reorderStatuses: (state, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
            const { oldIndex, newIndex } = action.payload;
            const [movedStatus] = state.statuses.splice(oldIndex, 1);
            state.statuses.splice(newIndex, 0, movedStatus);

            // Update order numbers
            state.statuses.forEach((status, index) => {
                status.order = index + 1;
                status.updatedAt = new Date().toISOString();
            });
        },

        // Set loading state
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        // Set error state
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

        // Reset to default statuses
        resetToDefault: (state) => {
            state.statuses = defaultStatuses;
            state.error = null;
        },
    },
});

export const {
    addStatus,
    updateStatus,
    deleteStatus,
    reorderStatuses,
    setLoading,
    setError,
    resetToDefault,
} = statusSlice.actions;

export default statusSlice.reducer;
