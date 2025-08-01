export const statusColors = {
  planning: '#ed6c02',
  active: '#2e7d32',
  completed: '#1976d2',
  cancelled: '#d32f2f',
} as const;

export const statusLabels = {
  planning: 'Planning',
  active: 'Active',
  completed: 'Completed',
  cancelled: 'Cancelled',
} as const;

export const statusOptions = [
  { value: 'planning', label: 'Planning' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];
