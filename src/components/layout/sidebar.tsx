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
  },
  {
    text: 'Projects',
    icon: <ProjectsIcon />,
    href: '/projects',
  },
  {
    text: 'Sprints',
    icon: <SprintIcon />,
    href: '/sprints',
  },
  {
    text: 'Staff',
    icon: <StaffIcon />,
    href: '/staff',
  },
  {
    text: 'Profile',
    icon: <ProfileIcon />,
    href: '/profile',
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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <Box sx={{ p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Workvio
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
        >
          Project Management
        </Typography>
      </Box>

      <Divider />

      {/* Navigation */}
      <List sx={{ flexGrow: 1, px: { xs: 1, sm: 2 }, py: 1 }}>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                selected={isActive}
                sx={{
                  borderRadius: 1,
                  py: { xs: 1.2, sm: 1.5 },
                  px: { xs: 1.5, sm: 2 },
                  minHeight: { xs: 44, sm: 48 },
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                  '&:hover:not(.Mui-selected)': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: { xs: 36, sm: 40 },
                    color: isActive ? 'inherit' : 'text.secondary',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                    fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* User Profile */}
      <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1.5, sm: 2 },
            p: { xs: 1, sm: 1.5 },
            borderRadius: 1,
            backgroundColor: 'background.paper',
            cursor: 'pointer',
            border: 1,
            borderColor: 'divider',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
          onClick={handleAvatarClick}
        >
          <Avatar
            sx={{
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              backgroundColor: 'primary.main',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontWeight: 600,
            }}
          >
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user?.name || 'User'}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.65rem', sm: '0.75rem' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block',
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
        >
          <MenuItem onClick={() => { router.push('/profile'); handleClose(); }}>
            <ListItemIcon>
              <ProfileIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
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
            boxShadow: (theme) => theme.shadows[8],
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
            boxShadow: '2px 0 4px rgba(0,0,0,0.08)',
            position: 'fixed',
            height: '100vh',
            overflowY: 'auto',
            zIndex: (theme) => theme.zIndex.drawer,
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1a1a1a' : '#fafafa',
            top: 0,
            left: 0,
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
