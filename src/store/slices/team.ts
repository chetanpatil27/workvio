import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'leader' | 'member' | 'observer';
}

export interface Team {
    id: string;
    name: string;
    description: string;
    profileImage?: string;
    members: TeamMember[];
    createdAt: string;
    updatedAt: string;
    projectsCount: number;
    status: 'active' | 'inactive';
}

interface TeamState {
    teams: Team[];
    loading: boolean;
    error: string | null;
}

const initialState: TeamState = {
    teams: [
        {
            id: '1',
            name: 'Frontend Development',
            description: 'Responsible for building user interfaces and user experiences',
            profileImage: undefined,
            members: [
                {
                    id: '1',
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    role: 'leader'
                },
                {
                    id: '2',
                    name: 'Jane Smith',
                    email: 'jane.smith@example.com',
                    role: 'member'
                },
                {
                    id: '3',
                    name: 'Bob Johnson',
                    email: 'bob.johnson@example.com',
                    role: 'member'
                }
            ],
            createdAt: '2024-01-15',
            updatedAt: '2024-12-20',
            projectsCount: 5,
            status: 'active'
        },
        {
            id: '2',
            name: 'Backend Development',
            description: 'Handles server-side logic, databases, and API development',
            profileImage: undefined,
            members: [
                {
                    id: '4',
                    name: 'Alice Wilson',
                    email: 'alice.wilson@example.com',
                    role: 'leader'
                },
                {
                    id: '5',
                    name: 'Charlie Brown',
                    email: 'charlie.brown@example.com',
                    role: 'member'
                }
            ],
            createdAt: '2024-01-10',
            updatedAt: '2024-12-18',
            projectsCount: 3,
            status: 'active'
        },
        {
            id: '3',
            name: 'DevOps & Infrastructure',
            description: 'Manages deployment, monitoring, and infrastructure automation',
            profileImage: undefined,
            members: [
                {
                    id: '6',
                    name: 'David Lee',
                    email: 'david.lee@example.com',
                    role: 'leader'
                }
            ],
            createdAt: '2024-02-01',
            updatedAt: '2024-12-15',
            projectsCount: 2,
            status: 'active'
        },
        {
            id: '4',
            name: 'QA Testing',
            description: 'Ensures quality assurance and testing of all products',
            profileImage: undefined,
            members: [
                {
                    id: '7',
                    name: 'Emma Davis',
                    email: 'emma.davis@example.com',
                    role: 'leader'
                },
                {
                    id: '8',
                    name: 'Frank Miller',
                    email: 'frank.miller@example.com',
                    role: 'member'
                }
            ],
            createdAt: '2024-01-20',
            updatedAt: '2024-12-10',
            projectsCount: 4,
            status: 'inactive'
        }
    ],
    loading: false,
    error: null,
};

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        addTeam: (state, action: PayloadAction<Omit<Team, 'id' | 'createdAt' | 'updatedAt'>>) => {
            const newTeam: Team = {
                ...action.payload,
                id: Math.random().toString(36).substr(2, 9),
                createdAt: '2024-12-21',
                updatedAt: '2024-12-21',
            };
            state.teams.push(newTeam);
        },
        updateTeam: (state, action: PayloadAction<Team>) => {
            const index = state.teams.findIndex(team => team.id === action.payload.id);
            if (index !== -1) {
                state.teams[index] = {
                    ...action.payload,
                    updatedAt: '2024-12-21',
                };
            }
        },
        deleteTeam: (state, action: PayloadAction<string>) => {
            state.teams = state.teams.filter(team => team.id !== action.payload);
        },
        addTeamMember: (state, action: PayloadAction<{ teamId: string; member: TeamMember }>) => {
            const team = state.teams.find(t => t.id === action.payload.teamId);
            if (team) {
                team.members.push(action.payload.member);
                team.updatedAt = '2024-12-21';
            }
        },
        removeTeamMember: (state, action: PayloadAction<{ teamId: string; memberId: string }>) => {
            const team = state.teams.find(t => t.id === action.payload.teamId);
            if (team) {
                team.members = team.members.filter(m => m.id !== action.payload.memberId);
                team.updatedAt = '2024-12-21';
            }
        },
        updateTeamMemberRole: (state, action: PayloadAction<{ teamId: string; memberId: string; role: TeamMember['role'] }>) => {
            const team = state.teams.find(t => t.id === action.payload.teamId);
            if (team) {
                const member = team.members.find(m => m.id === action.payload.memberId);
                if (member) {
                    member.role = action.payload.role;
                    team.updatedAt = '2024-12-21';
                }
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
    addTeam,
    updateTeam,
    deleteTeam,
    addTeamMember,
    removeTeamMember,
    updateTeamMemberRole,
    setLoading,
    setError,
} = teamSlice.actions;

export default teamSlice.reducer;
