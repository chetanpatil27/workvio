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
  Chip,
  OutlinedInput,
} from '@mui/material';
import { SelectOption } from './select';

interface MultiSelectProps extends Omit<SelectProps<string[]>, 'error' | 'multiple'> {
  label: string;
  options: SelectOption[];
  error?: string;
  isRequired?: boolean;
  placeholder?: string;
}

export default function MultiSelect({
  label,
  options,
  error,
  isRequired = false,
  placeholder,
  value = [],
  ...props
}: MultiSelectProps) {
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
          multiple
          value={value}
          label={label}
          input={<OutlinedInput />}
          displayEmpty={!!placeholder}
          renderValue={(selected) => {
            if (!selected || selected.length === 0) {
              return placeholder ? (
                <span style={{ color: '#999' }}>{placeholder}</span>
              ) : (
                ''
              );
            }

            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => {
                  const option = options.find((opt) => opt.value === value);
                  return (
                    <Chip
                      key={value}
                      label={option?.label || value}
                      size="small"
                      sx={{
                        height: 24,
                        '& .MuiChip-label': {
                          fontSize: '0.75rem',
                        },
                      }}
                    />
                  );
                })}
              </Box>
            );
          }}
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
