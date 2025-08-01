'use client';

import React from 'react';
import ContextMenu, { MenuAction } from '@/components/common/context-menu';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
    VisibilityOff as InactiveIcon,
    CheckCircle as ActiveIcon,
} from '@mui/icons-material';
import type { TicketStatus } from '@/store/slices/status';

interface StatusMenuProps {
    anchorEl: null | HTMLElement;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onToggleActive: () => void;
    selectedStatus: TicketStatus | null;
}

const StatusMenu: React.FC<StatusMenuProps> = ({
    anchorEl,
    onClose,
    onEdit,
    onDelete,
    onToggleActive,
    selectedStatus,
}) => {
    const menuActions: MenuAction[] = [
        {
            id: 'view',
            label: 'View Details',
            icon: <ViewIcon />,
            onClick: () => {
                console.log('View status:', selectedStatus);
                onClose();
            },
        },
        {
            id: 'edit',
            label: 'Edit Status',
            icon: <EditIcon />,
            onClick: onEdit,
        },
        {
            id: 'toggle-active',
            label: selectedStatus?.active ? 'Mark as Inactive' : 'Mark as Active',
            icon: selectedStatus?.active ? <InactiveIcon /> : <ActiveIcon />,
            onClick: onToggleActive,
            color: selectedStatus?.active ? 'warning' : 'success',
        },
        {
            id: 'delete',
            label: selectedStatus?.isDefault ? 'Disable Status' : 'Delete Status',
            icon: <DeleteIcon />,
            onClick: onDelete,
            color: 'error' as const,
            divider: true,
        },
    ];

    return (
        <ContextMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            actions={menuActions}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        />
    );
};

export default StatusMenu;
