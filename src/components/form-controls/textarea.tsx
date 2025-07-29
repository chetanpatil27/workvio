'use client';

import React from 'react';
import {
    TextField,
    Box,
    FormHelperText,
    Typography,
} from '@mui/material';
import { formControlTheme } from './form-theme';

interface TextareaProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    isRequired?: boolean;
    disabled?: boolean;
    rows?: number;
    maxRows?: number;
    minRows?: number;
    size?: 'small' | 'medium' | 'large';
    maxLength?: number;
    showCharCount?: boolean;
    autoFocus?: boolean;
    helperText?: string;
}

export default function Textarea({
    label,
    value,
    onChange,
    placeholder,
    error,
    isRequired = false,
    disabled = false,
    rows = 4,
    maxRows,
    minRows,
    size = 'medium',
    maxLength,
    showCharCount = false,
    autoFocus = false,
    helperText,
}: TextareaProps) {
    // Get size-specific styles
    const sizeStyles = formControlTheme.sizes[size];

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        if (maxLength && newValue.length > maxLength) {
            return; // Don't allow input beyond maxLength
        }
        onChange(newValue);
    };

    const isOverLimit = maxLength ? value.length > maxLength : false;
    const characterCount = maxLength ? `${value.length}/${maxLength}` : `${value.length}`;

    return (
        <Box sx={{ width: '100%' }}>
            <TextField
                fullWidth
                label={label}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                error={!!error}
                required={isRequired}
                disabled={disabled}
                autoFocus={autoFocus}
                multiline
                rows={rows}
                maxRows={maxRows}
                minRows={minRows}
                size={size === 'large' ? 'medium' : size === 'small' ? 'small' : 'medium'}
                sx={{
                    ...formControlTheme.commonStyles.field,
                    '& .MuiOutlinedInput-root': {
                        ...formControlTheme.commonStyles.field['& .MuiOutlinedInput-root'],
                        '& .MuiInputBase-input': {
                            padding: sizeStyles.padding,
                            fontSize: sizeStyles.fontSize,
                            lineHeight: 1.5,
                            '&::placeholder': {
                                color: formControlTheme.colors.text.placeholder,
                                fontSize: sizeStyles.fontSize,
                                opacity: 1,
                            },
                        },
                    },
                    '& .MuiInputLabel-root': {
                        ...formControlTheme.commonStyles.field['& .MuiInputLabel-root'],
                        fontSize: sizeStyles.fontSize,
                    },
                }}
            />

            {/* Character count and helper text row */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mt: formControlTheme.typography.helperText.marginTop,
                    minHeight: showCharCount || error || helperText ? 'auto' : 0,
                }}
            >
                {/* Helper text or error */}
                <Box sx={{ flex: 1 }}>
                    {error && (
                        <FormHelperText
                            error
                            sx={{
                                fontSize: formControlTheme.typography.helperText.fontSize,
                                margin: 0,
                                color: 'error.main',
                            }}
                        >
                            {error}
                        </FormHelperText>
                    )}
                    {!error && helperText && (
                        <FormHelperText
                            sx={{
                                fontSize: formControlTheme.typography.helperText.fontSize,
                                margin: 0,
                                color: 'text.secondary',
                            }}
                        >
                            {helperText}
                        </FormHelperText>
                    )}
                </Box>

                {/* Character count */}
                {showCharCount && maxLength && (
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: formControlTheme.typography.helperText.fontSize,
                            color: isOverLimit ? 'error.main' : 'text.secondary',
                            fontWeight: isOverLimit ? 500 : 400,
                            ml: 2,
                            flexShrink: 0,
                        }}
                    >
                        {characterCount}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
