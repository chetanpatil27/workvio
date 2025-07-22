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
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    // Check authentication status
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    setIsLoading(false);
  }, [isAuthenticated, router]);

  if (isLoading) {
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
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onMobileToggle={handleMobileToggle} />
      
      {/* Main content area */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          width: { xs: '100%', md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        {/* Header */}
        <Header onMobileToggle={handleMobileToggle} />
        
        {/* Page content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: { xs: 1, sm: 2, md: 3 },
            px: { xs: 2, sm: 3, md: 4 },
            pb: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
