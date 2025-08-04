'use client';

import { useState, useCallback } from 'react';
import { Sprint } from '@/store/slices/sprint';

export interface SprintFormData {
  name: string;
  description: string;
  projectId: string;
  status: Sprint['status'];
  startDate: string;
  endDate: string;
  goal: string;
}

const initialFormData: SprintFormData = {
  name: '',
  description: '',
  projectId: '',
  status: 'planning' as Sprint['status'],
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  goal: '',
};

export const useSprintDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<SprintFormData>(initialFormData);

  const openCreateDialog = useCallback(() => {
    setIsEditing(false);
    setFormData(initialFormData);
    setDialogOpen(true);
  }, []);

  const openEditDialog = useCallback((sprint: Sprint) => {
    setIsEditing(true);
    setFormData({
      name: sprint.name,
      description: sprint.description,
      projectId: sprint.projectId,
      status: sprint.status,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      goal: sprint.goal || '',
    });
    setDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setDialogOpen(false);
    setFormData(initialFormData);
  }, []);

  const updateFormData = useCallback((updates: Partial<SprintFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const isFormValid = useCallback(() => {
    return formData.name.trim() !== '' && formData.projectId !== '';
  }, [formData]);

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
