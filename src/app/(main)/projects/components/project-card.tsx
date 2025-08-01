'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Avatar,
  AvatarGroup,
  IconButton,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  CalendarToday as CalendarIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { Project } from '@/store/slices/project';
import { format } from 'date-fns';
import { projectStatusColors, projectStatusLabels, projectPriorityColors } from '../constants/project-status';

interface ProjectCardProps {
  project: Project;
  progress: number;
  sprintCount: number;
  onCardClick: () => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  progress,
  sprintCount,
  onCardClick,
  onMenuClick,
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '6px',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
          transform: 'translateY(-2px)',
          borderColor: projectStatusColors[project.status],
        },
      }}
      onClick={onCardClick}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Project Header with Side Color Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, flex: 1 }}>
            <Box
              sx={{
                width: 4,
                height: 40,
                borderRadius: '6px',
                bgcolor: projectStatusColors[project.status],
                flexShrink: 0,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography variant="h6" fontWeight="600" sx={{ fontSize: '1.1rem' }}>
                  {project.name}
                </Typography>
                {project.key && (
                  <Chip
                    label={project.key}
                    size="small"
                    sx={{
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      height: 20,
                    }}
                  />
                )}
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Chip
                  label={projectStatusLabels[project.status]}
                  size="small"
                  sx={{
                    bgcolor: `${projectStatusColors[project.status]}20`,
                    color: projectStatusColors[project.status],
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    borderRadius: 8,
                    height: 24,
                  }}
                />
                {project.priority && (
                  <Chip
                    label={project.priority}
                    size="small"
                    sx={{
                      bgcolor: `${projectPriorityColors[project.priority]}20`,
                      color: projectPriorityColors[project.priority],
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      borderRadius: 8,
                      height: 24,
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onMenuClick(e);
            }}
            size="small"
            sx={{ color: 'text.secondary', ml: 1 }}
          >
            <MoreIcon />
          </IconButton>
        </Box>

        {/* Project Description */}
        {project.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              fontSize: '0.85rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.4,
            }}
          >
            {project.description}
          </Typography>
        )}

        {/* Project Dates */}
        {project.startDate && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
            <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
              {format(new Date(project.startDate), 'MMM dd, yyyy')}
              {project.dueDate && (
                <> - {format(new Date(project.dueDate), 'MMM dd, yyyy')}</>
              )}
            </Typography>
          </Box>
        )}

        {/* Progress */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
            <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.85rem' }}>
              Progress
            </Typography>
            <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.85rem' }}>
              {Math.round(progress)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: 'rgba(0,0,0,0.08)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
                bgcolor: projectStatusColors[project.status],
              }
            }}
          />
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
              Tasks
            </Typography>
            <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.85rem' }}>
              {project.completedTasks || 0} / {project.totalTasks || 0}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
              Sprints
            </Typography>
            <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.85rem' }}>
              {sprintCount}
            </Typography>
          </Box>
        </Box>

        {/* Team Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
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
            {project.teamMembers?.slice(0, 4).map((member, index) => (
              <Avatar key={index} sx={{ bgcolor: projectStatusColors[project.status] }}>
                {member.name.charAt(0).toUpperCase()}
              </Avatar>
            )) || (
              <>
                <Avatar sx={{ bgcolor: '#1976d2' }}>U1</Avatar>
                <Avatar sx={{ bgcolor: '#2e7d32' }}>U2</Avatar>
                <Avatar sx={{ bgcolor: '#ed6c02' }}>U3</Avatar>
              </>
            )}
          </AvatarGroup>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
