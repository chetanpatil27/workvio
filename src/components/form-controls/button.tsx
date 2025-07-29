'use client';

import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from '@mui/material';
import { formControlTheme } from './form-theme';

interface ButtonProps extends Omit<MuiButtonProps, 'size'> {
  loading?: boolean;
  loadingText?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function Button({
  children,
  loading = false,
  loadingText,
  disabled,
  variant = 'contained',
  size = 'small',
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      {...props}
      variant={variant}
      disabled={loading || disabled}
      size={size === 'large' ? 'medium' : size === 'small' ? 'small' : 'medium'}
      sx={{
        ...formControlTheme.commonStyles.button,
        minHeight: size === 'small' ? 42 : size === 'large' ? 48 : 44,
        fontSize: size === 'small' ? '0.875rem' : size === 'large' ? '0.95rem' : '0.9rem',
        fontWeight: 600,
        px: size === 'small' ? 2 : size === 'large' ? 3 : 2.5,
        py: size === 'small' ? 1 : size === 'large' ? 1.5 : 1.2,
        position: 'relative',
        borderRadius: formControlTheme.borderRadius,
        textTransform: 'none',
        boxShadow: variant === 'contained' ? '0 3px 10px rgba(25, 118, 210, 0.3)' : 'none',
        '&:hover': {
          boxShadow: variant === 'contained' ? '0 4px 15px rgba(25, 118, 210, 0.4)' : 'none',
          transform: 'translateY(-1px)',
        },
        '&.MuiButton-contained': {
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        },
        '&.MuiButton-outlined': {
          borderColor: 'primary.main',
          color: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.light',
            borderColor: 'primary.dark',
          },
        },
        '&.MuiButton-text': {
          color: 'primary.main',
          '&:hover': {
            bgcolor: 'rgba(25, 118, 210, 0.08)',
          },
        },
        '&.Mui-disabled': {
          opacity: 0.6,
          transform: 'none',
          boxShadow: 'none',
        },
        transition: 'all 0.2s ease',
        ...props.sx,
      }}
    >
      {loading && (
        <CircularProgress
          size={size === 'small' ? 14 : size === 'large' ? 18 : 16}
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: size === 'small' ? '-7px' : size === 'large' ? '-9px' : '-8px',
            marginTop: size === 'small' ? '-7px' : size === 'large' ? '-9px' : '-8px',
            color: variant === 'contained' ? 'primary.contrastText' : 'primary.main',
          }}
        />
      )}
      <span style={{
        opacity: loading ? 0 : 1,
        transition: formControlTheme.transitions.fast,
      }}>
        {loading && loadingText ? loadingText : children}
      </span>
    </MuiButton>
  );
}
