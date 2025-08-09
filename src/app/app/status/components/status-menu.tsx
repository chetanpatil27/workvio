'use client';

import React from 'react';
import ContextMenu, { MenuAction } from '@/components/common/context-menu';
import type { TicketStatus } from '@/store/slices/status';

interface StatusMenuProps {
    onEdit: () => void;
    onDelete: () => void;
    onToggleActive: () => void;
    selectedStatus: TicketStatus | null;
}

const StatusMenu: React.FC<StatusMenuProps> = ({
    onEdit,
    onDelete,
    onToggleActive,
    selectedStatus,
}) => {
    const menuActions: MenuAction[] = [
        {
            id: 'view',
            label: 'View Details',
            onClick: () => {
                console.log('View status:', selectedStatus);
            },
        },
        {
            id: 'edit',
            label: 'Edit Status',
            onClick: onEdit,
        },
        {
            id: 'toggle-active',
            label: selectedStatus?.active ? 'Mark as Inactive' : 'Mark as Active',
            onClick: onToggleActive,
            color: selectedStatus?.active ? 'warning' : 'success',
        },
        {
            id: 'delete',
            label: selectedStatus?.isDefault ? 'Disable Status' : 'Delete Status',
            onClick: onDelete,
            color: 'error' as const,
            divider: true,
        },
    ];

    return (
        <ContextMenu
            actions={menuActions}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        />
    );
};

export default StatusMenu;
