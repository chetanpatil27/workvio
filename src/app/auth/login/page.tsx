'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  Alert,
  Container,
} from '@mui/material';
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/auth';
import Input from '@/components/form-controls/input';
import Button from '@/components/form-controls/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    dispatch(loginStart());

    try {
      // Simulate API call - replace with actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser = {
        id: '1',
        email: email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        role: 'developer' as const,
        createdAt: new Date().toISOString(),
      };

      const mockToken = 'mock-jwt-token';

      dispatch(loginSuccess({ user: mockUser, token: mockToken }));
      router.push('/dashboard');
    } catch {
      const errorMessage = 'Login failed. Please check your credentials.';
      setError(errorMessage);
      dispatch(loginFailure(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        px: { xs: 2, sm: 3 }
      }}
    >
      <Card
        sx={{
          width: '100%',
          boxShadow: { xs: 'none', sm: '0 20px 60px rgba(0,0,0,0.1)' },
          borderRadius: { xs: 0, sm: 4 },
          border: { xs: 'none', sm: '1px solid' },
          borderColor: { xs: 'transparent', sm: 'divider' },
        }}
      >
        <CardContent sx={{ p: { xs: 4, sm: 6 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: 'bold',
                mb: 1,
                fontSize: { xs: '1.75rem', sm: '2.125rem' },
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Workvio
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600, 
                mb: 1,
                fontSize: { xs: '1.25rem', sm: '1.5rem' }
              }}
            >
              Sign In
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              Sign in to your account to continue
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: { xs: 2.5, sm: 3 }
            }}
          >
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
              disabled={isLoading}
            />

            <Input
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
              showPasswordToggle
              disabled={isLoading}
            />

            <Button
              type="submit"
              loading={isLoading}
              disabled={!email || !password}
              sx={{ py: 1.5, mt: 2 }}
            >
              Sign In
            </Button>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/register"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>

          {/* Demo Credentials */}
          <Box
            sx={{
              mt: 4,
              p: 3,
              backgroundColor: 'background.default',
              borderRadius: 2,
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Demo Credentials:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: demo@workvio.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Password: demo123
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
