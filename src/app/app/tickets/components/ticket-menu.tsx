'use client';

import React from 'react';
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
      onClick: onView,
    },
    {
      id: 'edit',
      label: 'Edit Ticket',
      onClick: onEdit,
    },
    {
      id: 'delete',
      label: 'Delete Ticket',
      onClick: onDelete,
      color: 'error',
    },
  ];

  return <ContextMenu actions={menuActions} />;
}
