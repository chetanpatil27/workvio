import { TicketType, TicketStatus, TicketPriority } from '@/store/slices/ticket';

export const TICKET_TYPES: { value: TicketType; label: string; color: string }[] = [
  { value: 'task', label: 'Task', color: '#1976d2' },
  { value: 'bug', label: 'Bug', color: '#d32f2f' },
  { value: 'story', label: 'Story', color: '#2e7d32' },
];

export const TICKET_STATUSES: { value: TicketStatus; label: string; color: string }[] = [
  { value: 'todo', label: 'To Do', color: '#757575' },
  { value: 'inprogress', label: 'In Progress', color: '#1976d2' },
  { value: 'qa', label: 'QA', color: '#ed6c02' },
  { value: 'completed', label: 'Completed', color: '#2e7d32' },
];

export const TICKET_PRIORITIES: { value: TicketPriority; label: string; color: string }[] = [
  { value: 'lowest', label: 'Lowest', color: '#9e9e9e' },
  { value: 'low', label: 'Low', color: '#4caf50' },
  { value: 'medium', label: 'Medium', color: '#ff9800' },
  { value: 'high', label: 'High', color: '#f44336' },
  { value: 'highest', label: 'Highest', color: '#9c27b0' },
];

export const getTypeConfig = (type: TicketType) => {
  return TICKET_TYPES.find(t => t.value === type) || TICKET_TYPES[0];
};

export const getStatusConfig = (status: TicketStatus) => {
  return TICKET_STATUSES.find(s => s.value === status) || TICKET_STATUSES[0];
};

export const getPriorityConfig = (priority: TicketPriority) => {
  return TICKET_PRIORITIES.find(p => p.value === priority) || TICKET_PRIORITIES[2];
};
