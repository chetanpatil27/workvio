'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import { useTheme } from '@/components/providers/theme-provider';
import {
  Dashboard as DashboardIcon,
  FolderOpen as ProjectsIcon,
  DirectionsRun as SprintIcon,
  People as StaffIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/slices/auth';

const DRAWER_WIDTH = 280;

const navigationItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    href: '/dashboard',
    color: '#1976d2',
  },
  {
    text: 'Projects',
    icon: <ProjectsIcon />,
    href: '/projects',
    color: '#2e7d32',
  },
  {
    text: 'Sprints',
    icon: <SprintIcon />,
    href: '/sprints',
    color: '#ed6c02',
  },
  {
    text: 'Staff',
    icon: <StaffIcon />,
    href: '/staff',
    color: '#7b1fa2',
  },
  {
    text: 'Profile',
    icon: <ProfileIcon />,
    href: '/profile',
    color: '#d32f2f',
  },
];

interface SidebarProps {
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

export default function Sidebar({ mobileOpen, onMobileToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { darkMode } = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/login');
    handleClose();
  };

  const drawerContent = (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: darkMode
        ? 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)'
        : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
    }}>
      {/* Enhanced Logo Section */}
      <Box sx={{
        p: { xs: 2.5, sm: 3 },
        textAlign: 'center',
        borderBottom: '1px solid',
        borderColor: 'divider',
        background: darkMode
          ? 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      }}>
        <Box sx={{
          p: 2,
          borderRadius: '6px',
          background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
          mb: 1,
          display: 'inline-block',
        }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              color: 'white',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            Workvio
          </Typography>
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            fontSize: { xs: '0.65rem', sm: '0.75rem' },
            display: 'block',
            fontWeight: 500,
          }}
        >
          Project Management Platform
        </Typography>
      </Box>

      {/* Enhanced Navigation */}
      <List sx={{
        flexGrow: 1,
        px: { xs: 1.5, sm: 2 },
        py: 2,
        '& .MuiListItem-root': {
          mb: 1,
        }
      }}>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                selected={isActive}
                sx={{
                  borderRadius: '6px',
                  py: { xs: 1.5, sm: 1.8 },
                  px: { xs: 2, sm: 2.5 },
                  minHeight: { xs: 48, sm: 52 },
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&.Mui-selected': {
                    backgroundColor: darkMode ? 'rgba(144, 202, 249, 0.15)' : 'rgba(25, 118, 210, 0.1)',
                    borderLeft: '4px solid',
                    borderLeftColor: 'primary.main',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(90deg, ${item.color}15 0%, transparent 100%)`,
                      zIndex: -1,
                    },
                    '& .MuiListItemIcon-root': {
                      color: item.color,
                      transform: 'scale(1.1)',
                    },
                    '& .MuiListItemText-primary': {
                      color: 'text.primary',
                      fontWeight: 600,
                    }
                  },
                  '&:hover:not(.Mui-selected)': {
                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                    transform: 'translateX(4px)',
                    '& .MuiListItemIcon-root': {
                      color: item.color,
                      transform: 'scale(1.05)',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: { xs: 42, sm: 48 },
                    color: isActive ? item.color : 'text.secondary',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    color: isActive ? 'text.primary' : 'text.secondary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Enhanced User Profile Section */}
      <Box sx={{
        p: { xs: 2, sm: 2.5 },
        borderTop: '1px solid',
        borderColor: 'divider',
        background: darkMode
          ? 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 2, sm: 2.5 },
            p: { xs: 1.5, sm: 2 },
            borderRadius: '6px',
            backgroundColor: 'background.paper',
            cursor: 'pointer',
            border: '1px solid',
            borderColor: 'divider',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            '&:hover': {
              backgroundColor: 'action.hover',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              borderColor: 'primary.main',
            },
          }}
          onClick={handleAvatarClick}
        >
          <Avatar
            sx={{
              width: { xs: 40, sm: 44 },
              height: { xs: 40, sm: 44 },
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              fontSize: { xs: '1rem', sm: '1.1rem' },
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
            }}
          >
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: 'text.primary',
              }}
            >
              {user?.name || 'User'}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block',
                fontWeight: 500,
              }}
            >
              {user?.email || 'user@example.com'}
            </Typography>
          </Box>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              borderRadius: '6px',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              mt: -1,
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
          <MenuItem onClick={() => { router.push('/profile'); handleClose(); }}>
            <ListItemIcon>
              <ProfileIcon fontSize="small" sx={{ color: '#1976d2' }} />
            </ListItemIcon>
            Profile Settings
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" sx={{ color: '#ed6c02' }} />
            </ListItemIcon>
            Preferences
          </MenuItem>
          <Divider sx={{ my: 1 }} />
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ color: 'error.main' }} />
            </ListItemIcon>
            Sign Out
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            border: 'none',
            boxShadow: '4px 0 20px rgba(0,0,0,0.12)',
            borderRadius: '0 6px 6px 0',
            background: darkMode
              ? 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)'
              : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
            zIndex: (theme) => theme.zIndex.drawer + 2,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            border: 'none',
            boxShadow: '4px 0 20px rgba(0,0,0,0.08)',
            position: 'fixed',
            height: '100vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            zIndex: (theme) => theme.zIndex.drawer,
            background: darkMode
              ? 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)'
              : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
            borderRadius: '0 6px 6px 0',
            top: 0,
            left: 0,
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
              borderRadius: '3px',
              '&:hover': {
                backgroundColor: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)',
              },
            },
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export { DRAWER_WIDTH };
