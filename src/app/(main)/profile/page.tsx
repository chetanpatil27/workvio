'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Security as SecurityIcon,
  Assignment as TaskIcon,
  CheckCircle as CompletedIcon,
  Work as ProjectIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useTheme } from '@/components/providers/theme-provider';

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { projects } = useSelector((state: RootState) => state.project);
  const { tickets } = useSelector((state: RootState) => state.ticket);
  const { darkMode } = useTheme();

  // Sample data - replace with actual data from state  
  const userProjects = projects.filter((project) => project.members?.includes(user?.id || ''));
  const userTickets = tickets.filter((ticket) => ticket.assigneeId === user?.id);
  const completedTickets = userTickets.filter((ticket) => ticket.status === 'completed');
  const completionRate = userTickets.length > 0 ? (completedTickets.length / userTickets.length) * 100 : 0;

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: darkMode ? 'background.default' : 'grey.50',
      py: { xs: 2, sm: 3 },
      px: { xs: 1, sm: 2, md: 3 }
    }}>
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 2.5, md: 3 }
      }}>
        {/* Personal Information Card - Full Width */}
        <Card
          elevation={0}
          sx={{
            borderRadius: '6px',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2.5, md: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Personal Information
              </Typography>
              <IconButton size="small">
                <EditIcon />
              </IconButton>
            </Box>

            <Box sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)'
              },
              gap: { xs: 2, sm: 2.5, md: 3 }
            }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                  Full Name
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  {user.name}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                  Email Address
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, color: 'text.secondary' }} />
                  <Typography variant="body1" sx={{ fontWeight: 500, fontSize: { xs: '0.9rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                    {user.email}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                  Role
                </Typography>
                <Chip
                  label={user.role}
                  size="small"
                  color="primary"
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    fontSize: { xs: '0.7rem', sm: '0.75rem' }
                  }}
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                  Member Since
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarIcon sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, color: 'text.secondary' }} />
                  <Typography variant="body1" sx={{ fontWeight: 500, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Two Column Layout for Profile and Account Info */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' },
          gap: { xs: 2, sm: 2.5, md: 3 }
        }}>
          {/* Profile Overview Card */}
          <Card
            elevation={0}
            sx={{
              borderRadius: '6px',
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              overflow: 'hidden',
              height: 'fit-content',
            }}
          >
            {/* Profile Header with Gradient Background */}
            <Box
              sx={{
                background: darkMode
                  ? 'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                p: { xs: 2.5, sm: 3 },
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  opacity: 0.3,
                },
              }}
            >
              <Box sx={{ position: 'relative', textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: { xs: 70, sm: 80 },
                    height: { xs: 70, sm: 80 },
                    fontSize: { xs: '1.75rem', sm: '2rem' },
                    background: darkMode
                      ? 'linear-gradient(45deg, #3a3a3a 30%, #2a2a2a 90%)'
                      : 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
                    color: darkMode ? '#90caf9' : '#1976d2',
                    fontWeight: 700,
                    mx: 'auto',
                    mb: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                >
                  {user.name[0].toUpperCase()}
                </Avatar>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: 'white',
                    textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    mb: 0.5,
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  }}
                >
                  {user.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    mb: 2,
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    wordBreak: 'break-word',
                    px: 1,
                  }}
                >
                  {user.email}
                </Typography>
                <Chip
                  label={user.role}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                  }}
                />
              </Box>
            </Box>

            <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Quick Stats
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ProjectIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.2rem' }, color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                      Projects
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight="600" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    {userProjects.length}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TaskIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.2rem' }, color: 'warning.main' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                      Total Tasks
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight="600" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    {userTickets.length}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CompletedIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.2rem' }, color: 'success.main' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                      Completed
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight="600" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    {completedTickets.length}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                      Completion Rate
                    </Typography>
                    <Typography variant="body2" fontWeight="600" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                      {Math.round(completionRate)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={completionRate}
                    sx={{
                      height: { xs: 5, sm: 6 },
                      borderRadius: 3,
                      backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                        background: darkMode
                          ? 'linear-gradient(90deg, #66bb6a 0%, #81c784 100%)'
                          : 'linear-gradient(90deg, #4caf50 0%, #8bc34a 100%)',
                      },
                    }}
                  />
                </Box>
              </Box>

              <Button
                color="primary"
                variant="outlined"
                size="medium"
                sx={{ width: '100%', mt: { xs: 2.5, sm: 3 } }}
                startIcon={<EditIcon />}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Account Information Section */}
          <Card
            elevation={0}
            sx={{
              borderRadius: '6px',
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
              <Typography variant="h6" sx={{ mb: { xs: 2.5, md: 3 }, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Account Information
              </Typography>

              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: { xs: 2, sm: 2.5, md: 3 }
              }}>
                <Card
                  elevation={0}
                  sx={{
                    bgcolor: darkMode ? 'background.paper' : 'grey.50',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: darkMode ? 'divider' : 'grey.200',
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <SecurityIcon color="primary" sx={{ mr: 1, fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '0.95rem', sm: '1.1rem' } }}>
                        Security Settings
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                      Manage your account security and authentication preferences
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                          Two-Factor Authentication
                        </Typography>
                        <Chip
                          label="Disabled"
                          size="small"
                          color="warning"
                          variant="outlined"
                          sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                          Last Password Change
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                          3 months ago
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mt: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                      fullWidth
                    >
                      Security Settings
                    </Button>
                  </CardContent>
                </Card>

                <Card
                  elevation={0}
                  sx={{
                    bgcolor: darkMode ? 'background.paper' : 'grey.50',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: darkMode ? 'divider' : 'grey.200',
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <NotificationsIcon color="primary" sx={{ mr: 1, fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '0.95rem', sm: '1.1rem' } }}>
                        Preferences
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                      Configure your notification and display preferences
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                          Email Notifications
                        </Typography>
                        <Chip
                          label="Enabled"
                          size="small"
                          color="success"
                          variant="outlined"
                          sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                          Theme Preference
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                          Light Mode
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mt: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                      fullWidth
                    >
                      Manage Preferences
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}
