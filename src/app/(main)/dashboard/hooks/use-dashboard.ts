'use client';

import { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';

export const useDashboard = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const { projects } = useSelector((state: RootState) => state.project);
  const { tickets } = useSelector((state: RootState) => state.ticket);
  const { sprints } = useSelector((state: RootState) => state.sprint);

  // Computed dashboard statistics
  const dashboardStats = useMemo(() => {
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const totalTickets = tickets.length;
    const completedTickets = tickets.filter(t => t.status === 'completed').length;
    const inProgressTickets = tickets.filter(t => t.status === 'inprogress').length;
    const completionRate = totalTickets > 0 ? (completedTickets / totalTickets) * 100 : 0;

    return {
      activeProjects,
      totalTickets,
      completedTickets,
      inProgressTickets,
      completionRate,
      totalProjects: projects.length,
      activeSprints: sprints.filter(s => s.status === 'active').length,
    };
  }, [projects, tickets, sprints]);

  // Recent data
  const recentData = useMemo(() => {
    const recentProjects = [...projects]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 3);
    
    const recentTickets = [...tickets]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);

    const recentSprints = [...sprints]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 3);

    return {
      recentProjects,
      recentTickets,
      recentSprints,
    };
  }, [projects, tickets, sprints]);

  // Navigation handlers
  const handleNavigateToProjects = useCallback(() => {
    router.push('/projects');
  }, [router]);

  const handleNavigateToTickets = useCallback(() => {
    router.push('/tickets');
  }, [router]);

  const handleNavigateToSprints = useCallback(() => {
    router.push('/sprints');
  }, [router]);

  const handleViewProject = useCallback((projectId: string) => {
    router.push(`/projects/${projectId}`);
  }, [router]);

  const handleViewTicket = useCallback((ticketId: string) => {
    router.push(`/tickets/${ticketId}`);
  }, [router]);

  const handleViewSprint = useCallback((sprintId: string) => {
    router.push(`/sprints/${sprintId}`);
  }, [router]);

  // Utility functions
  const getTicketIcon = useCallback((type: string) => {
    return type; // Return type for icon selection in component
  }, []);

  const getStatusColor = useCallback((status: string): 'success' | 'warning' | 'info' | 'default' => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'inprogress':
        return 'warning';
      case 'qa':
        return 'info';
      default:
        return 'default';
    }
  }, []);

  return {
    // Data
    user,
    dashboardStats,
    recentData,

    // Navigation
    handleNavigateToProjects,
    handleNavigateToTickets,
    handleNavigateToSprints,
    handleViewProject,
    handleViewTicket,
    handleViewSprint,

    // Utilities
    getTicketIcon,
    getStatusColor,
  };
};
