'use client';

import React from 'react';
import ContextMenu, { MenuAction } from '@/components/common/context-menu';

interface DesignationMenuProps {
  isActive: boolean;
  onView: () => void;
  onEdit: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
}

const DesignationMenu: React.FC<DesignationMenuProps> = ({
  isActive,
  onView,
  onEdit,
  onToggleStatus,
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
      label: 'Edit Designation',
      onClick: onEdit,
      color: 'warning',
    },
    {
      id: 'toggle-status',
      label: isActive ? 'Deactivate' : 'Activate',
      onClick: onToggleStatus,
      color: isActive ? 'error' : 'success',
      divider: true,
    },
    {
      id: 'delete',
      label: 'Delete',
      onClick: onDelete,
      color: 'error',
    },
  ];

  return <ContextMenu actions={menuActions} />;
};

export default DesignationMenu;
