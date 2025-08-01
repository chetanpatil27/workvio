'use client';

import React from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import CountCard from '@/components/common/count-card';
import Button from '@/components/form-controls/button';
import {
  Add as AddIcon,
  FolderOpen as FolderIcon,
  CheckCircle as CompleteIcon,
  Schedule as ScheduleIcon,
  Archive as ArchiveIcon,
} from '@mui/icons-material';

interface ProjectHeaderProps {
  stats: {
    total: number;
    active: number;
    completed: number;
    archived: number;
  };
  selectedTab: number;
  onTabChange: (value: number) => void;
  onCreateProject: () => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ 
  stats, 
  selectedTab, 
  onTabChange, 
  onCreateProject 
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: 'text.primary',
              fontSize: '1.75rem'
            }}
          >
            Project Management
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Organize and manage your development projects
          </Typography>

          {/* Stats Cards */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
            gap: 2.5,
            mb: 3
          }}>
            <CountCard
              value={stats.total}
              label="Total Projects"
              icon={<FolderIcon />}
              iconBgColor="rgba(25, 118, 210, 0.1)"
              iconColor="primary.main"
            />

            <CountCard
              value={stats.active}
              label="Active Projects"
              icon={<ScheduleIcon />}
              iconBgColor="rgba(76, 175, 80, 0.1)"
              iconColor="success.main"
            />

            <CountCard
              value={stats.completed}
              label="Completed"
              icon={<CompleteIcon />}
              iconBgColor="rgba(25, 118, 210, 0.1)"
              iconColor="primary.main"
            />

            <CountCard
              value={stats.archived}
              label="Archived"
              icon={<ArchiveIcon />}
              iconBgColor="rgba(158, 158, 158, 0.1)"
              iconColor="text.secondary"
            />
          </Box>
        </Box>

        <Button
          variant="filled"
          startIcon={<AddIcon />}
          onClick={onCreateProject}
          size="lg"
          color="success"
        >
          New Project
        </Button>
      </Box>

      {/* Project Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => onTabChange(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Projects" />
          <Tab label="Active" />
          <Tab label="Completed" />
          <Tab label="Archived" />
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProjectHeader;
