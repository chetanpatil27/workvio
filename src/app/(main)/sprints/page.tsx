'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Avatar,
  AvatarGroup,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  TextField,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreIcon,
  CalendarToday as CalendarIcon,
  Group as GroupIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  DirectionsRun as DirectionsRunIcon,
  PlayArrow as PlayArrowIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { Sprint, addSprint, removeSprint } from '@/store/slices/sprint';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import Input from '@/components/form-controls/input';
import CustomSelect from '@/components/form-controls/select';
import DatePicker from '@/components/form-controls/date-picker';
import Textarea from '@/components/form-controls/textarea';

const statusColors = {
  planning: '#ed6c02',
  active: '#2e7d32',
  completed: '#1976d2',
  cancelled: '#d32f2f',
};

const statusLabels = {
  planning: 'Planning',
  active: 'Active',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export default function SprintsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { sprints } = useSelector((state: RootState) => state.sprint);
  const { projects } = useSelector((state: RootState) => state.project);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSprintId, setSelectedSprintId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    projectId: '',
    status: 'planning' as Sprint['status'],
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    goal: '',
  });

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, sprintId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedSprintId(sprintId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSprintId(null);
  };

  const handleCreateSprint = () => {
    setIsEditing(false);
    setFormData({
      name: '',
      description: '',
      projectId: '',
      status: 'planning' as Sprint['status'],
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      goal: '',
    });
    setDialogOpen(true);
  };

  const handleEditSprint = () => {
    const sprint = sprints.find(s => s.id === selectedSprintId);
    if (sprint) {
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
    }
    handleMenuClose();
  };

  const handleDeleteSprint = () => {
    if (selectedSprintId) {
      dispatch(removeSprint(selectedSprintId));
    }
    handleMenuClose();
  };

  const handleSaveSprint = () => {
    const newSprint: Sprint = {
      id: isEditing ? selectedSprintId! : `sprint-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      projectId: formData.projectId,
      status: formData.status,
      startDate: formData.startDate,
      endDate: formData.endDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      goal: formData.goal,
      completedPoints: 0,
      totalPoints: 0,
    };

    dispatch(addSprint(newSprint));
    setDialogOpen(false);
  };

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  };

  const getProjectKey = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.key : 'N/A';
  };

  const calculateProgress = (sprint: Sprint) => {
    if (!sprint.totalPoints || sprint.totalPoints === 0) return 0;
    return (sprint.completedPoints || 0) / sprint.totalPoints * 100;
  };

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1,
                background: 'linear-gradient(45deg, #2e7d32 30%, #66bb6a 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Sprints
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Manage sprint cycles and track development progress
            </Typography>

            {/* Stats Cards */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  bgcolor: 'background.paper'
                }}
              >
                <Avatar sx={{ bgcolor: 'success.main', width: 40, height: 40 }}>
                  <DirectionsRunIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {sprints.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Sprints
                  </Typography>
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  bgcolor: 'background.paper'
                }}
              >
                <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                  <PlayArrowIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {sprints.filter(s => s.status === 'active').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Sprints
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateSprint}
            size="large"
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1.5,
              boxShadow: '0 4px 12px rgba(46, 125, 50, 0.3)',
              bgcolor: 'success.main',
              '&:hover': {
                bgcolor: 'success.dark',
                boxShadow: '0 6px 16px rgba(46, 125, 50, 0.4)',
              },
            }}
          >
            Create Sprint
          </Button>
        </Box>

        {/* Search and Filter */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Search sprints..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              minWidth: 300,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          <Tooltip title="Filter sprints">
            <IconButton sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Sprints Grid */}
      {sprints.length > 0 ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {sprints.map((sprint) => (
            <Card
              key={sprint.id}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                overflow: 'hidden',
                '&:hover': {
                  boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                  transform: 'translateY(-2px)',
                  borderColor: statusColors[sprint.status],
                },
              }}
              onClick={() => router.push(`/sprints/${sprint.id}`)}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                {/* Sprint Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Avatar
                        sx={{
                          bgcolor: statusColors[sprint.status],
                          width: 32,
                          height: 32,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        {getProjectKey(sprint.projectId)}
                      </Avatar>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {getProjectName(sprint.projectId)}
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {sprint.name}
                    </Typography>
                    <Chip
                      label={statusLabels[sprint.status]}
                      size="small"
                      sx={{
                        backgroundColor: statusColors[sprint.status],
                        color: 'white',
                        fontWeight: 500,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, sprint.id)}
                    sx={{
                      opacity: 0.7,
                      '&:hover': { opacity: 1 }
                    }}
                  >
                    <MoreIcon />
                  </IconButton>
                </Box>

                {/* Sprint Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.4,
                  }}
                >
                  {sprint.description}
                </Typography>

                {/* Sprint Goal */}
                {sprint.goal && (
                  <Box sx={{ mb: 2, p: 1.5, bgcolor: 'action.hover', borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main', textTransform: 'uppercase' }}>
                      Sprint Goal
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {sprint.goal}
                    </Typography>
                  </Box>
                )}

                {/* Progress */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Progress
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {sprint.completedPoints || 0} / {sprint.totalPoints || 0} pts
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={calculateProgress(sprint)}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        backgroundColor: statusColors[sprint.status],
                        background: `linear-gradient(45deg, ${statusColors[sprint.status]}, ${statusColors[sprint.status]}CC)`,
                      },
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                    {Math.round(calculateProgress(sprint))}% Complete
                  </Typography>
                </Box>

                {/* Sprint Timeline */}
                <Box sx={{ mb: 2, p: 1.5, bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Timeline
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {format(new Date(sprint.startDate), 'MMM dd')} - {format(new Date(sprint.endDate), 'MMM dd, yyyy')}
                  </Typography>
                </Box>

                {/* Team Members */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <GroupIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Team
                    </Typography>
                  </Box>
                  <AvatarGroup
                    max={4}
                    sx={{
                      '& .MuiAvatar-root': {
                        width: 28,
                        height: 28,
                        fontSize: '0.75rem',
                        border: '2px solid',
                        borderColor: 'background.paper',
                        boxShadow: 1,
                      }
                    }}
                  >
                    <Avatar sx={{ bgcolor: '#1976d2' }}>U1</Avatar>
                    <Avatar sx={{ bgcolor: '#2e7d32' }}>U2</Avatar>
                    <Avatar sx={{ bgcolor: '#ed6c02' }}>U3</Avatar>
                    <Avatar sx={{ bgcolor: '#d32f2f' }}>U4</Avatar>
                  </AvatarGroup>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        /* Empty State */
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No sprints yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Create your first sprint to start organizing your work
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="large"
            onClick={handleCreateSprint}
          >
            Create Sprint
          </Button>
        </Box>
      )}

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => console.log('View sprint')}>
          <ViewIcon sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleEditSprint}>
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteSprint} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Create/Edit Sprint Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isEditing ? 'Edit Sprint' : 'Create New Sprint'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <Input
              label="Sprint Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />
            <Input
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            <CustomSelect
              label="Project"
              value={formData.projectId}
              onChange={(e) => setFormData({ ...formData, projectId: e.target.value as string })}
              options={projects.map(project => ({
                value: project.id,
                label: `${project.key} - ${project.name}`,
              }))}
              fullWidth
            />
            <CustomSelect
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Sprint['status'] })}
              options={[
                { value: 'planning', label: 'Planning' },
                { value: 'active', label: 'Active' },
                { value: 'completed', label: 'Completed' },
                { value: 'cancelled', label: 'Cancelled' },
              ]}
              fullWidth
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <DatePicker
                label="Start Date"
                value={formData.startDate}
                onChange={(value) => setFormData({ ...formData, startDate: value })}
              />
              <DatePicker
                label="End Date"
                value={formData.endDate}
                onChange={(value) => setFormData({ ...formData, endDate: value })}
              />
            </Box>
            <Textarea
              label="Sprint Goal"
              value={formData.goal}
              onChange={(value) => setFormData({ ...formData, goal: value })}
              rows={3}
              placeholder="Describe the main objective and goal for this sprint..."
              helperText="Define what the team aims to achieve by the end of this sprint"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSaveSprint}
            disabled={!formData.name.trim() || !formData.projectId}
          >
            {isEditing ? 'Update' : 'Create'} Sprint
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
