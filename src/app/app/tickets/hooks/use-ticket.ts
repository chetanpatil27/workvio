import { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Ticket, TicketStatus, TicketType, TicketPriority } from '@/store/slices/ticket';

export const useTicket = () => {
  const { tickets } = useSelector((state: RootState) => state.ticket);
  const { projects } = useSelector((state: RootState) => state.project);
  const { sprints } = useSelector((state: RootState) => state.sprint);
  const { staff } = useSelector((state: RootState) => state.staff);

  // Local state
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<TicketStatus | 'all'>('all');
  const [filterType, setFilterType] = useState<TicketType | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<TicketPriority | 'all'>('all');
  const [filterProject, setFilterProject] = useState<string | 'all'>('all');
  const [filterSprint, setFilterSprint] = useState<string | 'all'>('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Menu handlers
  const handleMenuClick = useCallback((event: React.MouseEvent<HTMLElement>, ticket: Ticket) => {
    setAnchorEl(event.currentTarget);
    setSelectedTicket(ticket);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    setSelectedTicket(null);
  }, []);

  // Ticket actions
  const handleViewTicket = useCallback((ticketId: string) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      setSelectedTicket(ticket);
      // Open ticket modal here
    }
  }, [tickets]);

  const handleDeleteTicket = useCallback(() => {
    if (selectedTicket) {
      // TODO: Implement delete ticket
      console.log('Delete ticket:', selectedTicket.id);
      handleMenuClose();
    }
  }, [selectedTicket, handleMenuClose]);

  // Utility functions
  const getProjectName = useCallback((projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project?.name || 'Unknown Project';
  }, [projects]);

  const getSprintName = useCallback((sprintId?: string) => {
    if (!sprintId) return 'No Sprint';
    const sprint = sprints.find(s => s.id === sprintId);
    return sprint?.name || 'Unknown Sprint';
  }, [sprints]);

  const getAssigneeName = useCallback((assigneeId?: string) => {
    if (!assigneeId) return 'Unassigned';
    const assignee = staff.find(s => s.id === assigneeId);
    return assignee ? assignee.name : 'Unknown Assignee';
  }, [staff]);

  const getReporterName = useCallback((reporterId: string) => {
    const reporter = staff.find(s => s.id === reporterId);
    return reporter ? reporter.name : 'Unknown Reporter';
  }, [staff]);

  // Filter tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.key.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
      const matchesType = filterType === 'all' || ticket.type === filterType;
      const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
      const matchesProject = filterProject === 'all' || ticket.projectId === filterProject;
      const matchesSprint = filterSprint === 'all' || ticket.sprintId === filterSprint;

      return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesProject && matchesSprint;
    });
  }, [tickets, searchTerm, filterStatus, filterType, filterPriority, filterProject, filterSprint]);

  // Ticket statistics
  const ticketStats = useMemo(() => {
    const total = filteredTickets.length;
    const byStatus = {
      todo: filteredTickets.filter(t => t.status === 'todo').length,
      inprogress: filteredTickets.filter(t => t.status === 'inprogress').length,
      qa: filteredTickets.filter(t => t.status === 'qa').length,
      completed: filteredTickets.filter(t => t.status === 'completed').length,
    };
    const byType = {
      task: filteredTickets.filter(t => t.type === 'task').length,
      bug: filteredTickets.filter(t => t.type === 'bug').length,
      story: filteredTickets.filter(t => t.type === 'story').length,
    };
    const byPriority = {
      lowest: filteredTickets.filter(t => t.priority === 'lowest').length,
      low: filteredTickets.filter(t => t.priority === 'low').length,
      medium: filteredTickets.filter(t => t.priority === 'medium').length,
      high: filteredTickets.filter(t => t.priority === 'high').length,
      highest: filteredTickets.filter(t => t.priority === 'highest').length,
    };

    return {
      total,
      byStatus,
      byType,
      byPriority,
    };
  }, [filteredTickets]);

  return {
    tickets: filteredTickets,
    ticketStats,
    projects,
    sprints,
    staff,
    selectedTicket,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterType,
    setFilterType,
    filterPriority,
    setFilterPriority,
    filterProject,
    setFilterProject,
    filterSprint,
    setFilterSprint,
    anchorEl,
    handleMenuClick,
    handleMenuClose,
    handleViewTicket,
    handleDeleteTicket,
    getProjectName,
    getSprintName,
    getAssigneeName,
    getReporterName,
  };
};
