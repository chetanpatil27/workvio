'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Switch,
  FormControlLabel,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useTheme } from '@/components/providers/theme-provider';

interface HeaderProps {
  onMobileToggle: () => void;
  title?: string;
}

export default function Header({ onMobileToggle, title = 'Dashboard' }: HeaderProps) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderBottomColor: 'divider',
        color: 'text.primary',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        margin: 0,
        top: 0,
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64, md: 72 }, px: { xs: 2, sm: 3 } }}>
        {/* Mobile menu toggle */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMobileToggle}
          sx={{
            mr: { xs: 1, sm: 2 },
            display: { md: 'none' },
            p: { xs: 1, sm: 1.5 },
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Page title */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            color: 'text.primary',
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
          }}
        >
          {title}
        </Typography>

        {/* Right side actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
          {/* Dark mode toggle */}
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                size="small"
              />
            }
            label={
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: { xs: 'none', md: 'block' } }}
              >
                Dark
              </Typography>
            }
            sx={{ mr: { xs: 1, sm: 2 }, display: { xs: 'none', sm: 'flex' } }}
          />

          {/* Search */}
          <Tooltip title="Search">
            <IconButton
              color="inherit"
              size="large"
              sx={{ p: { xs: 1, sm: 1.5 } }}
            >
              <SearchIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              size="large"
              sx={{ p: { xs: 1, sm: 1.5 } }}
            >
              <NotificationsIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
