import { Sprint } from '@/store/slices/sprint';

/**
 * Calculate sprint duration in days
 */
export const calculateSprintDuration = (startDate: string, endDate: string): number => {
  return Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
};

/**
 * Calculate sprint progress percentage
 */
export const calculateSprintProgress = (sprint: Sprint): number => {
  if (!sprint.totalPoints || sprint.totalPoints === 0) return 0;
  return (sprint.completedPoints || 0) / sprint.totalPoints * 100;
};

/**
 * Get project name by ID
 */
export const getProjectNameById = (projectId: string, projects: Array<{ id: string; name: string }>): string => {
  const project = projects.find(p => p.id === projectId);
  return project ? project.name : 'Unknown Project';
};

/**
 * Generate sprint options for select components
 */
export const generateProjectOptions = (projects: Array<{ id: string; name: string; key: string }>) => {
  return projects.map(project => ({
    value: project.id,
    label: `${project.key} - ${project.name}`,
  }));
};
