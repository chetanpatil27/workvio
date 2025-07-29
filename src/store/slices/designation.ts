import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Designation {
    id: string;
    name: string;
    description: string;
    department: string;
    level: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Manager' | 'Director';
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

interface DesignationState {
    designations: Designation[];
    loading: boolean;
    error: string | null;
}

const initialState: DesignationState = {
    designations: [
        {
            id: '1',
            name: 'Software Engineer',
            description: 'Develops and maintains software applications',
            department: 'Engineering',
            level: 'Junior',
            isActive: true,
            createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-01-15T10:00:00Z',
        },
        {
            id: '2',
            name: 'Senior Software Engineer',
            description: 'Leads development projects and mentors junior engineers',
            department: 'Engineering',
            level: 'Senior',
            isActive: true,
            createdAt: '2024-01-10T10:00:00Z',
            updatedAt: '2024-01-10T10:00:00Z',
        },
        {
            id: '3',
            name: 'Product Manager',
            description: 'Manages product strategy and roadmap',
            department: 'Product',
            level: 'Manager',
            isActive: true,
            createdAt: '2024-01-08T10:00:00Z',
            updatedAt: '2024-01-08T10:00:00Z',
        },
        {
            id: '4',
            name: 'UX Designer',
            description: 'Designs user experiences and interfaces',
            department: 'Design',
            level: 'Mid',
            isActive: false,
            createdAt: '2024-01-05T10:00:00Z',
            updatedAt: '2024-01-05T10:00:00Z',
        },
    ],
    loading: false,
    error: null,
};

const designationSlice = createSlice({
    name: 'designation',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        addDesignation: (state, action: PayloadAction<Designation>) => {
            state.designations.unshift(action.payload);
        },
        updateDesignation: (state, action: PayloadAction<Designation>) => {
            const index = state.designations.findIndex(d => d.id === action.payload.id);
            if (index !== -1) {
                state.designations[index] = action.payload;
            }
        },
        deleteDesignation: (state, action: PayloadAction<string>) => {
            state.designations = state.designations.filter(d => d.id !== action.payload);
        },
        toggleDesignationStatus: (state, action: PayloadAction<string>) => {
            const designation = state.designations.find(d => d.id === action.payload);
            if (designation) {
                designation.isActive = !designation.isActive;
                designation.updatedAt = new Date().toISOString();
            }
        },
    },
});

export const {
    setLoading,
    setError,
    addDesignation,
    updateDesignation,
    deleteDesignation,
    toggleDesignationStatus,
} = designationSlice.actions;

export default designationSlice.reducer;
