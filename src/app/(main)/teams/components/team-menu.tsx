'use client';

import React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
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
}

const TeamMenu: React.FC<TeamMenuProps> = ({
    anchorEl,
    onClose,
    onView,
    onEdit,
    onDelete,
}) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            PaperProps={{
                sx: {
                    minWidth: 160,
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    border: '1px solid',
                    borderColor: 'divider',
                },
            }}
        >
            <MenuItem onClick={onView} sx={{ py: 1.5 }}>
                <ListItemIcon>
                    <ViewIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>View Details</ListItemText>
            </MenuItem>
            
            <MenuItem onClick={onEdit} sx={{ py: 1.5 }}>
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit Team</ListItemText>
            </MenuItem>
            
            <MenuItem onClick={() => console.log('Manage members')} sx={{ py: 1.5 }}>
                <ListItemIcon>
                    <GroupIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Manage Members</ListItemText>
            </MenuItem>
            
            <Divider />
            
            <MenuItem 
                onClick={onDelete} 
                sx={{ 
                    py: 1.5,
                    color: 'error.main',
                    '&:hover': {
                        backgroundColor: 'error.light',
                        color: 'error.dark',
                    },
                }}
            >
                <ListItemIcon>
                    <DeleteIcon fontSize="small" sx={{ color: 'inherit' }} />
                </ListItemIcon>
                <ListItemText>Delete Team</ListItemText>
            </MenuItem>
        </Menu>
    );
};

export default TeamMenu;
