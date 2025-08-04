'use client';

import React from 'react';
import ContextMenu, { MenuAction } from '@/components/common/context-menu';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface TicketMenuProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TicketMenu: React.FC<TicketMenuProps> = ({
  anchorEl,
  onClose,
  onView,
  onEdit,
  onDelete,
}) => {
  const menuActions: MenuAction[] = [
    {
      id: 'view',
      label: 'View Details',
      icon: <ViewIcon fontSize="small" />,
      onClick: onView,
    },
    {
      id: 'edit',
      label: 'Edit Ticket',
      icon: <EditIcon fontSize="small" />,
      onClick: onEdit,
    },
    {
      id: 'delete',
      label: 'Delete Ticket',
      icon: <DeleteIcon fontSize="small" />,
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

export default TicketMenu;
