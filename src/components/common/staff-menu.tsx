'use client';

import React from 'react';
import ContextMenu, { MenuAction } from '@/components/common/context-menu';
import {
    Visibility as ViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
} from '@mui/icons-material';

interface StaffMenuProps {
    anchorEl: null | HTMLElement;
    onClose: () => void;
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onSendEmail?: () => void;
    onCall?: () => void;
    staffStatus?: 'active' | 'inactive' | 'former';
}

const StaffMenu: React.FC<StaffMenuProps> = ({
    anchorEl,
    onClose,
    onView,
    onEdit,
    onDelete,
    onSendEmail,
    onCall,
    staffStatus = 'active',
}) => {
    const menuActions: MenuAction[] = [
        {
            id: 'view',
            label: 'View Profile',
            icon: <ViewIcon />,
            onClick: onView,
        },
        {
            id: 'edit',
            label: 'Edit Staff',
            icon: <EditIcon />,
            onClick: onEdit,
            disabled: staffStatus === 'former',
        },
    ];

    // Add communication actions for active staff
    if (staffStatus === 'active') {
        if (onSendEmail) {
            menuActions.push({
                id: 'email',
                label: 'Send Email',
                icon: <EmailIcon />,
                onClick: onSendEmail,
                color: 'primary',
            });
        }

        if (onCall) {
            menuActions.push({
                id: 'call',
                label: 'Call',
                icon: <PhoneIcon />,
                onClick: onCall,
                color: 'success',
                divider: true,
            });
        }
    }

    // Add delete action
    menuActions.push({
        id: 'delete',
        label: staffStatus === 'former' ? 'Remove Record' : 'Delete',
        icon: <DeleteIcon />,
        onClick: onDelete,
        color: 'error',
    });

    return (
        <ContextMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            actions={menuActions}
        />
    );
};

export default StaffMenu;
