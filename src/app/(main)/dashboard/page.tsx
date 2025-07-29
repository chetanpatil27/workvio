'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material';
import Button from '@/components/form-controls/button';
import {
  FolderOpen as ProjectIcon,
  BugReport as BugIcon,
  Task as TaskIcon,
  Assignment as StoryIcon,
  TrendingUp as TrendingIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { projects } = useSelector((state: RootState) => state.project);
  const { tickets } = useSelector((state: RootState) => state.ticket);

  // Calculate statistics
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const totalTickets = tickets.length;
  const completedTickets = tickets.filter(t => t.status === 'completed').length;
  const inProgressTickets = tickets.filter(t => t.status === 'inprogress').length;
  const completionRate = totalTickets > 0 ? (completedTickets / totalTickets) * 100 : 0;

  const recentProjects = projects.slice(0, 3);
  const recentTickets = tickets
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const getTicketIcon = (type: string) => {
    switch (type) {
      case 'bug':
        return <BugIcon color="error" />;
      case 'story':
        return <StoryIcon color="info" />;
      default:
        return <TaskIcon color="primary" />;
    }
  };

  const getStatusColor = (status: string): 'success' | 'warning' | 'info' | 'default' => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'inprogress':
        return 'warning';
      case 'qa':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Enhanced Welcome Section */}
      <Box sx={{
        mb: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 0 }
      }}>
        <Box>
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{
              color: 'text.primary',
              fontSize: { xs: '1.75rem', md: '2.125rem' },
              mb: 1
            }}
          >
            Welcome back, {user?.name || 'User'}! 👋
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: '1rem',
              fontWeight: 400
            }}
          >
            Here&apos;s what&apos;s happening with your projects today
          </Typography>
        </Box>
        <Button
          color="success"
          variant="filled"
          size="md"
          onClick={() => window.location.href = '/projects'}
        >
          Create Project
        </Button>
      </Box>

      {/* Enhanced Statistics Cards */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)'
        },
        gap: 2.5,
        mb: 4
      }}>
        {/* Active Projects Card */}
        <Card
          elevation={0}
          sx={{
            p: 3,
            borderRadius: '6px',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            transition: 'box-shadow 0.2s',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: '6px',
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                mr: 2,
              }}
            >
              <ProjectIcon sx={{ fontSize: '1.5rem', color: '#1976d2' }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="700" sx={{ lineHeight: 1, color: 'text.primary' }}>
                {activeProjects}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                Active Projects
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Total Tickets Card */}
        <Card
          elevation={0}
          sx={{
            p: 3,
            borderRadius: '6px',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            transition: 'box-shadow 0.2s',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: '6px',
                bgcolor: 'rgba(46, 125, 50, 0.1)',
                mr: 2,
              }}
            >
              <TaskIcon sx={{ fontSize: '1.5rem', color: '#2e7d32' }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="700" sx={{ lineHeight: 1, color: 'text.primary' }}>
                {totalTickets}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                Total Tickets
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* In Progress Tickets Card */}
        <Card
          elevation={0}
          sx={{
            p: 3,
            borderRadius: '6px',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            transition: 'box-shadow 0.2s',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: '6px',
                bgcolor: 'rgba(237, 108, 2, 0.1)',
                mr: 2,
              }}
            >
              <TrendingIcon sx={{ fontSize: '1.5rem', color: '#ed6c02' }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="700" sx={{ lineHeight: 1, color: 'text.primary' }}>
                {inProgressTickets}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                In Progress
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Completion Rate Card */}
        <Card
          elevation={0}
          sx={{
            p: 3,
            borderRadius: '6px',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            transition: 'box-shadow 0.2s',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: '6px',
                bgcolor: 'rgba(123, 31, 162, 0.1)',
                mr: 2,
              }}
            >
              <StoryIcon sx={{ fontSize: '1.5rem', color: '#7b1fa2' }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="700" sx={{ lineHeight: 1, color: 'text.primary' }}>
                {Math.round(completionRate)}%
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                Completion Rate
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
        gap: { xs: 2, sm: 3 }
      }}>
        {/* Recent Projects */}
        <Card
          elevation={0}
          sx={{
            borderRadius: '6px',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            transition: 'box-shadow 0.2s',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Projects
              </Typography>
              <Button
                color="primary"
                variant="outlined"
                size="sm"
                onClick={() => window.location.href = '/projects'}
              >
                View All
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {recentProjects.length === 0 ? (
                <Typography color="text.secondary">
                  No projects yet. Create your first project!
                </Typography>
              ) : (
                recentProjects.map((project) => (
                  <Card
                    key={project.id}
                    elevation={0}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      borderRadius: '6px',
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        transform: 'translateY(-2px)',
                        borderColor: 'primary.main'
                      }
                    }}
                    onClick={() => window.location.href = `/projects/${project.id}`}
                  >
                    <Avatar
                      sx={{
                        backgroundColor: project.color,
                        width: 40,
                        height: 40,
                        fontSize: '1rem',
                      }}
                    >
                      {project.key}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {project.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project.description}
                      </Typography>
                    </Box>
                    <Chip
                      label={project.status}
                      size="small"
                      color={project.status === 'active' ? 'success' : 'default'}
                    />
                  </Card>
                ))
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card
          elevation={0}
          sx={{
            borderRadius: '6px',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            transition: 'box-shadow 0.2s',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Activity
              </Typography>
              <Button
                color="info"
                variant="outlined"
                size="sm"
                onClick={() => window.location.href = '/sprints'}
              >
                View All
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {recentTickets.length === 0 ? (
                <Typography color="text.secondary">
                  No recent activity. Start by creating some tickets!
                </Typography>
              ) : (
                recentTickets.map((ticket) => (
                  <Card
                    key={ticket.id}
                    elevation={0}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      borderRadius: '6px',
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        transform: 'translateY(-2px)',
                        borderColor: 'info.main'
                      }
                    }}
                    onClick={() => window.location.href = `/tickets/${ticket.id}`}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getTicketIcon(ticket.type)}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                        {ticket.key} - {ticket.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {ticket.description.length > 60
                          ? `${ticket.description.substring(0, 60)}...`
                          : ticket.description}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                      <Chip
                        label={ticket.status}
                        size="small"
                        color={getStatusColor(ticket.status)}
                      />
                      <IconButton size="small">
                        <MoreIcon />
                      </IconButton>
                    </Box>
                  </Card>
                ))
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
