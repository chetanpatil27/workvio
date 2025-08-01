'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import Button from '@/components/form-controls/button';
import Input from '@/components/form-controls/input';
import CustomSelect from '@/components/form-controls/select';
import DatePicker from '@/components/form-controls/date-picker';
import Textarea from '@/components/form-controls/textarea';
import { Sprint } from '@/store/slices/sprint';
import { SprintFormData } from '../hooks/use-sprint-dialog';
import { statusOptions } from '../constants/sprint-status';

interface Project {
  id: string;
  name: string;
  key: string;
}

interface SprintDialogProps {
  open: boolean;
  isEditing: boolean;
  formData: SprintFormData;
  projects: Project[];
  onClose: () => void;
  onSave: (formData: SprintFormData, isEditing: boolean) => void;
  onFormDataChange: (updates: Partial<SprintFormData>) => void;
  isFormValid: boolean;
}

const SprintDialog: React.FC<SprintDialogProps> = ({
  open,
  isEditing,
  formData,
  projects,
  onClose,
  onSave,
  onFormDataChange,
  isFormValid,
}) => {
  const handleSave = () => {
    if (isFormValid) {
      onSave(formData, isEditing);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEditing ? 'Edit Sprint' : 'Create New Sprint'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <Input
            label="Sprint Name"
            value={formData.name}
            onChange={(e) => onFormDataChange({ name: e.target.value })}
            fullWidth
            required
          />
          
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => onFormDataChange({ description: e.target.value })}
            multiline
            rows={3}
            fullWidth
          />
          
          <CustomSelect
            label="Project"
            value={formData.projectId}
            onChange={(e) => onFormDataChange({ projectId: e.target.value as string })}
            options={projects.map(project => ({
              value: project.id,
              label: `${project.key} - ${project.name}`,
            }))}
            fullWidth
            required
          />
          
          <CustomSelect
            label="Status"
            value={formData.status}
            onChange={(e) => onFormDataChange({ status: e.target.value as Sprint['status'] })}
            options={statusOptions}
            fullWidth
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <DatePicker
              label="Start Date"
              value={formData.startDate}
              onChange={(value) => onFormDataChange({ startDate: value })}
            />
            <DatePicker
              label="End Date"
              value={formData.endDate}
              onChange={(value) => onFormDataChange({ endDate: value })}
            />
          </Box>
          
          <Textarea
            label="Sprint Goal"
            value={formData.goal}
            onChange={(value) => onFormDataChange({ goal: value })}
            rows={3}
            placeholder="Describe the main objective and goal for this sprint..."
            helperText="Define what the team aims to achieve by the end of this sprint"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          variant="filled"
          onClick={handleSave}
          disabled={!isFormValid}
        >
          {isEditing ? 'Update' : 'Create'} Sprint
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SprintDialog;
