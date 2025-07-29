'use client';

import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Chip,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { SelectOption } from './select';
import { formControlTheme } from './form-theme';

interface MultiSelectProps {
  label: string;
  options: SelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  error?: string;
  isRequired?: boolean;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  showCheckboxes?: boolean;
  maxDisplayChips?: number;
  disabled?: boolean;
}

export default function MultiSelect({
  label,
  options,
  error,
  isRequired = false,
  placeholder,
  value = [],
  onChange,
  size = 'medium',
  showCheckboxes = false,
  maxDisplayChips = 3,
  disabled = false,
}: MultiSelectProps) {
  // Get size-specific styles
  const sizeStyles = formControlTheme.sizes[size];
  const muiSize = size === 'large' ? 'medium' : size;
  return (
    <Box sx={{ width: '100%' }}>
      <FormControl fullWidth error={!!error} required={isRequired} disabled={disabled}>
        <InputLabel
          sx={{
            fontWeight: 500,
            fontSize: sizeStyles.fontSize,
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
          multiple
          value={value}
          onChange={(event) => onChange?.(event.target.value as string[])}
          label={label}
          input={<OutlinedInput />}
          size={muiSize}
          displayEmpty={!!placeholder}
          renderValue={(selected: string[]) => {
            if (!selected || selected.length === 0) {
              return placeholder ? (
                <span style={{
                  color: formControlTheme.colors.text.placeholder,
                  fontStyle: 'italic',
                }}>
                  {placeholder}
                </span>
              ) : (
                ''
              );
            }

            const selectedLabels = selected.map(val =>
              options.find(option => option.value === val)?.label || val
            );

            if (selectedLabels.length <= maxDisplayChips) {
              return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selectedLabels.map((label, index) => (
                    <Chip
                      key={index}
                      label={label}
                      size={size === 'small' ? 'small' : 'medium'}
                      variant="outlined"
                      sx={{
                        height: size === 'small' ? 20 : 24,
                        fontSize: size === 'small' ? '0.75rem' : '0.8rem',
                        borderColor: 'primary.main',
                        color: 'primary.main',
                      }}
                    />
                  ))}
                </Box>
              );
            }

            return (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {selectedLabels.slice(0, maxDisplayChips).map((label, index) => (
                  <Chip
                    key={index}
                    label={label}
                    size={size === 'small' ? 'small' : 'medium'}
                    variant="outlined"
                    sx={{
                      height: size === 'small' ? 20 : 24,
                      fontSize: size === 'small' ? '0.75rem' : '0.8rem',
                      borderColor: 'primary.main',
                      color: 'primary.main',
                    }}
                  />
                ))}
                {selectedLabels.length > maxDisplayChips && (
                  <span style={{
                    color: formControlTheme.colors.text.placeholder,
                    fontSize: sizeStyles.fontSize,
                  }}>
                    +{selectedLabels.length - maxDisplayChips} more
                  </span>
                )}
              </Box>
            );
          }}
          sx={{
            ...formControlTheme.commonStyles.field,
            '& .MuiOutlinedInput-root': {
              ...formControlTheme.commonStyles.field['& .MuiOutlinedInput-root'],
              minHeight: sizeStyles.height,
            },
            '& .MuiSelect-select': {
              padding: `${sizeStyles.padding.split(' ')[0]} ${sizeStyles.padding.split(' ')[1]}`,
              fontSize: sizeStyles.fontSize,
              minHeight: 'auto !important',
            },
            '& .MuiInputLabel-root': {
              ...formControlTheme.commonStyles.field['& .MuiInputLabel-root'],
              fontSize: sizeStyles.fontSize,
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: formControlTheme.borderRadius,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                border: '1px solid',
                borderColor: 'divider',
                mt: 1,
                maxHeight: 300,
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              sx={{
                fontSize: sizeStyles.fontSize,
                py: size === 'small' ? 1 : size === 'large' ? 1.5 : 1.25,
                transition: formControlTheme.transitions.fast,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              {showCheckboxes && (
                <Checkbox
                  checked={value.includes(String(option.value))}
                  size={size === 'small' ? 'small' : 'medium'}
                  sx={{
                    color: 'primary.main',
                    '&.Mui-checked': {
                      color: 'primary.main',
                    },
                  }}
                />
              )}
              <ListItemText
                primary={option.label}
                sx={{
                  '& .MuiTypography-root': {
                    fontSize: sizeStyles.fontSize,
                  },
                  ml: showCheckboxes ? 0 : -1,
                }}
              />
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
