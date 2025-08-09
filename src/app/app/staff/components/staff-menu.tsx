'use client';

import React from 'react';
import ContextMenu, { MenuAction } from '@/components/common/context-menu';

interface StaffMenuProps {
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
    staffDepartment?: string;
}

const StaffMenu: React.FC<StaffMenuProps> = ({
    onView,
    onEdit,
    onDelete,
    staffDepartment,
}) => {
    const menuActions: MenuAction[] = [
        {
            id: 'view',
            label: 'View Details',
            onClick: onView,
        },
        {
            id: 'edit',
            label: 'Edit Staff',
            onClick: onEdit,
            disabled: staffDepartment === 'Former Employee',
        },
        {
            id: 'delete',
            label: 'Delete',
            onClick: onDelete,
            color: 'error',
            divider: true,
            disabled: staffDepartment === 'Former Employee',
        },
    ];

    return <ContextMenu actions={menuActions} />;
};

export default StaffMenu;
