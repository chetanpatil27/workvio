'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { Designation } from '@/store/slices/designation';
import { format } from 'date-fns';

interface DesignationCardProps {
  designation: Designation;
  onCardClick: () => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const DesignationCard: React.FC<DesignationCardProps> = ({
  designation,
  onCardClick,
  onMenuClick,
}) => {
  const statusColor = designation.active ? '#4caf50' : '#f44336';
  const statusBgColor = designation.active ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)';

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
          borderColor: statusColor,
        },
      }}
      onClick={onCardClick}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Designation Header with Side Color Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, flex: 1 }}>
            <Box
              sx={{
                width: 4,
                height: 40,
                borderRadius: '6px',
                bgcolor: statusColor,
                flexShrink: 0,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <WorkIcon sx={{ fontSize: 20, color: statusColor }} />
                <Typography variant="h6" fontWeight="600" sx={{ fontSize: '1.1rem' }}>
                  {designation.name}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Chip
                  label={designation.active ? 'Active' : 'Inactive'}
                  size="small"
                  sx={{
                    bgcolor: statusBgColor,
                    color: statusColor,
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    borderRadius: 8,
                    height: 24,
                  }}
                />
              </Box>
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

        {/* Designation Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            fontSize: '0.85rem',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
            minHeight: '3.6em', // Reserve space for 3 lines
          }}
        >
          {designation.description || 'No description provided'}
        </Typography>

        {/* Creation Date */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
          <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
            Created: {format(new Date(designation.createdAt), 'MMM dd, yyyy')}
          </Typography>
        </Box>

        {/* Status Details */}
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
              Status
            </Typography>
            <Typography
              variant="body2"
              fontWeight="500"
              sx={{
                fontSize: '0.85rem',
                color: statusColor
              }}
            >
              {designation.active ? 'Active' : 'Inactive'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
              Last Updated
            </Typography>
            <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.85rem' }}>
              {format(new Date(designation.updatedAt), 'MMM dd')}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DesignationCard;
