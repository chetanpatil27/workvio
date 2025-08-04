'use client';

import React from 'react';
import { Box } from '@mui/material';
import DashboardHeader from './components/dashboard-header';
import RecentProjects from './components/recent-projects';
import RecentTickets from './components/recent-tickets';
import { useDashboard } from './hooks/use-dashboard';

export default function Dashboard() {
  const {
    user,
    dashboardStats,
    recentData,
    handleNavigateToProjects,
    handleNavigateToTickets,
    handleViewProject,
    handleViewTicket,
    getStatusColor,
  } = useDashboard();

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Dashboard Header with Stats */}
      <DashboardHeader
        userName={user?.name || 'User'}
        stats={dashboardStats}
        onCreateProject={handleNavigateToProjects}
      />

      {/* Dashboard Content Grid */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 3,
      }}>
        <RecentProjects
          projects={recentData.recentProjects}
          onViewProject={handleViewProject}
          onViewAllProjects={handleNavigateToProjects}
        />
        
        <RecentTickets
          tickets={recentData.recentTickets}
          onViewTicket={handleViewTicket}
          onViewAllTickets={handleNavigateToTickets}
          getStatusColor={getStatusColor}
        />
      </Box>
    </Box>
  );
}
