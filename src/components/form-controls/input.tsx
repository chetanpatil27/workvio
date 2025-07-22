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

interface CustomInputProps extends Omit<TextFieldProps, 'variant' | 'error'> {
  label: string;
  error?: string;
  showPasswordToggle?: boolean;
  isRequired?: boolean;
}

export default function Input({
  label,
  error,
  showPasswordToggle = false,
  isRequired = false,
  type = 'text',
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
        InputProps={{
          ...props.InputProps,
          endAdornment: showPasswordToggle ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : props.InputProps?.endAdornment,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 1, // Square corners
            backgroundColor: 'background.paper',
            '& fieldset': {
              borderColor: 'divider',
            },
            '&:hover fieldset': {
              borderColor: 'text.secondary',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
              borderWidth: 2,
            },
            '&.Mui-error fieldset': {
              borderColor: 'error.main',
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 400,
            '&.Mui-focused': {
              color: 'primary.main',
            },
          },
          ...props.sx,
        }}
      />
    </Box>
  );
}
