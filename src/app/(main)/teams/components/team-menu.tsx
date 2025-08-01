'use client';

import React from 'react';
import ContextMenu, { MenuAction } from '@/components/common/context-menu';
import {
    Visibility as ViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Group as GroupIcon,
} from '@mui/icons-material';

interface TeamMenuProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onManageMembers?: () => void;
}

const TeamMenu: React.FC<TeamMenuProps> = ({
    anchorEl,
    onClose,
    onView,
    onEdit,
    onDelete,
    onManageMembers,
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
            label: 'Edit Team',
            icon: <EditIcon />,
            onClick: onEdit,
        },
        {
            id: 'manage-members',
            label: 'Manage Members',
            icon: <GroupIcon />,
            onClick: onManageMembers || (() => console.log('Manage members')),
            color: 'primary',
            divider: true,
        },
        {
            id: 'delete',
            label: 'Delete Team',
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
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        />
    );
};

export default TeamMenu;
