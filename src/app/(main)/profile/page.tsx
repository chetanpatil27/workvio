'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return (
      <Box>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
        Profile
      </Typography>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                fontSize: '2rem',
                backgroundColor: 'primary.main',
                mr: 3,
              }}
            >
              {user.name[0].toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {user.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                {user.email}
              </Typography>
              <Chip
                label={user.role}
                size="small"
                color="primary"
                sx={{ textTransform: 'capitalize' }}
              />
            </Box>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Account Information
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Member Since
              </Typography>
              <Typography>
                {new Date(user.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Role
              </Typography>
              <Typography sx={{ textTransform: 'capitalize' }}>
                {user.role}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
