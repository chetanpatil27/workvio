'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Chip,
  IconButton,
  Paper,
} from '@mui/material';
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
    <Box>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Welcome back, {user?.name || 'User'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here&apos;s what&apos;s happening with your projects today.
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { 
          xs: '1fr', 
          sm: 'repeat(2, 1fr)', 
          lg: 'repeat(4, 1fr)' 
        },
        gap: { xs: 2, sm: 3 },
        mb: { xs: 3, sm: 4 }
      }}>
        <Card sx={{ 
          height: '100%',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: (theme) => theme.shadows[4],
          },
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  width: 48,
                  height: 48,
                  mr: 2,
                }}
              >
                <ProjectIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {activeProjects}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Projects
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ 
          height: '100%',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: (theme) => theme.shadows[4],
          },
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar
                sx={{
                  backgroundColor: 'success.main',
                  width: 48,
                  height: 48,
                  mr: 2,
                }}
              >
                <TaskIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {totalTickets}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Tickets
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ 
          height: '100%',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: (theme) => theme.shadows[4],
          },
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar
                sx={{
                  backgroundColor: 'warning.main',
                  width: 48,
                  height: 48,
                  mr: 2,
                }}
              >
                <TrendingIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {inProgressTickets}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  In Progress
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ 
          height: '100%',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: (theme) => theme.shadows[4],
          },
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar
                sx={{
                  backgroundColor: 'info.main',
                  width: 48,
                  height: 48,
                  mr: 2,
                }}
              >
                <BugIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {Math.round(completionRate)}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completion Rate
                </Typography>
              </Box>
            </Box>
            <LinearProgress
              variant="determinate"
              value={completionRate}
              sx={{ 
                height: 6, 
                borderRadius: 3,
                mt: 2,
              }}
            />
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
        gap: { xs: 2, sm: 3 }
      }}>
        {/* Recent Projects */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Recent Projects
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {recentProjects.length === 0 ? (
                <Typography color="text.secondary">
                  No projects yet. Create your first project!
                </Typography>
              ) : (
                recentProjects.map((project) => (
                  <Paper
                    key={project.id}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      backgroundColor: 'background.paper',
                      border: 1,
                      borderColor: 'divider',
                    }}
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
                  </Paper>
                ))
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Recent Activity
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {recentTickets.length === 0 ? (
                <Typography color="text.secondary">
                  No recent activity. Start by creating some tickets!
                </Typography>
              ) : (
                recentTickets.map((ticket) => (
                  <Paper
                    key={ticket.id}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      backgroundColor: 'background.paper',
                      border: 1,
                      borderColor: 'divider',
                    }}
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
                  </Paper>
                ))
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
