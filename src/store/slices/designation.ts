import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Designation {
    id: string;
    name: string;
    description: string;
    active: boolean;
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
            active: true,
            createdAt: '2025-01-15T10:00:00Z',
            updatedAt: '2025-01-15T10:00:00Z',
        },
        {
            id: '2',
            name: 'Senior Software Engineer',
            description: 'Senior-level software development role with mentoring responsibilities',
            active: true,
            createdAt: '2025-01-14T14:30:00Z',
            updatedAt: '2025-01-14T14:30:00Z',
        },
        {
            id: '3',
            name: 'Project Manager',
            description: 'Manages project timelines, resources, and deliverables',
            active: true,
            createdAt: '2025-01-13T09:15:00Z',
            updatedAt: '2025-01-13T09:15:00Z',
        },
        {
            id: '4',
            name: 'UI/UX Designer',
            description: 'Designs user interfaces and user experiences',
            active: false,
            createdAt: '2025-01-12T11:20:00Z',
            updatedAt: '2025-01-12T11:20:00Z',
        },
        {
            id: '5',
            name: 'QA Engineer',
            description: 'Tests software applications for bugs and quality assurance',
            active: true,
            createdAt: '2025-01-11T16:45:00Z',
            updatedAt: '2025-01-11T16:45:00Z',
        },
    ],
    loading: false,
    error: null,
};

const designationSlice = createSlice({
    name: 'designation',
    initialState,
    reducers: {
        addDesignation: (state, action: PayloadAction<Omit<Designation, 'id' | 'createdAt' | 'updatedAt'>>) => {
            const newDesignation: Designation = {
                ...action.payload,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            state.designations.push(newDesignation);
        },
        updateDesignation: (state, action: PayloadAction<Designation>) => {
            const index = state.designations.findIndex(d => d.id === action.payload.id);
            if (index !== -1) {
                state.designations[index] = {
                    ...action.payload,
                    updatedAt: new Date().toISOString(),
                };
            }
        },
        removeDesignation: (state, action: PayloadAction<string>) => {
            state.designations = state.designations.filter(d => d.id !== action.payload);
        },
        toggleDesignationStatus: (state, action: PayloadAction<string>) => {
            const designation = state.designations.find(d => d.id === action.payload);
            if (designation) {
                designation.active = !designation.active;
                designation.updatedAt = new Date().toISOString();
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const {
    addDesignation,
    updateDesignation,
    removeDesignation,
    toggleDesignationStatus,
    setLoading,
    setError,
} = designationSlice.actions;

export default designationSlice.reducer;
