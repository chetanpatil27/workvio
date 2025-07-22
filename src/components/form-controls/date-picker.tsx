'use client';

import React from 'react';
import {
  TextField,
  Box,
} from '@mui/material';
import { format, parseISO, isValid } from 'date-fns';

interface DatePickerProps {
  label: string;
  value?: string; // ISO date string
  onChange: (value: string) => void;
  error?: string;
  isRequired?: boolean;
  minDate?: string; // ISO date string
  maxDate?: string; // ISO date string;
  disabled?: boolean;
}

export default function DatePicker({
  label,
  value = '',
  onChange,
  error,
  isRequired = false,
  minDate,
  maxDate,
  disabled = false,
}: DatePickerProps) {
  // Convert ISO string to input format (YYYY-MM-DD)
  const formatValueForInput = (isoString: string): string => {
    if (!isoString) return '';
    try {
      const date = parseISO(isoString);
      return isValid(date) ? format(date, 'yyyy-MM-dd') : '';
    } catch {
      return '';
    }
  };

  // Convert input format to ISO string
  const formatValueToISO = (inputValue: string): string => {
    if (!inputValue) return '';
    try {
      const date = new Date(inputValue + 'T00:00:00.000Z');
      return isValid(date) ? date.toISOString() : '';
    } catch {
      return '';
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const isoValue = formatValueToISO(inputValue);
    onChange(isoValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        type="date"
        label={label}
        value={formatValueForInput(value)}
        onChange={handleChange}
        error={!!error}
        helperText={error}
        required={isRequired}
        disabled={disabled}
        fullWidth
        variant="outlined"
        InputLabelProps={{
          shrink: true,
          sx: {
            fontWeight: 500,
            '&.Mui-focused': {
              color: 'primary.main',
            },
          },
        }}
        inputProps={{
          min: minDate ? formatValueForInput(minDate) : undefined,
          max: maxDate ? formatValueForInput(maxDate) : undefined,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '& fieldset': {
              borderColor: 'divider',
            },
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
              borderWidth: 2,
            },
          },
        }}
      />
    </Box>
  );
}
