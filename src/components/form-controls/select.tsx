'use client';

import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectProps,
  FormHelperText,
  Box,
} from '@mui/material';
import { formControlTheme } from './form-theme';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface CustomSelectProps extends Omit<SelectProps, 'error' | 'size'> {
  label: string;
  options: SelectOption[];
  error?: string;
  isRequired?: boolean;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function CustomSelect({
  label,
  options,
  error,
  isRequired = false,
  placeholder,
  size = 'medium',
  ...props
}: CustomSelectProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <FormControl fullWidth error={!!error} required={isRequired}>
        <InputLabel
          sx={{
            fontWeight: 500,
            fontSize: formControlTheme.sizes[size].fontSize,
            color: 'text.primary',
            '&.Mui-focused': {
              color: 'primary.main',
            },
            '&.Mui-error': {
              color: 'error.main',
            },
          }}
        >
          {label}
        </InputLabel>
        <Select
          {...props}
          label={label}
          displayEmpty={!!placeholder}
          size={size === 'large' ? 'medium' : size === 'small' ? 'small' : 'medium'}
          sx={formControlTheme.getSxStyles(size, props.sx || {})}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: formControlTheme.borderRadius,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                border: '1px solid',
                borderColor: 'divider',
                mt: 1,
                '& .MuiMenuItem-root': {
                  fontSize: formControlTheme.sizes[size].fontSize,
                  py: size === 'small' ? 1 : size === 'large' ? 1.5 : 1.25,
                  transition: formControlTheme.transitions.fast,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    },
                  },
                },
              },
            },
          }}
        >
          {placeholder && (
            <MenuItem value="" disabled>
              <span style={{
                color: formControlTheme.colors.text.placeholder,
                fontStyle: 'italic',
              }}>
                {placeholder}
              </span>
            </MenuItem>
          )}
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error && (
          <FormHelperText
            sx={{
              fontSize: formControlTheme.typography.helperText.fontSize,
              marginTop: formControlTheme.typography.helperText.marginTop,
              color: 'error.main',
            }}
          >
            {error}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
