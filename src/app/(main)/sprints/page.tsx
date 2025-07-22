'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

export default function SprintsPage() {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Sprints
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your sprints and track sprint progress
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
        >
          Create Sprint
        </Button>
      </Box>

      {/* Empty State */}
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
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
        >
          Create Sprint
        </Button>
      </Box>
    </Box>
  );
}
