'use client';

import React from 'react';
import ContextMenu, { MenuAction } from '@/components/common/context-menu';

interface StaffMenuProps {
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onSendEmail?: () => void;
    onCall?: () => void;
    staffStatus?: 'active' | 'inactive' | 'former';
}

const StaffMenu: React.FC<StaffMenuProps> = ({
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
            onClick: onView,
        },
        {
            id: 'edit',
            label: 'Edit Staff',
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
                onClick: onSendEmail,
                color: 'primary',
            });
        }

        if (onCall) {
            menuActions.push({
                id: 'call',
                label: 'Call',
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
        onClick: onDelete,
        color: 'error',
    });

    return <ContextMenu actions={menuActions} />;
};

export default StaffMenu;
