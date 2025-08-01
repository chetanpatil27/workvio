'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Button from '@/components/form-controls/button';
import DesignationCard from './designation-card';
import { Designation } from '@/store/slices/designation';
import { Add as AddIcon } from '@mui/icons-material';

interface DesignationListProps {
  designations: Designation[];
  onDesignationClick: (designationId: string) => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, designationId: string) => void;
  onCreateDesignation: () => void;
}

const DesignationList: React.FC<DesignationListProps> = ({
  designations,
  onDesignationClick,
  onMenuClick,
  onCreateDesignation,
}) => {
  if (designations.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          No designations yet
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Create your first designation to start organizing job roles
        </Typography>
        <Button
          variant="filled"
          startIcon={<AddIcon />}
          size="lg"
          onClick={onCreateDesignation}
        >
          New Designation
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
      {designations.map((designation) => (
        <DesignationCard
          key={designation.id}
          designation={designation}
          onCardClick={() => onDesignationClick(designation.id)}
          onMenuClick={(e) => onMenuClick(e, designation.id)}
        />
      ))}
    </Box>
  );
};

export default DesignationList;
