'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Button from '@/components/form-controls/button';
import ProjectCard from './project-card';
import { Project } from '@/store/slices/project';
import { Sprint } from '@/store/slices/sprint';
import { Add as AddIcon } from '@mui/icons-material';

interface ProjectListProps {
  projects: Project[];
  getProjectProgress: (projectId: string) => number;
  getProjectSprints: (projectId: string) => Sprint[];
  onProjectClick: (projectId: string) => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, projectId: string) => void;
  onCreateProject: () => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  getProjectProgress,
  getProjectSprints,
  onProjectClick,
  onMenuClick,
  onCreateProject,
}) => {
  if (projects.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          No projects yet
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Create your first project to start organizing your work
        </Typography>
        <Button
          variant="filled"
          startIcon={<AddIcon />}
          size="lg"
          onClick={onCreateProject}
        >
          New Project
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
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          progress={getProjectProgress(project.id)}
          sprintCount={getProjectSprints(project.id).length}
          onCardClick={() => onProjectClick(project.id)}
          onMenuClick={(e) => onMenuClick(e, project.id)}
        />
      ))}
    </Box>
  );
};

export default ProjectList;
