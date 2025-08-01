'use client';

import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
} from '@mui/icons-material';

interface ProjectMenuProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
  onView: () => void;
  onEdit: () => void;
  onArchive: () => void;
  onDelete: () => void;
}

const ProjectMenu: React.FC<ProjectMenuProps> = ({
  anchorEl,
  onClose,
  onView,
  onEdit,
  onArchive,
  onDelete,
}) => {
  const handleView = () => {
    onView();
    onClose();
  };

  const handleEdit = () => {
    onEdit();
    onClose();
  };

  const handleArchive = () => {
    onArchive();
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={handleView}>
        <ViewIcon sx={{ mr: 1 }} />
        View Details
      </MenuItem>
      <MenuItem onClick={handleEdit}>
        <EditIcon sx={{ mr: 1 }} />
        Edit Project
      </MenuItem>
      <MenuItem onClick={handleArchive}>
        <ArchiveIcon sx={{ mr: 1 }} />
        Archive
      </MenuItem>
      <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
        <DeleteIcon sx={{ mr: 1 }} />
        Delete
      </MenuItem>
    </Menu>
  );
};

export default ProjectMenu;
