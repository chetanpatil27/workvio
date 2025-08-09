'use client';

import React from 'react';
import ContextMenu, { MenuAction } from '@/components/common/context-menu';

interface TeamMenuProps {
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onManageMembers?: () => void;
}

const TeamMenu: React.FC<TeamMenuProps> = ({
    onView,
    onEdit,
    onDelete,
    onManageMembers,
}) => {
    const menuActions: MenuAction[] = [
        {
            id: 'view',
            label: 'View Details',
            onClick: onView,
        },
        {
            id: 'edit',
            label: 'Edit Team',
            onClick: onEdit,
        },
        {
            id: 'manage-members',
            label: 'Manage Members',
            onClick: onManageMembers || (() => console.log('Manage members')),
            color: 'primary',
            divider: true,
        },
        {
            id: 'delete',
            label: 'Delete Team',
            onClick: onDelete,
            color: 'error',
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

export default TeamMenu;
