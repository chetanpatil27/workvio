'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProject, Project } from '@/store/slices/project';
import { ProjectFormData } from '../components/project-dialog';

export const useProjectDialog = () => {
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<ProjectFormData>({
        name: '',
        description: '',
        status: '',
        priority: '',
    });

    const [errors, setErrors] = useState<Partial<ProjectFormData>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<ProjectFormData> = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Project name is required';
        } else if (formData.name.trim().length < 3) {
            newErrors.name = 'Project name must be at least 3 characters';
        }

        // Status validation
        if (!formData.status) {
            newErrors.status = 'Status is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const openEditDialog = (project: Project) => {
        setIsEditing(true);
        setEditingProject(project);
        setFormData({
            name: project.name,
            description: project.description || '',
            status: project.status,
            priority: project.priority || '',
        });
        setErrors({});
        setIsOpen(true);
    };

    const closeDialog = () => {
        setTimeout(() => {
            setIsOpen(false);
            setIsEditing(false);
            setEditingProject(null);
            setFormData({
                name: '',
                description: '',
                status: '',
                priority: '',
            });
            setErrors({});
            setIsSubmitting(false);
        }, 0);
    };

    const handleFormDataChange = (updates: Partial<ProjectFormData>) => {
        setFormData(prev => ({ ...prev, ...updates }));

        // Clear errors for changed fields
        const updatedErrors = { ...errors };
        Object.keys(updates).forEach(key => {
            delete updatedErrors[key as keyof ProjectFormData];
        });
        setErrors(updatedErrors);
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (isEditing && editingProject) {
                dispatch(updateProject({
                    ...editingProject,
                    name: formData.name.trim(),
                    description: formData.description.trim(),
                    status: formData.status as Project['status'],
                    priority: formData.priority as Project['priority'],
                }));
            }

            closeDialog();
        } catch (error) {
            console.error('Error saving project:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isOpen,
        isEditing,
        formData,
        errors,
        isSubmitting,
        openEditDialog,
        closeDialog,
        handleFormDataChange,
        handleSave,
    };
};
