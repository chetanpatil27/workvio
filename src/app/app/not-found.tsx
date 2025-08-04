'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function AppNotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/app/dashboard');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center',
          py: 4,
        }}
      >
        <ErrorOutlineIcon
          sx={{
            fontSize: 100,
            color: 'error.main',
            mb: 3,
          }}
        />
        
        <Typography variant="h2" component="h1" sx={{ fontSize: '2.5rem', fontWeight: 700, mb: 2 }}>
          404
        </Typography>
        
        <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'text.primary' }}>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: 400 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={handleGoHome}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: 2,
            textTransform: 'none',
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
            },
          }}
        >
          Go to Dashboard
        </Button>
      </Box>
    </Container>
  );
}
