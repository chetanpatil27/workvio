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

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface CustomSelectProps extends Omit<SelectProps, 'error'> {
  label: string;
  options: SelectOption[];
  error?: string;
  isRequired?: boolean;
  placeholder?: string;
}

export default function CustomSelect({
  label,
  options,
  error,
  isRequired = false,
  placeholder,
  ...props
}: CustomSelectProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <FormControl fullWidth error={!!error} required={isRequired}>
        <InputLabel
          sx={{
            fontWeight: 500,
            '&.Mui-focused': {
              color: 'primary.main',
            },
          }}
        >
          {label}
        </InputLabel>
        <Select
          {...props}
          label={label}
          displayEmpty={!!placeholder}
          sx={{
            borderRadius: 2,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'divider',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
              borderWidth: 2,
            },
            ...props.sx,
          }}
        >
          {placeholder && (
            <MenuItem value="" disabled>
              <span style={{ color: '#999' }}>{placeholder}</span>
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
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
}
