export const projectStatusColors = {
  active: '#2e7d32',
  inactive: '#9e9e9e',
  archived: '#757575',
  completed: '#1976d2',
  'on-hold': '#ed6c02',
  planning: '#9c27b0',
  inprogress: '#1976d2',
  onhold: '#ed6c02',
} as const;

export const projectStatusLabels = {
  active: 'Active',
  inactive: 'Inactive',
  archived: 'Archived',
  completed: 'Completed',
  'on-hold': 'On Hold',
  planning: 'Planning',
  inprogress: 'In Progress',
  onhold: 'On Hold',
} as const;

export const projectPriorityColors = {
  High: '#d32f2f',
  Medium: '#ed6c02',
  Low: '#2e7d32',
} as const;

export const projectStatusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'planning', label: 'Planning' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'on-hold', label: 'On Hold' },
  { value: 'completed', label: 'Completed' },
  { value: 'archived', label: 'Archived' },
];

export const projectPriorityOptions = [
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' },
];
