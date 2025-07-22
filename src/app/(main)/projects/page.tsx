'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { Project, addProject, removeProject } from '@/store/slices/project';
import Input from '@/components/form-controls/input';
import CustomSelect from '@/components/form-controls/select';

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const { projects } = useSelector((state: RootState) => state.project);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    key: '',
    status: 'active',
    color: '#1976d2',
  });

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, projectId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedProjectId(projectId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProjectId(null);
  };

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setIsEditing(true);
      setFormData({
        name: project.name,
        description: project.description,
        key: project.key,
        status: project.status,
        color: project.color,
      });
    } else {
      setIsEditing(false);
      setFormData({
        name: '',
        description: '',
        key: '',
        status: 'active',
        color: '#1976d2',
      });
    }
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormData({
      name: '',
      description: '',
      key: '',
      status: 'active',
      color: '#1976d2',
    });
  };

  const handleSubmit = () => {
    const newProject = {
      id: isEditing ? selectedProjectId! : Date.now().toString(),
      name: formData.name,
      description: formData.description,
      key: formData.key.toUpperCase(),
      status: formData.status as 'active' | 'inactive' | 'archived',
      color: formData.color,
      leadId: '1', // Current user
      members: ['1'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addProject(newProject));
    handleCloseDialog();
  };

  const handleDeleteProject = () => {
    if (selectedProjectId) {
      dispatch(removeProject(selectedProjectId));
    }
    handleMenuClose();
  };

  const statusColors = {
    active: 'success',
    inactive: 'warning',
    archived: 'default',
  } as const;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        gap: { xs: 2, sm: 0 },
        mb: { xs: 3, sm: 4 }
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Projects
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your projects and track their progress
          </Typography>
        </Box>
      </Box>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No projects yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Create your first project to get started
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            size="large"
          >
            Create Project
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
              xl: 'repeat(4, 1fr)',
            },
            gap: { xs: 2, sm: 3 },
          }}
        >
          {projects.map((project) => (
            <Card
              key={project.id}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: (theme) => theme.shadows[4],
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar
                    sx={{
                      backgroundColor: project.color,
                      width: 56,
                      height: 56,
                      fontSize: '1.25rem',
                      fontWeight: 600,
                    }}
                  >
                    {project.key}
                  </Avatar>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, project.id)}
                    sx={{ mt: -1, mr: -1 }}
                  >
                    <MoreIcon />
                  </IconButton>
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {project.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: 40,
                  }}
                >
                  {project.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    label={project.status}
                    size="small"
                    color={statusColors[project.status]}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {project.members.length} member{project.members.length !== 1 ? 's' : ''}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Floating Action Button */}
      {projects.length > 0 && (
        <Fab
          color="primary"
          aria-label="add project"
          onClick={() => handleOpenDialog()}
          sx={{
            position: 'fixed',
            bottom: { xs: 16, sm: 24, md: 32 },
            right: { xs: 16, sm: 24, md: 32 },
            zIndex: 1000,
          }}
        >
          <AddIcon />
        </Fab>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleOpenDialog(projects.find(p => p.id === selectedProjectId))}>
          <EditIcon sx={{ mr: 1 }} fontSize="small" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ViewIcon sx={{ mr: 1 }} fontSize="small" />
          View Sprints
        </MenuItem>
        <MenuItem onClick={handleDeleteProject}>
          <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
          Delete
        </MenuItem>
      </Menu>

      {/* Create/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {isEditing ? 'Edit Project' : 'Create New Project'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Input
              label="Project Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              isRequired
            />

            <Input
              label="Project Key"
              value={formData.key}
              onChange={(e) => setFormData({ ...formData, key: e.target.value.toUpperCase() })}
              placeholder="e.g., PROJ"
              isRequired
              helperText="Short identifier for your project (2-10 characters)"
            />

            <Input
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
            />

            <CustomSelect
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as string })}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'archived', label: 'Archived' },
              ]}
            />

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Project Color
              </Typography>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                style={{
                  width: '100%',
                  height: 48,
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name || !formData.key}
          >
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
