'use client';

import React from 'react';
import ContextMenu, { MenuAction } from '@/components/common/context-menu';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
} from '@mui/icons-material';

interface ProjectMenuProps {
  onView: () => void;
  onEdit: () => void;
  onArchive: () => void;
  onDelete: () => void;
}

const ProjectMenu: React.FC<ProjectMenuProps> = ({
  onView,
  onEdit,
  onArchive,
  onDelete,
}) => {
  const menuActions: MenuAction[] = [
    {
      id: 'view',
      label: 'View Details',
      icon: <ViewIcon />,
      onClick: onView,
    },
    {
      id: 'edit',
      label: 'Edit Project',
      icon: <EditIcon />,
      onClick: onEdit,
    },
    {
      id: 'archive',
      label: 'Archive',
      icon: <ArchiveIcon />,
      onClick: onArchive,
      divider: true, // Add divider before delete action
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <DeleteIcon />,
      onClick: onDelete,
      color: 'error',
    },
  ];

  return (
    <ContextMenu
      actions={menuActions}
    />
  );
};

export default ProjectMenu;
