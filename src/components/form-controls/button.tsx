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
  size = 'medium',
  ...props
}: ButtonProps) {
  // Get size-specific styles
  const sizeStyles = formControlTheme.sizes[size];

  return (
    <MuiButton
      {...props}
      variant={variant}
      disabled={loading || disabled}
      size={size === 'large' ? 'medium' : size === 'small' ? 'small' : 'medium'}
      sx={{
        ...formControlTheme.commonStyles.button,
        minHeight: sizeStyles.height,
        fontSize: sizeStyles.fontSize,
        px: size === 'small' ? 2 : size === 'large' ? 4 : 3,
        py: size === 'small' ? 1 : size === 'large' ? 2 : 1.5,
        position: 'relative',
        '&.MuiButton-contained': {
          ...formControlTheme.commonStyles.button['&.MuiButton-contained'],
        },
        '&.MuiButton-outlined': {
          ...formControlTheme.commonStyles.button['&.MuiButton-outlined'],
        },
        '&.MuiButton-text': {
          ...formControlTheme.commonStyles.button['&.MuiButton-text'],
        },
        '&.Mui-disabled': {
          ...formControlTheme.commonStyles.button['&.Mui-disabled'],
        },
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
