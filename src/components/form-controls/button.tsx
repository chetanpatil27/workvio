'use client';

import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from '@mui/material';
import { formControlTheme } from './form-theme';

interface ButtonProps extends Omit<MuiButtonProps, 'size' | 'variant' | 'color'> {
  loading?: boolean;
  loadingText?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'link';
  variant?: 'filled' | 'outlined';
}

export default function Button({
  children,
  loading = false,
  loadingText,
  disabled,
  variant = 'filled',
  size = 'sm',
  color = 'primary',
  ...props
}: ButtonProps) {

  const getColorStyles = (color: string) => {
    const colors = {
      primary: {
        main: '#1976d2',
        dark: '#1565c0',
        light: '#e3f2fd',
        contrast: '#ffffff',
        shadow: 'rgba(25, 118, 210, 0.3)',
        hoverShadow: 'rgba(25, 118, 210, 0.4)',
        outlineHover: 'rgba(25, 118, 210, 0.08)',
      },
      success: {
        main: '#2e7d32',
        dark: '#1b5e20',
        light: '#e8f5e8',
        contrast: '#ffffff',
        shadow: 'rgba(46, 125, 50, 0.3)',
        hoverShadow: 'rgba(46, 125, 50, 0.4)',
        outlineHover: 'rgba(46, 125, 50, 0.08)',
      },
      danger: {
        main: '#d32f2f',
        dark: '#c62828',
        light: '#ffebee',
        contrast: '#ffffff',
        shadow: 'rgba(211, 47, 47, 0.3)',
        hoverShadow: 'rgba(211, 47, 47, 0.4)',
        outlineHover: 'rgba(211, 47, 47, 0.08)',
      },
      warning: {
        main: '#ed6c02',
        dark: '#e65100',
        light: '#fff3e0',
        contrast: '#ffffff',
        shadow: 'rgba(237, 108, 2, 0.3)',
        hoverShadow: 'rgba(237, 108, 2, 0.4)',
        outlineHover: 'rgba(237, 108, 2, 0.08)',
      },
      info: {
        main: '#0288d1',
        dark: '#0277bd',
        light: '#e1f5fe',
        contrast: '#ffffff',
        shadow: 'rgba(2, 136, 209, 0.3)',
        hoverShadow: 'rgba(2, 136, 209, 0.4)',
        outlineHover: 'rgba(2, 136, 209, 0.08)',
      },
      link: {
        main: '#1976d2',
        dark: '#1565c0',
        light: '#e3f2fd',
        contrast: '#1976d2',
        shadow: 'rgba(25, 118, 210, 0.2)',
        hoverShadow: 'rgba(25, 118, 210, 0.3)',
        outlineHover: 'rgba(25, 118, 210, 0.08)',
      },
    };
    return colors[color as keyof typeof colors] || colors.primary;
  };

  const colorStyles = getColorStyles(color);

  // Convert our custom props to MUI props
  const muiVariant = variant === 'filled' ? 'contained' : variant === 'outlined' ? 'outlined' : 'text';
  const muiSize = size === 'lg' ? 'medium' : size === 'sm' ? 'small' : 'medium';
  return (
    <MuiButton
      {...props}
      variant={muiVariant}
      disabled={loading || disabled}
      size={muiSize}
      sx={{
        ...formControlTheme.commonStyles.button,
        minHeight: size === 'sm' ? 42 : size === 'lg' ? 48 : 44,
        fontSize: size === 'sm' ? '0.875rem' : size === 'lg' ? '0.95rem' : '0.9rem',
        fontWeight: 600,
        px: size === 'sm' ? 2 : size === 'lg' ? 3 : 2.5,
        py: size === 'sm' ? 1 : size === 'lg' ? 1.5 : 1.2,
        position: 'relative',
        borderRadius: formControlTheme.borderRadius,
        textTransform: 'none',
        transition: 'all 0.2s ease',

        // Filled variant styles
        ...(variant === 'filled' && {
          backgroundColor: colorStyles.main,
          color: colorStyles.contrast,
          boxShadow: `0 3px 10px ${colorStyles.shadow}`,
          border: `1px solid ${colorStyles.main}`,
          '&:hover': {
            backgroundColor: colorStyles.dark,
            boxShadow: `0 4px 15px ${colorStyles.hoverShadow}`,
            transform: 'translateY(-1px)',
            borderColor: colorStyles.dark,
          },
        }),

        // Outlined variant styles  
        ...(variant === 'outlined' && {
          backgroundColor: 'transparent',
          color: colorStyles.main,
          border: `1px solid ${colorStyles.main}`,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: colorStyles.outlineHover,
            borderColor: colorStyles.dark,
            color: colorStyles.dark,
            transform: 'translateY(-1px)',
            boxShadow: `0 2px 8px ${colorStyles.shadow}`,
          },
        }),

        // Disabled state
        '&.Mui-disabled': {
          opacity: 0.6,
          transform: 'none',
          boxShadow: 'none',
          backgroundColor: variant === 'filled' ? '#e0e0e0' : 'transparent',
          color: '#9e9e9e',
          borderColor: '#e0e0e0',
        },

        ...props.sx,
      }}
    >
      {loading && (
        <CircularProgress
          size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: size === 'sm' ? '-7px' : size === 'lg' ? '-9px' : '-8px',
            marginTop: size === 'sm' ? '-7px' : size === 'lg' ? '-9px' : '-8px',
            color: variant === 'filled' ? colorStyles.contrast : colorStyles.main,
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
