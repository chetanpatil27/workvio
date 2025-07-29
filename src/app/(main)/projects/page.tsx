'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  AvatarGroup,
  LinearProgress,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import Button from '@/components/form-controls/button';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  FolderOpen as FolderIcon,
  CalendarToday as CalendarIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  AccessTime as TimeIcon,
  CheckCircle as CompleteIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { RootState } from '@/store';
import { addProject } from '@/store/slices/project';
import CreateProjectModal from '@/components/project/create-project-modal';

export default function ProjectsPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);

  const dispatch = useDispatch();
  const router = useRouter();
  const projects = useSelector((state: RootState) => state.project.projects);

  // Filter projects based on search and selected tab
  const filteredProjects = projects.filter(project => {
    // Search filter
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Tab filter
    let matchesTab = true;
    if (selectedTab === 1) { // Active tab
      matchesTab = project.status === 'active';
    } else if (selectedTab === 2) { // Completed tab
      matchesTab = project.status === 'completed';
    }
    // selectedTab === 0 shows all projects

    return matchesSearch && matchesTab;
  });

  const handleCreateProject = (data: {
    name: string;
    description: string;
    logo: File | null;
    teamMembers: Array<{ name: string; email?: string; role?: string }>;
  }) => {
    dispatch(addProject({
      id: Date.now().toString(),
      name: data.name,
      description: data.description || '',
      status: 'active',
      progress: 0,
      dueDate: new Date().toISOString(),
      teamMembers: data.teamMembers || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, projectId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(projectId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

  const getStatusColorHex = (status: string) => {
    switch (status) {
      case 'active': return '#4caf50';
      case 'on-hold': return '#ff9800';
      case 'completed': return '#2196f3';
      case 'inactive': return '#757575';
      case 'archived': return '#9e9e9e';
      default: return '#2196f3';
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = ['#1976d2', '#1565c0', '#0d47a1', '#42a5f5', '#1e88e5', '#2196f3'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate project statistics
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const pendingProjects = projects.filter(p => p.status === 'on-hold').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Enhanced Header with Taskora-style layout */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        mb: 3,
        gap: 2
      }}>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            fontWeight="700"
            gutterBottom
            sx={{
              color: 'text.primary',
              fontSize: { xs: '1.75rem', md: '2.125rem' },
              mb: 0.5
            }}
          >
            Projects
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: '0.95rem',
              fontWeight: 400,
              mb: { xs: 2, md: 0 }
            }}
          >
            Manage and track your project progress effectively
          </Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          gap: 1.5,
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* Filter Button */}
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
          >
            Filter
          </Button>

          {/* Sort Button */}
          <Button
            variant="outlined"
            startIcon={<SortIcon />}
          >
            Sort
          </Button>

          {/* Create Project Button */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setCreateModalOpen(true)}
          >
            New Project
          </Button>
        </Box>
      </Box>

      {/* Search and Tabs Section */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'stretch', md: 'center' },
        mb: 3,
        gap: 2
      }}>
        {/* Search Bar */}
        <Box sx={{ flex: 1, maxWidth: { xs: '100%', md: 400 } }}>
          <TextField
            placeholder="Search projects by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'background.paper',
                height: 44,
                fontSize: '0.875rem',
                '& fieldset': {
                  borderColor: 'divider',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  borderWidth: '2px',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary', fontSize: '1.1rem' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Project Status Tabs */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
          <Tabs
            value={selectedTab}
            onChange={(_, newValue) => setSelectedTab(newValue)}
            sx={{
              '& .MuiTab-root': {
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'none',
                minHeight: 44,
                px: 2,
                '&.Mui-selected': {
                  color: 'primary.main',
                  fontWeight: 600,
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
                height: 3,
                borderRadius: '3px 3px 0 0',
              }
            }}
          >
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  All Projects
                  <Chip
                    label={projects.length}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      bgcolor: selectedTab === 0 ? 'primary.main' : 'action.hover',
                      color: selectedTab === 0 ? 'white' : 'text.secondary',
                    }}
                  />
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Active
                  <Chip
                    label={projects.filter(p => p.status === 'active').length}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      bgcolor: selectedTab === 1 ? 'primary.main' : 'action.hover',
                      color: selectedTab === 1 ? 'white' : 'text.secondary',
                    }}
                  />
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Completed
                  <Chip
                    label={projects.filter(p => p.status === 'completed').length}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      bgcolor: selectedTab === 2 ? 'primary.main' : 'action.hover',
                      color: selectedTab === 2 ? 'white' : 'text.secondary',
                    }}
                  />
                </Box>
              }
            />
          </Tabs>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
        gap: 2.5,
        mb: 3
      }}>
        <Card sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              bgcolor: 'rgba(25, 118, 210, 0.1)',
              p: 1.5,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FolderIcon sx={{ color: 'primary.main', fontSize: '1.5rem' }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="600" color="text.primary">
                {projects.length}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                Total Projects
              </Typography>
            </Box>
          </Box>
        </Card>

        <Card sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              bgcolor: 'rgba(76, 175, 80, 0.1)',
              p: 1.5,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TimeIcon sx={{ color: 'success.main', fontSize: '1.5rem' }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="600" color="text.primary">
                {activeProjects}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                Active Projects
              </Typography>
            </Box>
          </Box>
        </Card>

        <Card sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              bgcolor: 'rgba(255, 152, 0, 0.1)',
              p: 1.5,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ScheduleIcon sx={{ color: 'warning.main', fontSize: '1.5rem' }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="600" color="text.primary">
                {pendingProjects}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                Pending
              </Typography>
            </Box>
          </Box>
        </Card>

        <Card sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              bgcolor: 'rgba(103, 58, 183, 0.1)',
              p: 1.5,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CompleteIcon sx={{ color: 'secondary.main', fontSize: '1.5rem' }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="600" color="text.primary">
                {completedProjects}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                Completed
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Card sx={{
          p: 6,
          textAlign: 'center',
          borderRadius: 2,
          border: '2px dashed',
          borderColor: 'divider',
          bgcolor: 'background.default'
        }}>
          <FolderIcon sx={{ fontSize: 56, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" fontWeight="600" gutterBottom sx={{ fontSize: '1.1rem' }}>
            {searchTerm ? 'No projects found' : 'No projects yet'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontSize: '0.9rem' }}>
            {searchTerm
              ? `No projects match "${searchTerm}". Try adjusting your search terms.`
              : 'Create your first project to get started with project management.'
            }
          </Typography>
          {!searchTerm && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setCreateModalOpen(true)}
            >
              Create Project
            </Button>
          )}
        </Card>
      ) : (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 2.5
        }}>
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              onClick={() => router.push(`/projects/${project.id}`)}
              sx={{
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 28px rgba(25, 118, 210, 0.15)',
                  borderColor: 'primary.main',
                  '& .project-card-overlay': {
                    opacity: 1,
                  },
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: `linear-gradient(90deg, ${getStatusColorHex(project.status)}, ${getStatusColorHex(project.status)}dd)`,
                  opacity: 0.8,
                }
              }}
            >
              <Box
                className="project-card-overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.03) 0%, rgba(25, 118, 210, 0.07) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                }}
              />

              <CardContent sx={{ p: 2.5, position: 'relative', zIndex: 1 }}>
                {/* Project Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      sx={{
                        bgcolor: getAvatarColor(project.name),
                        width: 40,
                        height: 40,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        boxShadow: '0 3px 8px rgba(0,0,0,0.12)',
                      }}
                    >
                      {project.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="600" sx={{ mb: 0.5, fontSize: '1rem' }}>
                        {project.name}
                      </Typography>
                      <Chip
                        label={project.status}
                        size="small"
                        sx={{
                          bgcolor: getStatusColorHex(project.status),
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.65rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          borderRadius: 1,
                          height: 20,
                          boxShadow: `0 2px 6px ${getStatusColorHex(project.status)}30`,
                        }}
                      />
                    </Box>
                  </Box>

                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuClick(e, project.id);
                    }}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.8)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid',
                      borderColor: 'divider',
                      width: 32,
                      height: 32,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        transform: 'scale(1.05)',
                      }
                    }}
                  >
                    <MoreVertIcon sx={{ fontSize: '1rem' }} />
                  </IconButton>
                </Box>

                {/* Project Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2.5,
                    minHeight: 32,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.4,
                    fontSize: '0.85rem'
                  }}
                >
                  {project.description || 'No description provided'}
                </Typography>

                {/* Progress */}
                <Box sx={{ mb: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.8rem' }}>
                      Progress
                    </Typography>
                    <Typography variant="body2" fontWeight="700" color="primary.main" sx={{ fontSize: '0.8rem' }}>
                      {project.progress || 0}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={project.progress || 0}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: 'rgba(0,0,0,0.06)',
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                        background: (project.progress || 0) === 100
                          ? 'linear-gradient(90deg, #4caf50, #66bb6a)'
                          : 'linear-gradient(90deg, #1976d2, #42a5f5)',
                        transition: 'transform 0.4s ease',
                      }
                    }}
                  />
                </Box>

                {/* Footer */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary" fontWeight="500" sx={{ fontSize: '0.75rem' }}>
                      Due {project.dueDate ? formatDate(project.dueDate) : 'No due date'}
                    </Typography>
                  </Box>

                  <AvatarGroup
                    max={3}
                    sx={{
                      '& .MuiAvatar-root': {
                        width: 24,
                        height: 24,
                        fontSize: '0.7rem',
                        border: '2px solid white',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                      }
                    }}
                  >
                    {project.teamMembers?.slice(0, 3).map((member: { name: string; email?: string; role?: string }, index: number) => (
                      <Avatar
                        key={index}
                        sx={{
                          bgcolor: getAvatarColor(member.name || `Member ${index}`),
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                        }}
                      >
                        {(member.name || `M${index}`).charAt(0)}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            border: '1px solid',
            borderColor: 'divider',
            minWidth: 160,
          }
        }}
      >
        <MenuItem
          onClick={() => {
            if (selectedProject) {
              router.push(`/projects/${selectedProject}`);
            }
            handleMenuClose();
          }}
          sx={{
            py: 1.2,
            px: 2,
            fontSize: '0.9rem',
            '&:hover': { bgcolor: 'primary.light', color: 'primary.main' }
          }}
        >
          <VisibilityIcon sx={{ mr: 1.5, fontSize: '1.1rem' }} />
          View Details
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            py: 1.2,
            px: 2,
            fontSize: '0.9rem',
            '&:hover': { bgcolor: 'primary.light', color: 'primary.main' }
          }}
        >
          <EditIcon sx={{ mr: 1.5, fontSize: '1.1rem' }} />
          Edit Project
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedProject) {
              console.log('Delete project:', selectedProject);
            }
            handleMenuClose();
          }}
          sx={{
            py: 1.2,
            px: 2,
            fontSize: '0.9rem',
            color: 'error.main',
            '&:hover': { bgcolor: 'error.light', color: 'error.dark' }
          }}
        >
          <DeleteIcon sx={{ mr: 1.5, fontSize: '1.1rem' }} />
          Delete Project
        </MenuItem>
      </Menu>

      {/* Create Project Modal */}
      <CreateProjectModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </Box>
  );
}
