'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';
import { Project, addProject, removeProject } from '@/store/slices/project';

export interface ProjectFormData {
  name: string;
  description: string;
  key: string;
  status: Project['status'];
  startDate: string;
  dueDate: string;
  priority: Project['priority'];
}

export const useProject = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { projects } = useSelector((state: RootState) => state.project);
  const { sprints } = useSelector((state: RootState) => state.sprint);
  const { tickets } = useSelector((state: RootState) => state.ticket);

  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [filterStatus, setFilterStatus] = useState<Project['status'] | 'all'>('all');

  // Menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Computed values
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.key && project.key.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(project => project.status === filterStatus);
    }

    // Apply tab filter
    switch (selectedTab) {
      case 0: // All projects
        break;
      case 1: // Active projects
        filtered = filtered.filter(project => project.status === 'active');
        break;
      case 2: // Completed projects
        filtered = filtered.filter(project => project.status === 'completed');
        break;
      case 3: // Archived projects
        filtered = filtered.filter(project => project.status === 'archived');
        break;
    }

    return filtered;
  }, [projects, searchTerm, filterStatus, selectedTab]);

  const projectStats = useMemo(() => ({
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    archived: projects.filter(p => p.status === 'archived').length,
  }), [projects]);

  // Menu handlers
  const handleMenuClick = useCallback((event: React.MouseEvent<HTMLElement>, projectId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedProjectId(projectId);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    setSelectedProjectId(null);
  }, []);

  // Project actions
  const handleViewProject = useCallback((projectId: string) => {
    router.push(`/projects/${projectId}`);
  }, [router]);

  const handleDeleteProject = useCallback(() => {
    if (selectedProjectId) {
      dispatch(removeProject(selectedProjectId));
    }
    handleMenuClose();
  }, [selectedProjectId, dispatch, handleMenuClose]);

  const handleSaveProject = useCallback((formData: ProjectFormData, isEditing: boolean) => {
    const newProject: Project = {
      id: isEditing ? selectedProjectId! : `project-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      key: formData.key,
      status: formData.status,
      startDate: formData.startDate,
      dueDate: formData.dueDate,
      priority: formData.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: 0,
    };

    dispatch(addProject(newProject));
  }, [selectedProjectId, dispatch]);

  // Utility functions
  const getProjectProgress = useCallback((projectId: string) => {
    const projectTickets = tickets.filter(t => t.projectId === projectId);
    if (projectTickets.length === 0) return 0;
    const completedTickets = projectTickets.filter(t => t.status === 'completed');
    return (completedTickets.length / projectTickets.length) * 100;
  }, [tickets]);

  const getProjectSprints = useCallback((projectId: string) => {
    return sprints.filter(s => s.projectId === projectId);
  }, [sprints]);

  const getSelectedProject = useCallback(() => {
    return projects.find(p => p.id === selectedProjectId) || null;
  }, [projects, selectedProjectId]);

  return {
    // Data
    projects: filteredProjects,
    projectStats,
    selectedProject: getSelectedProject(),

    // Search and filter
    searchTerm,
    setSearchTerm,
    selectedTab,
    setSelectedTab,
    filterStatus,
    setFilterStatus,

    // Menu state
    anchorEl,
    selectedProjectId,
    handleMenuClick,
    handleMenuClose,

    // Actions
    handleViewProject,
    handleDeleteProject,
    handleSaveProject,

    // Utilities
    getProjectProgress,
    getProjectSprints,
  };
};
