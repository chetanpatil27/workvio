'use client';

import React from 'react';
import ContextMenu, { MenuAction } from '@/components/common/context-menu';

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
      onClick: onView,
    },
    {
      id: 'edit',
      label: 'Edit Project',
      onClick: onEdit,
    },
    {
      id: 'archive',
      label: 'Archive',
      onClick: onArchive,
      divider: true, // Add divider before delete action
    },
    {
      id: 'delete',
      label: 'Delete',
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
