import { useState, useCallback } from 'react';
import { TicketFormData } from '../components/ticket-dialog';
import { Ticket } from '@/store/slices/ticket';

export const useTicketDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<TicketFormData>({
    title: '',
    description: '',
    type: 'task',
    status: 'todo',
    priority: 'medium',
    projectId: '',
    sprintId: undefined,
    assigneeId: undefined,
    storyPoints: undefined,
    labels: [],
  });

  const openCreateDialog = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      type: 'task',
      status: 'todo',
      priority: 'medium',
      projectId: '',
      sprintId: undefined,
      assigneeId: undefined,
      storyPoints: undefined,
      labels: [],
    });
    setIsEditing(false);
    setDialogOpen(true);
  }, []);

  const openEditDialog = useCallback((ticket: Ticket) => {
    setFormData({
      title: ticket.title,
      description: ticket.description,
      type: ticket.type,
      status: ticket.status,
      priority: ticket.priority,
      projectId: ticket.projectId,
      sprintId: ticket.sprintId,
      assigneeId: ticket.assigneeId,
      storyPoints: ticket.storyPoints,
      labels: ticket.labels,
    });
    setIsEditing(true);
    setDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setDialogOpen(false);
    setIsEditing(false);
  }, []);

  const updateFormData = useCallback((updates: Partial<TicketFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const isFormValid = formData.title.trim() !== '' && formData.projectId !== '';

  return {
    dialogOpen,
    isEditing,
    formData,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    updateFormData,
    isFormValid,
  };
};
