import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TicketType = 'task' | 'bug' | 'story';
export type TicketStatus = 'todo' | 'inprogress' | 'qa' | 'completed';
export type TicketPriority = 'lowest' | 'low' | 'medium' | 'high' | 'highest';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  type: TicketType;
  status: TicketStatus;
  priority: TicketPriority;
  projectId: string;
  sprintId?: string;
  assigneeId?: string;
  reporterId: string;
  storyPoints?: number;
  labels: string[];
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  key: string; // Ticket key like 'PROJ-123'
}

export interface TicketComment {
  id: string;
  ticketId: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface TicketState {
  tickets: Ticket[];
  comments: TicketComment[];
  currentTicket: Ticket | null;
  loading: boolean;
  error: string | null;
  filters: {
    status?: TicketStatus[];
    type?: TicketType[];
    assignee?: string[];
    priority?: TicketPriority[];
  };
}

const initialState: TicketState = {
  tickets: [
    {
      id: '1',
      title: 'Implement user authentication system',
      description: 'Create a secure authentication system with JWT tokens, password hashing, and session management.',
      type: 'story',
      status: 'inprogress',
      priority: 'high',
      projectId: '1',
      sprintId: '1',
      assigneeId: '1',
      reporterId: '2',
      storyPoints: 8,
      labels: ['security', 'authentication'],
      attachments: [],
      createdAt: '2025-01-10T09:00:00Z',
      updatedAt: '2025-01-15T14:30:00Z',
      dueDate: '2025-01-25T23:59:59Z',
      key: 'PROJ-101',
    },
    {
      id: '2',
      title: 'Fix login button alignment issue',
      description: 'The login button is not properly aligned on mobile devices. It appears offset to the right.',
      type: 'bug',
      status: 'todo',
      priority: 'medium',
      projectId: '1',
      sprintId: '1',
      assigneeId: '2',
      reporterId: '1',
      storyPoints: 2,
      labels: ['ui', 'mobile'],
      attachments: [],
      createdAt: '2025-01-12T11:15:00Z',
      updatedAt: '2025-01-12T11:15:00Z',
      dueDate: '2025-01-20T23:59:59Z',
      key: 'PROJ-102',
    },
    {
      id: '3',
      title: 'Setup CI/CD pipeline',
      description: 'Configure automated build and deployment pipeline using GitHub Actions.',
      type: 'task',
      status: 'completed',
      priority: 'high',
      projectId: '1',
      sprintId: undefined,
      assigneeId: '3',
      reporterId: '2',
      storyPoints: 5,
      labels: ['devops', 'automation'],
      attachments: [],
      createdAt: '2025-01-08T08:30:00Z',
      updatedAt: '2025-01-14T16:45:00Z',
      key: 'PROJ-103',
    },
    {
      id: '4',
      title: 'Create project dashboard',
      description: 'Design and implement a comprehensive project dashboard with charts and metrics.',
      type: 'story',
      status: 'qa',
      priority: 'medium',
      projectId: '2',
      sprintId: '2',
      assigneeId: '1',
      reporterId: '3',
      storyPoints: 13,
      labels: ['dashboard', 'analytics'],
      attachments: [],
      createdAt: '2025-01-05T10:00:00Z',
      updatedAt: '2025-01-16T12:20:00Z',
      dueDate: '2025-01-30T23:59:59Z',
      key: 'DASH-201',
    },
    {
      id: '5',
      title: 'Database performance optimization',
      description: 'Optimize database queries and add proper indexing to improve application performance.',
      type: 'task',
      status: 'inprogress',
      priority: 'highest',
      projectId: '2',
      sprintId: '2',
      assigneeId: '2',
      reporterId: '1',
      storyPoints: 8,
      labels: ['performance', 'database'],
      attachments: [],
      createdAt: '2025-01-11T13:45:00Z',
      updatedAt: '2025-01-17T09:15:00Z',
      dueDate: '2025-01-28T23:59:59Z',
      key: 'DASH-202',
    },
    {
      id: '6',
      title: 'Memory leak in file upload',
      description: 'Users report browser freezing when uploading large files. Investigation shows memory leak in upload component.',
      type: 'bug',
      status: 'todo',
      priority: 'high',
      projectId: '1',
      sprintId: undefined,
      assigneeId: undefined,
      reporterId: '2',
      storyPoints: 3,
      labels: ['bug', 'memory', 'upload'],
      attachments: [],
      createdAt: '2025-01-16T15:30:00Z',
      updatedAt: '2025-01-16T15:30:00Z',
      dueDate: '2025-01-22T23:59:59Z',
      key: 'PROJ-104',
    },
    {
      id: '7',
      title: 'Add dark mode support',
      description: 'Implement dark mode theme throughout the application with user preference persistence.',
      type: 'story',
      status: 'todo',
      priority: 'low',
      projectId: '2',
      sprintId: undefined,
      assigneeId: '3',
      reporterId: '1',
      storyPoints: 5,
      labels: ['ui', 'theme', 'accessibility'],
      attachments: [],
      createdAt: '2025-01-13T14:20:00Z',
      updatedAt: '2025-01-13T14:20:00Z',
      key: 'DASH-203',
    },
    {
      id: '8',
      title: 'Update documentation',
      description: 'Update API documentation and user guides to reflect recent changes.',
      type: 'task',
      status: 'completed',
      priority: 'low',
      projectId: '1',
      sprintId: '1',
      assigneeId: '2',
      reporterId: '3',
      storyPoints: 2,
      labels: ['documentation'],
      attachments: [],
      createdAt: '2025-01-09T16:00:00Z',
      updatedAt: '2025-01-15T10:30:00Z',
      key: 'PROJ-105',
    },
    {
      id: '9',
      title: 'Implement real-time notifications',
      description: 'Add WebSocket-based real-time notifications for project updates and team collaboration.',
      type: 'story',
      status: 'inprogress',
      priority: 'medium',
      projectId: '2',
      sprintId: '3',
      assigneeId: '1',
      reporterId: '2',
      storyPoints: 8,
      labels: ['realtime', 'notifications', 'websocket'],
      attachments: [],
      createdAt: '2025-01-14T11:45:00Z',
      updatedAt: '2025-01-18T08:20:00Z',
      dueDate: '2025-02-05T23:59:59Z',
      key: 'DASH-204',
    },
    {
      id: '10',
      title: 'Cross-browser compatibility issue',
      description: 'Application layout breaks in Safari and older versions of Firefox. Need to fix CSS compatibility.',
      type: 'bug',
      status: 'qa',
      priority: 'medium',
      projectId: '1',
      sprintId: '2',
      assigneeId: '3',
      reporterId: '1',
      storyPoints: 3,
      labels: ['compatibility', 'css', 'safari', 'firefox'],
      attachments: [],
      createdAt: '2025-01-15T12:10:00Z',
      updatedAt: '2025-01-17T16:40:00Z',
      dueDate: '2025-01-26T23:59:59Z',
      key: 'PROJ-106',
    },
  ],
  comments: [],
  currentTicket: null,
  loading: false,
  error: null,
  filters: {},
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    fetchTicketsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTicketsSuccess: (state, action: PayloadAction<Ticket[]>) => {
      state.loading = false;
      state.tickets = action.payload;
      state.error = null;
    },
    fetchTicketsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentTicket: (state, action: PayloadAction<Ticket>) => {
      state.currentTicket = action.payload;
    },
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.push(action.payload);
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.tickets.findIndex(ticket => ticket.id === action.payload.id);
      if (index !== -1) {
        Object.assign(state.tickets[index], action.payload);
        if (state.currentTicket?.id === action.payload.id) {
          state.currentTicket = action.payload;
        }
      }
    },
    updateTicketStatus: (state, action: PayloadAction<{ id: string; status: TicketStatus }>) => {
      const { id, status } = action.payload;
      const ticket = state.tickets.find(ticket => ticket.id === id);
      if (ticket) {
        ticket.status = status;
        ticket.updatedAt = new Date().toISOString();
        if (state.currentTicket?.id === id) {
          state.currentTicket.status = status;
          state.currentTicket.updatedAt = ticket.updatedAt;
        }
      }
    },
    removeTicket: (state, action: PayloadAction<string>) => {
      state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload);
      state.comments = state.comments.filter(comment => comment.ticketId !== action.payload);
      if (state.currentTicket?.id === action.payload) {
        state.currentTicket = null;
      }
    },
    addComment: (state, action: PayloadAction<TicketComment>) => {
      state.comments.push(action.payload);
    },
    updateComment: (state, action: PayloadAction<TicketComment>) => {
      const index = state.comments.findIndex(comment => comment.id === action.payload.id);
      if (index !== -1) {
        Object.assign(state.comments[index], action.payload);
      }
    },
    removeComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<typeof initialState.filters>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    clearCurrentTicket: (state) => {
      state.currentTicket = null;
    },
  },
});

export const {
  fetchTicketsStart,
  fetchTicketsSuccess,
  fetchTicketsFailure,
  setCurrentTicket,
  addTicket,
  updateTicket,
  updateTicketStatus,
  removeTicket,
  addComment,
  updateComment,
  removeComment,
  setFilters,
  clearFilters,
  clearCurrentTicket,
} = ticketSlice.actions;

export default ticketSlice.reducer;
