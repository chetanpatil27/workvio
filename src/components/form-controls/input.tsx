'use client';

import React from 'react';
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
  Box,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { formControlTheme } from './form-theme';

interface CustomInputProps extends Omit<TextFieldProps, 'variant' | 'error' | 'size'> {
  label: string;
  error?: string;
  showPasswordToggle?: boolean;
  isRequired?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function Input({
  label,
  error,
  showPasswordToggle = false,
  isRequired = false,
  type = 'text',
  size = 'medium',
  ...props
}: CustomInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        {...props}
        type={inputType}
        label={label}
        error={!!error}
        helperText={error}
        variant="outlined"
        fullWidth
        required={isRequired}
        size={size === 'large' ? 'medium' : size === 'small' ? 'small' : 'medium'}
        InputProps={{
          ...props.InputProps,
          endAdornment: showPasswordToggle ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
                size={size === 'small' ? 'small' : 'medium'}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : props.InputProps?.endAdornment,
        }}
        sx={formControlTheme.getSxStyles(size, props.sx || {})}
      />
    </Box>
  );
}
