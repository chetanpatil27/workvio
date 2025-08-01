'use client';

import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface SprintMenuProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const SprintMenu: React.FC<SprintMenuProps> = ({
  anchorEl,
  onClose,
  onView,
  onEdit,
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
        Edit
      </MenuItem>
      <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
        <DeleteIcon sx={{ mr: 1 }} />
        Delete
      </MenuItem>
    </Menu>
  );
};

export default SprintMenu;
