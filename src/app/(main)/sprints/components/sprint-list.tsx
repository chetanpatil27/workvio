'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Button from '@/components/form-controls/button';
import SprintCard from './sprint-card';
import { Sprint } from '@/store/slices/sprint';
import { Add as AddIcon } from '@mui/icons-material';

interface SprintListProps {
  sprints: Sprint[];
  getProjectName: (projectId: string) => string;
  calculateProgress: (sprint: Sprint) => number;
  onSprintClick: (sprintId: string) => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, sprintId: string) => void;
  onCreateSprint: () => void;
}

const SprintList: React.FC<SprintListProps> = ({
  sprints,
  getProjectName,
  calculateProgress,
  onSprintClick,
  onMenuClick,
  onCreateSprint,
}) => {
  if (sprints.length === 0) {
    return (
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
          variant="filled"
          startIcon={<AddIcon />}
          size="lg"
          onClick={onCreateSprint}
        >
          New Sprint
        </Button>
      </Box>
    );
  }

  return (
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
        <SprintCard
          key={sprint.id}
          sprint={sprint}
          projectName={getProjectName(sprint.projectId)}
          progress={calculateProgress(sprint)}
          onCardClick={() => onSprintClick(sprint.id)}
          onMenuClick={(e) => onMenuClick(e, sprint.id)}
        />
      ))}
    </Box>
  );
};

export default SprintList;
