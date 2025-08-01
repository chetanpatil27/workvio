'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material';
import {
  FolderOpen as ProjectIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';

interface Project {
  id: string;
  name: string;
  status: string;
  progress?: number;
}

interface RecentProjectsProps {
  projects: Project[];
  onViewProject: (projectId: string) => void;
  onViewAllProjects: () => void;
}

const RecentProjects: React.FC<RecentProjectsProps> = ({
  projects,
  onViewProject,
  onViewAllProjects,
}) => {
  const getProjectStatusColor = (status: string): 'success' | 'info' | 'warning' | 'default' => {
    switch (status) {
      case 'active':
        return 'success';
      case 'completed':
        return 'info';
      case 'on-hold':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="600">
            Recent Projects
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            onClick={onViewAllProjects}
          >
            View All
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <Box
                key={project.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    borderColor: 'primary.main',
                  },
                }}
                onClick={() => onViewProject(project.id)}
              >
                <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                  <ProjectIcon />
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" fontWeight="600">
                    {project.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Chip
                      label={project.status}
                      size="small"
                      color={getProjectStatusColor(project.status)}
                      variant="outlined"
                    />
                    {project.progress && (
                      <Typography variant="caption" color="text.secondary">
                        {project.progress}% complete
                      </Typography>
                    )}
                  </Box>
                </Box>
                <IconButton size="small">
                  <MoreIcon />
                </IconButton>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
              No recent projects found
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentProjects;
