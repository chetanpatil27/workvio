'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { RootState } from '@/store';
import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';
import { DRAWER_WIDTH } from '@/components/layout/sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Check authentication status
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    setIsLoading(false);
  }, [isAuthenticated, router, isClient]);

  if (!isClient || isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onMobileToggle={handleMobileToggle} />

      {/* Main content area */}
      <Box
        className="main-content-area"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          marginLeft: { xs: 0, md: `${DRAWER_WIDTH}px` },
          marginTop: 0,
          marginRight: 0,
          marginBottom: 0,
          minHeight: '100vh',
          maxHeight: '100vh',
          overflow: 'auto',
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#121212' : '#f8fafc',
          padding: 0,
          position: 'relative',
          '& > *': {
            margin: 0,
          },
          '&.main-content-area': {
            '& .MuiAppBar-root': {
              margin: '0 !important',
              top: '0 !important',
            }
          }
        }}
      >
        {/* Header */}
        <Box sx={{ margin: 0, padding: 0, position: 'sticky', top: 0, zIndex: 1000 }}>
          <Header onMobileToggle={handleMobileToggle} />
        </Box>

        {/* Page content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: { xs: 2, sm: 3, md: 4 },
            px: { xs: 2, sm: 3, md: 4 },
            pb: { xs: 2, sm: 3, md: 4 },
            maxWidth: '100%',
            overflow: 'auto',
            margin: 0,
            height: 'calc(100vh - 72px)', // Subtract header height
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
