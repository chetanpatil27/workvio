'use client';

import React from 'react';
import ContextMenu, { MenuAction } from '@/components/common/context-menu';

interface SprintMenuProps {
  onView: () => void;
  onEdit: () => void;
  onStart?: () => void;
  onComplete?: () => void;
  onDelete: () => void;
  sprintStatus?: 'planning' | 'active' | 'completed' | 'cancelled';
}

const SprintMenu: React.FC<SprintMenuProps> = ({
  onView,
  onEdit,
  onStart,
  onComplete,
  onDelete,
  sprintStatus = 'planning',
}) => {
  const menuActions: MenuAction[] = [
    {
      id: 'view',
      label: 'View Details',
      onClick: onView,
    },
    {
      id: 'edit',
      label: 'Edit Sprint',
      onClick: onEdit,
      disabled: sprintStatus === 'completed',
    },
  ];

  // Add status-specific actions
  if (sprintStatus === 'planning' && onStart) {
    menuActions.push({
      id: 'start',
      label: 'Start Sprint',
      onClick: onStart,
      color: 'success',
      divider: true,
    });
  }

  if (sprintStatus === 'active' && onComplete) {
    menuActions.push({
      id: 'complete',
      label: 'Complete Sprint',
      onClick: onComplete,
      color: 'primary',
      divider: true,
    });
  }

  // Always add delete action at the end
  menuActions.push({
    id: 'delete',
    label: 'Delete',
    onClick: onDelete,
    color: 'error',
    disabled: sprintStatus === 'active',
  });

  return <ContextMenu actions={menuActions} />;
};

export default SprintMenu;
