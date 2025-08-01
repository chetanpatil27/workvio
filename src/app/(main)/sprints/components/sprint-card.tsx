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
import { Sprint } from '@/store/slices/sprint';
import { format } from 'date-fns';
import { statusColors, statusLabels } from '../constants/sprint-status';

interface SprintCardProps {
  sprint: Sprint;
  projectName: string;
  progress: number;
  onCardClick: () => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const SprintCard: React.FC<SprintCardProps> = ({
  sprint,
  projectName,
  progress,
  onCardClick,
  onMenuClick,
}) => {
  const calculateDuration = (startDate: string, endDate: string) => {
    return Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
  };

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
          borderColor: statusColors[sprint.status],
        },
      }}
      onClick={onCardClick}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Sprint Header with Side Color Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, flex: 1 }}>
            <Box
              sx={{
                width: 4,
                height: 40,
                borderRadius: '6px',
                bgcolor: statusColors[sprint.status],
                flexShrink: 0,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography variant="h6" fontWeight="600" sx={{ fontSize: '1.1rem' }}>
                  {sprint.name}
                </Typography>
                {sprint.status === 'completed' && (
                  <Box sx={{ color: '#ffa726', fontSize: '1.2rem' }}>⭐</Box>
                )}
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', mb: 1 }}>
                {projectName}
              </Typography>
              <Chip
                label={statusLabels[sprint.status]}
                size="small"
                sx={{
                  bgcolor: `${statusColors[sprint.status]}20`,
                  color: statusColors[sprint.status],
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  borderRadius: 8,
                  height: 24,
                }}
              />
            </Box>
          </Box>

          <IconButton
            data-menu-button="true"
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

        {/* Sprint Dates */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
          <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
            {format(new Date(sprint.startDate), 'MMM dd')} - {format(new Date(sprint.endDate), 'MMM dd, yyyy')}
          </Typography>
        </Box>

        {/* Sprint Description */}
        {sprint.description && (
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
            {sprint.description}
          </Typography>
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
                bgcolor: statusColors[sprint.status],
              }
            }}
          />
        </Box>

        {/* Sprint Details Grid */}
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
              Sprint Points
            </Typography>
            <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.85rem' }}>
              {sprint.completedPoints || 0} / {sprint.totalPoints || 0}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
              Duration
            </Typography>
            <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.85rem' }}>
              {calculateDuration(sprint.startDate, sprint.endDate)} days
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
            <Avatar sx={{ bgcolor: '#1976d2' }}>U1</Avatar>
            <Avatar sx={{ bgcolor: '#2e7d32' }}>U2</Avatar>
            <Avatar sx={{ bgcolor: '#ed6c02' }}>U3</Avatar>
            <Avatar sx={{ bgcolor: '#d32f2f' }}>U4</Avatar>
          </AvatarGroup>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SprintCard;
