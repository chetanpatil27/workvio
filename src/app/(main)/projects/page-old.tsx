'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import ProjectHeader from './components/project-header';
import ProjectSearchFilters from './components/project-search-filters';
import ProjectList from './components/project-list';
import ProjectMenu from './components/project-menu';
import CreateProjectModal from '@/components/project/create-project-modal';
import { useProject } from './hooks/use-project';

export default function ProjectsPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Main project logic
  const {
    projects,
    projectStats,
    selectedProject,
    searchTerm,
    setSearchTerm,
    selectedTab,
    setSelectedTab,
    filterStatus,
    setFilterStatus,
    anchorEl,
    handleMenuClick,
    handleMenuClose,
    handleViewProject,
    handleDeleteProject,
    getProjectProgress,
    getProjectSprints,
  } = useProject();

  // Handle create project
  const handleCreateProject = () => {
    setCreateModalOpen(true);
  };

  // Handle edit project (placeholder for now)
  const handleEditProject = () => {
    // TODO: Implement edit functionality
    console.log('Edit project:', selectedProject);
  };

  // Handle archive project (placeholder for now)
  const handleArchiveProject = () => {
    // TODO: Implement archive functionality
    console.log('Archive project:', selectedProject);
  };

  return (
    <Box>
      {/* Header with Stats and Tabs */}
      <ProjectHeader
        stats={projectStats}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        onCreateProject={handleCreateProject}
      />

      {/* Search and Filters */}
      <ProjectSearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />

      {/* Project List */}
      <ProjectList
        projects={projects}
        getProjectProgress={getProjectProgress}
        getProjectSprints={getProjectSprints}
        onProjectClick={handleViewProject}
        onMenuClick={handleMenuClick}
        onCreateProject={handleCreateProject}
      />

      {/* Context Menu */}
      <ProjectMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onView={() => selectedProject && handleViewProject(selectedProject.id)}
        onEdit={handleEditProject}
        onArchive={handleArchiveProject}
        onDelete={handleDeleteProject}
      />

      {/* Create Project Modal */}
      <CreateProjectModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </Box>
  );
}
  const projects = useSelector((state: RootState) => state.project.projects);

  // Filter projects based on search and selected tab
  const filteredProjects = projects.filter(project => {
    // Search filter
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Tab filter
    let matchesTab = true;
    if (selectedTab === 1) { // Active/In Progress tab
      matchesTab = ['active', 'inprogress', 'planning'].includes(project.status);
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

  // Status color helpers for Taskora design
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'linear-gradient(90deg, #4caf50, #66bb6a)';
      case 'inprogress': return 'linear-gradient(90deg, #2196f3, #42a5f5)';
      case 'planning': return 'linear-gradient(90deg, #ff9800, #ffb74d)';
      case 'onhold': return 'linear-gradient(90deg, #9e9e9e, #bdbdbd)';
      case 'active': return 'linear-gradient(90deg, #4caf50, #66bb6a)';
      case 'on-hold': return 'linear-gradient(90deg, #ff9800, #ffb74d)';
      case 'inactive': return 'linear-gradient(90deg, #9e9e9e, #bdbdbd)';
      case 'archived': return 'linear-gradient(90deg, #757575, #9e9e9e)';
      default: return 'linear-gradient(90deg, #2196f3, #42a5f5)';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'inprogress': return 'In Progress';
      case 'planning': return 'Planning';
      case 'onhold': return 'On Hold';
      case 'active': return 'Active';
      case 'on-hold': return 'On Hold';
      case 'inactive': return 'Inactive';
      case 'archived': return 'Archived';
      default: return 'Active';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'completed': return 'rgba(76, 175, 80, 0.1)';
      case 'inprogress': return 'rgba(33, 150, 243, 0.1)';
      case 'planning': return 'rgba(255, 152, 0, 0.1)';
      case 'onhold': return 'rgba(158, 158, 158, 0.1)';
      case 'active': return 'rgba(76, 175, 80, 0.1)';
      case 'on-hold': return 'rgba(255, 152, 0, 0.1)';
      case 'inactive': return 'rgba(158, 158, 158, 0.1)';
      case 'archived': return 'rgba(117, 117, 117, 0.1)';
      default: return 'rgba(33, 150, 243, 0.1)';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'completed': return '#2e7d32';
      case 'inprogress': return '#1565c0';
      case 'planning': return '#e65100';
      case 'onhold': return '#424242';
      case 'active': return '#2e7d32';
      case 'on-hold': return '#e65100';
      case 'inactive': return '#424242';
      case 'archived': return '#424242';
      default: return '#1565c0';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return '#4caf50';
    if (progress >= 75) return '#2196f3';
    if (progress >= 50) return '#ff9800';
    if (progress >= 25) return '#ffc107';
    return '#9e9e9e';
  };

  const getPriorityBgColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'rgba(244, 67, 54, 0.1)';
      case 'Medium': return 'rgba(255, 193, 7, 0.1)';
      case 'Low': return 'rgba(76, 175, 80, 0.1)';
      default: return 'rgba(158, 158, 158, 0.1)';
    }
  };

  const getPriorityTextColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#d32f2f';
      case 'Medium': return '#f57c00';
      case 'Low': return '#388e3c';
      default: return '#757575';
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

  // Calculate project statistics for new status values
  const activeProjects = projects.filter(p => ['active', 'inprogress', 'planning'].includes(p.status)).length;
  const pendingProjects = projects.filter(p => ['onhold', 'on-hold'].includes(p.status)).length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;

  return (
    <Box sx={{}}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        mb: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="filled"
            startIcon={<AddIcon />}
            onClick={() => setCreateModalOpen(true)}
          >
            New Project
          </Button>
        </Box>
      </Box>

      {/* Search and Filter Row */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        gap: 2
      }}>
        <TextField
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{
            width: 300,
            '& .MuiOutlinedInput-root': {
              borderRadius: '6px',
              bgcolor: 'background.default',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tabs
            value={selectedTab}
            onChange={(_, newValue) => setSelectedTab(newValue)}
            sx={{
              '& .MuiTab-root': {
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'none',
                minHeight: 40,
                px: 2,
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main',
                  fontWeight: 600,
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
                height: 2,
              }
            }}
          >
            <Tab label="All Projects" />
            <Tab label="In Progress" />
            <Tab label="Completed" />
          </Tabs>
        </Box>
      </Box>      {/* Stats Cards */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
        gap: 2.5,
        mb: 3
      }}>
        <CountCard
          value={projects.length}
          label="Total Projects"
          icon={<FolderIcon />}
          iconBgColor="rgba(25, 118, 210, 0.1)"
          iconColor="primary.main"
        />

        <CountCard
          value={activeProjects}
          label="Active Projects"
          icon={<TimeIcon />}
          iconBgColor="rgba(76, 175, 80, 0.1)"
          iconColor="success.main"
        />

        <CountCard
          value={pendingProjects}
          label="Pending"
          icon={<ScheduleIcon />}
          iconBgColor="rgba(255, 152, 0, 0.1)"
          iconColor="warning.main"
        />

        <CountCard
          value={completedProjects}
          label="Completed"
          icon={<CompleteIcon />}
          iconBgColor="rgba(103, 58, 183, 0.1)"
          iconColor="secondary.main"
        />
      </Box>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Card sx={{
          p: 6,
          textAlign: 'center',
          borderRadius: '6px',
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
              variant="filled"
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
          gap: 3
        }}>
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              onClick={() => router.push(`/projects/${project.id}`)}
              sx={{
                borderRadius: '6px',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Project Header with Side Color Bar */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, flex: 1 }}>
                    <Box
                      sx={{
                        width: 4,
                        height: 40,
                        borderRadius: 2,
                        background: getStatusColor(project.status),
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="h6" fontWeight="600" sx={{ fontSize: '1.1rem' }}>
                          {project.name}
                        </Typography>
                        {project.status === 'completed' && (
                          <Box sx={{ color: '#ffa726', fontSize: '1.2rem' }}>⭐</Box>
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', mb: 1 }}>
                        {project.description}
                      </Typography>
                      <Chip
                        label={getStatusLabel(project.status)}
                        size="small"
                        sx={{
                          bgcolor: getStatusBgColor(project.status),
                          color: getStatusTextColor(project.status),
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          borderRadius: 2,
                          height: 24,
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
                    sx={{ color: 'text.secondary', ml: 1 }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                {/* Deadline */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                  <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    Deadline: {project.dueDate ? formatDate(project.dueDate) : 'No deadline'}
                  </Typography>
                </Box>

                {/* Progress */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.85rem' }}>
                      Progress
                    </Typography>
                    <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.85rem' }}>
                      {project.progress || 0}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={project.progress || 0}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: 'rgba(0,0,0,0.08)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                        bgcolor: getProgressColor(project.progress || 0),
                      }
                    }}
                  />
                </Box>

                {/* Team Members */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <AvatarGroup
                    max={3}
                    sx={{
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        fontSize: '0.8rem',
                        border: '2px solid white',
                        fontWeight: 'bold',
                      }
                    }}
                  >
                    {(project.teamMembers || []).slice(0, 3).map((member, index) => (
                      <Avatar
                        key={index}
                        sx={{
                          bgcolor: getAvatarColor(member.name || `Member ${index}`),
                        }}
                      >
                        {(member.name || `M${index}`).charAt(0).toUpperCase()}
                      </Avatar>
                    ))}
                  </AvatarGroup>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                      {project.totalTasks || 0} tasks
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                      {project.activities || 0} activities
                    </Typography>
                  </Box>
                </Box>

                {/* Project Details Grid */}
                <Box sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 2,
                  pt: 2,
                  borderTop: '1px solid',
                  borderColor: 'divider'
                }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                      Client
                    </Typography>
                    <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.85rem' }}>
                      {project.client || 'Not specified'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                      Budget
                    </Typography>
                    <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.85rem' }}>
                      {project.budget || 'Not specified'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                      Start Date
                    </Typography>
                    <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.85rem' }}>
                      {project.startDate ? formatDate(project.startDate) : 'Not specified'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                      Priority
                    </Typography>
                    <Chip
                      label={project.priority || 'Medium'}
                      size="small"
                      sx={{
                        bgcolor: getPriorityBgColor(project.priority || 'Medium'),
                        color: getPriorityTextColor(project.priority || 'Medium'),
                        fontWeight: 500,
                        fontSize: '0.7rem',
                        height: 20,
                        borderRadius: 8,
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}      {/* Context Menu */}
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
            borderRadius: '6px',
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
