'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TicketType, TicketStatus, TicketPriority } from '@/store/slices/ticket';
import { TICKET_TYPES, TICKET_STATUSES, TICKET_PRIORITIES } from '../constants/ticket-constants';

export interface TicketFormData {
  title: string;
  description: string;
  type: TicketType;
  status: TicketStatus;
  priority: TicketPriority;
  projectId: string;
  sprintId?: string;
  assigneeId?: string;
  storyPoints?: number;
  labels: string[];
}

interface TicketDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: TicketFormData) => void;
  formData: TicketFormData;
  onFormDataChange: (data: Partial<TicketFormData>) => void;
  isEditing: boolean;
  projects: Array<{ id: string; name: string }>;
  sprints: Array<{ id: string; name: string }>;
  staff: Array<{ id: string; name: string }>;
  isFormValid: boolean;
}

export default function TicketDialog({
  open,
  onClose,
  onSave,
  formData,
  onFormDataChange,
  isEditing,
  projects,
  sprints,
  staff,
  isFormValid,
}: TicketDialogProps) {
  const handleSave = () => {
    if (isFormValid) {
      onSave(formData);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2, fontWeight: 600 }}>
        {isEditing ? 'Edit Ticket' : 'Create New Ticket'}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Title */}
          <TextField
            label="Title"
            value={formData.title}
            onChange={(e) => onFormDataChange({ title: e.target.value })}
            fullWidth
            required
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          {/* Description */}
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => onFormDataChange({ description: e.target.value })}
            fullWidth
            multiline
            rows={4}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          {/* First Row: Type, Status, Priority */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ flex: '1 1 200px' }}>
              <FormControl fullWidth required>
                <InputLabel>Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Type"
                  onChange={(e) => onFormDataChange({ type: e.target.value as TicketType })}
                  sx={{ borderRadius: 2 }}
                >
                  {TICKET_TYPES.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ flex: '1 1 200px' }}>
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => onFormDataChange({ status: e.target.value as TicketStatus })}
                  sx={{ borderRadius: 2 }}
                >
                  {TICKET_STATUSES.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ flex: '1 1 200px' }}>
              <FormControl fullWidth required>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  label="Priority"
                  onChange={(e) => onFormDataChange({ priority: e.target.value as TicketPriority })}
                  sx={{ borderRadius: 2 }}
                >
                  {TICKET_PRIORITIES.map((priority) => (
                    <MenuItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Second Row: Project, Sprint, Assignee */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ flex: '1 1 200px' }}>
              <FormControl fullWidth required>
                <InputLabel>Project</InputLabel>
                <Select
                  value={formData.projectId}
                  label="Project"
                  onChange={(e) => onFormDataChange({ projectId: e.target.value })}
                  sx={{ borderRadius: 2 }}
                >
                  {projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ flex: '1 1 200px' }}>
              <FormControl fullWidth>
                <InputLabel>Sprint</InputLabel>
                <Select
                  value={formData.sprintId || ''}
                  label="Sprint"
                  onChange={(e) => onFormDataChange({ sprintId: e.target.value || undefined })}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">No Sprint</MenuItem>
                  {sprints.map((sprint) => (
                    <MenuItem key={sprint.id} value={sprint.id}>
                      {sprint.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ flex: '1 1 200px' }}>
              <FormControl fullWidth>
                <InputLabel>Assignee</InputLabel>
                <Select
                  value={formData.assigneeId || ''}
                  label="Assignee"
                  onChange={(e) => onFormDataChange({ assigneeId: e.target.value || undefined })}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">Unassigned</MenuItem>
                  {staff.map((member) => (
                    <MenuItem key={member.id} value={member.id}>
                      {member.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Story Points */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: '1 1 200px' }}>
              <TextField
                label="Story Points"
                type="number"
                value={formData.storyPoints || ''}
                onChange={(e) => onFormDataChange({ 
                  storyPoints: e.target.value ? parseInt(e.target.value) : undefined 
                })}
                inputProps={{ min: 0, max: 100 }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!isFormValid}
          sx={{ borderRadius: 2 }}
        >
          {isEditing ? 'Update Ticket' : 'Create Ticket'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
