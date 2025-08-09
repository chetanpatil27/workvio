'use client';

import React from 'react';
import {
    Box,
} from '@mui/material';
import Button from '@/components/form-controls/button';
import { Input, Select } from '@/components/form-controls';
import { Modal } from '@/components/common';
import { Project } from '@/store/slices/project';

export interface ProjectFormData {
    name: string;
    description: string;
    status: string;
    priority: string;
}

interface ProjectDialogProps {
    open: boolean;
    isEditing: boolean;
    formData: ProjectFormData;
    errors: Partial<ProjectFormData>;
    isSubmitting: boolean;
    onClose: () => void;
    onSave: () => void;
    onFormDataChange: (updates: Partial<ProjectFormData>) => void;
}

const statusOptions = [
    { value: 'planned', label: 'Planned' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' },
];

const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' },
];

const ProjectDialog: React.FC<ProjectDialogProps> = ({
    open,
    isEditing,
    formData,
    errors,
    isSubmitting,
    onClose,
    onSave,
    onFormDataChange,
}) => {
    const handleSave = () => {
        onSave();
    };

    const actions = (
        <>
            <Button
                variant="outlined"
                onClick={onClose}
                disabled={isSubmitting}
            >
                Cancel
            </Button>
            <Button
                variant="filled"
                onClick={handleSave}
                loading={isSubmitting}
            >
                {isEditing ? 'Update Project' : 'Create Project'}
            </Button>
        </>
    );

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={isEditing ? 'Edit Project' : 'Create New Project'}
            subtitle={isEditing ? 'Update project information' : 'Enter details for the new project'}
            size="md"
            actions={actions}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Input
                    label="Project Name"
                    placeholder="Enter project name"
                    value={formData.name}
                    onChange={(e) => onFormDataChange({ name: e.target.value })}
                    error={errors.name}
                    helperText={errors.name}
                    required
                />

                <Input
                    label="Description"
                    placeholder="Enter project description"
                    value={formData.description}
                    onChange={(e) => onFormDataChange({ description: e.target.value })}
                    error={errors.description}
                    helperText={errors.description}
                    multiline
                    rows={3}
                />

                <Select
                    label="Status"
                    placeholder="Select status"
                    value={formData.status}
                    onChange={(e) => onFormDataChange({ status: e.target.value as string })}
                    options={statusOptions}
                    error={errors.status}
                    required
                />

                <Select
                    label="Priority"
                    placeholder="Select priority"
                    value={formData.priority}
                    onChange={(e) => onFormDataChange({ priority: e.target.value as string })}
                    options={priorityOptions}
                    error={errors.priority}
                />
            </Box>
        </Modal>
    );
};

export default ProjectDialog;
