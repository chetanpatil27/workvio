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
  tickets: [],
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
        state.tickets[index] = action.payload;
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
        state.comments[index] = action.payload;
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
