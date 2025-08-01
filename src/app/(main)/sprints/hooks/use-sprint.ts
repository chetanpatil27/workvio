'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';
import { Sprint, addSprint, removeSprint } from '@/store/slices/sprint';

export interface SprintFormData {
  name: string;
  description: string;
  projectId: string;
  status: Sprint['status'];
  startDate: string;
  endDate: string;
  goal: string;
}

export const useSprint = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { sprints } = useSelector((state: RootState) => state.sprint);
  const { projects } = useSelector((state: RootState) => state.project);

  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<Sprint['status'] | 'all'>('all');

  // Menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSprintId, setSelectedSprintId] = useState<string | null>(null);

  // Computed values
  const filteredSprints = useMemo(() => {
    let filtered = sprints;

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(sprint =>
        sprint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sprint.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(sprint => sprint.status === filterStatus);
    }

    return filtered;
  }, [sprints, searchTerm, filterStatus]);

  const sprintStats = useMemo(() => ({
    total: sprints.length,
    active: sprints.filter(s => s.status === 'active').length,
    planning: sprints.filter(s => s.status === 'planning').length,
    completed: sprints.filter(s => s.status === 'completed').length,
  }), [sprints]);

  // Menu handlers
  const handleMenuClick = useCallback((event: React.MouseEvent<HTMLElement>, sprintId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedSprintId(sprintId);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    setSelectedSprintId(null);
  }, []);

  // Sprint actions
  const handleViewSprint = useCallback((sprintId: string) => {
    router.push(`/sprints/${sprintId}`);
  }, [router]);

  const handleDeleteSprint = useCallback(() => {
    if (selectedSprintId) {
      dispatch(removeSprint(selectedSprintId));
    }
    handleMenuClose();
  }, [selectedSprintId, dispatch, handleMenuClose]);

  const handleSaveSprint = useCallback((formData: SprintFormData, isEditing: boolean) => {
    const newSprint: Sprint = {
      id: isEditing ? selectedSprintId! : `sprint-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      projectId: formData.projectId,
      status: formData.status,
      startDate: formData.startDate,
      endDate: formData.endDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      goal: formData.goal,
      completedPoints: 0,
      totalPoints: 0,
    };

    dispatch(addSprint(newSprint));
  }, [selectedSprintId, dispatch]);

  // Utility functions
  const getProjectName = useCallback((projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  }, [projects]);

  const calculateProgress = useCallback((sprint: Sprint) => {
    if (!sprint.totalPoints || sprint.totalPoints === 0) return 0;
    return (sprint.completedPoints || 0) / sprint.totalPoints * 100;
  }, []);

  const getSelectedSprint = useCallback(() => {
    return sprints.find(s => s.id === selectedSprintId) || null;
  }, [sprints, selectedSprintId]);

  return {
    // Data
    sprints: filteredSprints,
    sprintStats,
    projects,
    selectedSprint: getSelectedSprint(),

    // Search and filter
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,

    // Menu state
    anchorEl,
    selectedSprintId,
    handleMenuClick,
    handleMenuClose,

    // Actions
    handleViewSprint,
    handleDeleteSprint,
    handleSaveSprint,

    // Utilities
    getProjectName,
    calculateProgress,
  };
};
