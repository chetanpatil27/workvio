'use client';

import React from 'react';
import ContextMenu, { MenuAction } from '@/components/common/context-menu';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  CheckCircle as ActivateIcon,
  Cancel as DeactivateIcon,
} from '@mui/icons-material';

interface DesignationMenuProps {
  anchorEl: HTMLElement | null;
  isActive: boolean;
  onClose: () => void;
  onView: () => void;
  onEdit: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
}

const DesignationMenu: React.FC<DesignationMenuProps> = ({
  anchorEl,
  isActive,
  onClose,
  onView,
  onEdit,
  onToggleStatus,
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
      label: 'Edit Designation',
      icon: <EditIcon />,
      onClick: onEdit,
      color: 'warning',
    },
    {
      id: 'toggle-status',
      label: isActive ? 'Deactivate' : 'Activate',
      icon: isActive ? <DeactivateIcon /> : <ActivateIcon />,
      onClick: onToggleStatus,
      color: isActive ? 'error' : 'success',
      divider: true,
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
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      actions={menuActions}
    />
  );
};

export default DesignationMenu;
