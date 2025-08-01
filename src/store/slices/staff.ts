import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Staff {
    id: string;
    name: string;
    email: string;
    mobile: string;
    gender: 'male' | 'female' | 'other';
    department?: string;
    createdAt: string;
    updatedAt: string;
}

interface StaffState {
    staff: Staff[];
    loading: boolean;
    error: string | null;
}

const initialState: StaffState = {
    staff: [
        {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@workvio.com',
            mobile: '+1 (555) 123-4567',
            gender: 'male',
            department: 'Engineering',
            createdAt: '2025-01-15T10:00:00Z',
            updatedAt: '2025-01-15T10:00:00Z',
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@workvio.com',
            mobile: '+1 (555) 987-6543',
            gender: 'female',
            department: 'Design',
            createdAt: '2025-01-14T14:30:00Z',
            updatedAt: '2025-01-14T14:30:00Z',
        },
        {
            id: '3',
            name: 'Alex Johnson',
            email: 'alex.johnson@workvio.com',
            mobile: '+1 (555) 456-7890',
            gender: 'other',
            department: 'Product Management',
            createdAt: '2025-01-13T09:15:00Z',
            updatedAt: '2025-01-13T09:15:00Z',
        },
    ],
    loading: false,
    error: null,
};

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        addStaff: (state, action: PayloadAction<Omit<Staff, 'id' | 'createdAt' | 'updatedAt'>>) => {
            const newStaff: Staff = {
                ...action.payload,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            state.staff.unshift(newStaff);
        },
        updateStaff: (state, action: PayloadAction<Staff>) => {
            const index = state.staff.findIndex(s => s.id === action.payload.id);
            if (index !== -1) {
                Object.assign(state.staff[index], {
                    ...action.payload,
                    updatedAt: new Date().toISOString(),
                });
            }
        },
        removeStaff: (state, action: PayloadAction<string>) => {
            state.staff = state.staff.filter(s => s.id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { addStaff, updateStaff, removeStaff, setLoading, setError } = staffSlice.actions;
export default staffSlice.reducer;
