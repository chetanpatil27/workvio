'use client';

import React, { useState } from 'react';
import {
  IconButton,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuActions: MenuAction[] = [
    {
      id: 'view',
      label: 'View Details',
      onClick: () => {
        onView();
        handleClose();
      },
    },
    {
      id: 'edit',
      label: 'Edit Ticket',
      onClick: () => {
        onEdit();
        handleClose();
      },
    },
    {
      id: 'delete',
      label: 'Delete Ticket',
      onClick: () => {
        onDelete();
        handleClose();
      },
      color: 'error',
    },
  ];

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 1 }}
      >
        <MoreIcon fontSize="small" />
      </IconButton>
      <ContextMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        actions={menuActions}
      />
    </>
  );
}
