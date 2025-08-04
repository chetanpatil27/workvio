'use client';

import React from 'react';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import ContextMenu, { MenuAction } from '@/components/common/context-menu';

interface TicketMenuProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TicketMenu({
  onView,
  onEdit,
  onDelete,
}: TicketMenuProps) {

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
      actions={menuActions}
    />
  );
}
