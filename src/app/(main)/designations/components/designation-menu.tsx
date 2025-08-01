'use client';

import React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  CheckCircle as ActivateIcon,
  Cancel as DeactivateIcon,
} from '@mui/icons-material';

interface DesignationMenuProps {
  anchorEl: HTMLElement | null;
  isActive: boolean;
  onClose: () => void;
  onView: () => void;
  onEdit: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
}

const DesignationMenu: React.FC<DesignationMenuProps> = ({
  anchorEl,
  isActive,
  onClose,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '6px',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          mt: 1,
          '& .MuiMenuItem-root': {
            borderRadius: '4px',
            mx: 1,
            my: 0.5,
            fontSize: '0.875rem',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
            },
          },
        }
      }}
    >
      <MenuItem onClick={onView}>
        <ListItemIcon>
          <ViewIcon fontSize="small" sx={{ color: '#1976d2' }} />
        </ListItemIcon>
        <ListItemText>View Details</ListItemText>
      </MenuItem>
      
      <MenuItem onClick={onEdit}>
        <ListItemIcon>
          <EditIcon fontSize="small" sx={{ color: '#ed6c02' }} />
        </ListItemIcon>
        <ListItemText>Edit Designation</ListItemText>
      </MenuItem>
      
      <MenuItem onClick={onToggleStatus}>
        <ListItemIcon>
          {isActive ? (
            <DeactivateIcon fontSize="small" sx={{ color: '#f44336' }} />
          ) : (
            <ActivateIcon fontSize="small" sx={{ color: '#4caf50' }} />
          )}
        </ListItemIcon>
        <ListItemText>{isActive ? 'Deactivate' : 'Activate'}</ListItemText>
      </MenuItem>
      
      <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" sx={{ color: 'error.main' }} />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default DesignationMenu;
