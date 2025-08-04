'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import CountCard from '@/components/common/count-card';
import Button from '@/components/form-controls/button';
import {
  FolderOpen as ProjectIcon,
  Assignment as TaskIcon,
  CheckCircle as CompletedIcon,
  TrendingUp as TrendingIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface DashboardHeaderProps {
  userName: string;
  stats: {
    totalProjects: number;
    activeProjects: number;
    totalTickets: number;
    completedTickets: number;
    activeSprints: number;
    completionRate: number;
  };
  onCreateProject: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  stats,
  onCreateProject,
}) => {
  return (
    <Box sx={{ mb: 4 }}>
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
            Welcome back, {userName}! 👋
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
          variant="filled"
          startIcon={<AddIcon />}
          onClick={onCreateProject}
          size="lg"
          color="success"
        >
          New Project
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(5, 1fr)' },
        gap: 2.5,
      }}>
        <CountCard
          value={stats.totalProjects}
          label="Total Projects"
          icon={<ProjectIcon />}
          iconBgColor="rgba(25, 118, 210, 0.1)"
          iconColor="primary.main"
        />

        <CountCard
          value={stats.activeProjects}
          label="Active Projects"
          icon={<ProjectIcon />}
          iconBgColor="rgba(76, 175, 80, 0.1)"
          iconColor="success.main"
        />

        <CountCard
          value={stats.totalTickets}
          label="Total Tickets"
          icon={<TaskIcon />}
          iconBgColor="rgba(255, 152, 0, 0.1)"
          iconColor="warning.main"
        />

        <CountCard
          value={stats.completedTickets}
          label="Completed Tickets"
          icon={<CompletedIcon />}
          iconBgColor="rgba(76, 175, 80, 0.1)"
          iconColor="success.main"
        />

        <CountCard
          value={`${Math.round(stats.completionRate)}%`}
          label="Completion Rate"
          icon={<TrendingIcon />}
          iconBgColor="rgba(103, 58, 183, 0.1)"
          iconColor="secondary.main"
        />
      </Box>
    </Box>
  );
};

export default DashboardHeader;
