'use client';

import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from '@mui/material';

interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
  loadingText?: string;
}

export default function Button({
  children,
  loading = false,
  loadingText,
  disabled,
  variant = 'contained',
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      {...props}
      variant={variant}
      disabled={loading || disabled}
      sx={{
        borderRadius: 1, // Simple square corners
        textTransform: 'none',
        fontWeight: 500,
        minHeight: 42,
        px: 3,
        position: 'relative',
        '&.MuiButton-contained': {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        '&.MuiButton-outlined': {
          borderWidth: 1,
          '&:hover': {
            borderWidth: 1,
          },
        },
        ...props.sx,
      }}
    >
      {loading && (
        <CircularProgress
          size={16}
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: '-8px',
            marginTop: '-8px',
            color: variant === 'contained' ? 'primary.contrastText' : 'primary.main',
          }}
        />
      )}
      <span style={{ opacity: loading ? 0 : 1 }}>
        {loading && loadingText ? loadingText : children}
      </span>
    </MuiButton>
  );
}
