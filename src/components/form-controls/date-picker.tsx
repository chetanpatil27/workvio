'use client';

import React from 'react';
import {
  TextField,
  Box,
} from '@mui/material';
import { format, parseISO, isValid } from 'date-fns';
import { formControlTheme } from './form-theme';

interface DatePickerProps {
  label: string;
  value?: string; // ISO date string
  onChange: (value: string) => void;
  error?: string;
  isRequired?: boolean;
  minDate?: string; // ISO date string
  maxDate?: string; // ISO date string
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
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
  size = 'medium',
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

  // Get size-specific styles
  const sizeStyles = formControlTheme.sizes[size];

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
        size={size === 'large' ? 'medium' : size === 'small' ? 'small' : 'medium'}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: minDate ? formatValueForInput(minDate) : undefined,
          max: maxDate ? formatValueForInput(maxDate) : undefined,
          style: {
            colorScheme: 'light', // Ensures consistent calendar styling
          },
        }}
        sx={{
          ...formControlTheme.commonStyles.field,
          '& .MuiOutlinedInput-root': {
            ...formControlTheme.commonStyles.field['& .MuiOutlinedInput-root'],
            minHeight: sizeStyles.height,
          },
          '& .MuiInputLabel-root': {
            ...formControlTheme.commonStyles.field['& .MuiInputLabel-root'],
            fontSize: sizeStyles.fontSize,
            backgroundColor: 'background.paper',
            paddingX: '4px',
            '&.MuiInputLabel-shrink': {
              fontSize: `calc(${sizeStyles.fontSize} * 0.85)`,
              transform: 'translate(14px, -9px) scale(0.75)',
            },
          },
          '& .MuiInputBase-input': {
            fontSize: sizeStyles.fontSize,
            height: 'auto',
            padding: sizeStyles.padding,
            fontFamily: 'inherit',
            fontWeight: 400,
            color: 'text.primary',
            '&::-webkit-calendar-picker-indicator': {
              cursor: 'pointer',
              borderRadius: '4px',
              padding: '6px',
              marginLeft: '8px',
              opacity: 0.6,
              transition: 'all 0.2s ease-in-out',
              filter: 'invert(0.5)',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                opacity: 1,
                filter: 'invert(0.3)',
                transform: 'scale(1.1)',
              },
            },
            '&::-webkit-datetime-edit': {
              padding: 0,
              display: 'flex',
              alignItems: 'center',
            },
            '&::-webkit-datetime-edit-fields-wrapper': {
              padding: 0,
            },
            '&::-webkit-datetime-edit-text': {
              color: 'inherit',
              padding: '0 2px',
            },
            '&::-webkit-datetime-edit-month-field': {
              color: 'inherit',
              fontWeight: 500,
            },
            '&::-webkit-datetime-edit-day-field': {
              color: 'inherit',
              fontWeight: 500,
            },
            '&::-webkit-datetime-edit-year-field': {
              color: 'inherit',
              fontWeight: 500,
            },
            '&:focus': {
              outline: 'none',
            },
          },
          '& .MuiFormHelperText-root': {
            ...formControlTheme.commonStyles.field['& .MuiFormHelperText-root'],
            marginLeft: '14px',
            marginRight: '14px',
          },
        }}
      />
    </Box>
  );
}
