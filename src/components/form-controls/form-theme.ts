// Shared styling theme for all form controls
export const formControlTheme = {
    // Common border radius for all form controls
    borderRadius: 2,

    // Common height for form controls (reduced for better UI)
    height: 42,

    // Spacing (reduced for more compact UI)
    spacing: {
        small: 1,
        medium: 1.5,
        large: 2.5,
    },

    // Typography
    typography: {
        label: {
            fontWeight: 600,
            fontSize: '0.85rem',
        },
        helperText: {
            fontSize: '0.75rem',
            marginTop: 0.5,
        },
    },

    // Color palette for form states (updated to use primary colors)
    colors: {
        border: {
            default: 'divider',
            hover: 'primary.light',
            focused: 'primary.main',
            error: 'error.main',
        },
        background: {
            default: 'background.paper',
            hover: 'rgba(25, 118, 210, 0.04)',
            focused: 'background.paper',
        },
        text: {
            label: 'text.primary',
            labelFocused: 'primary.main',
            placeholder: 'text.secondary',
            helper: 'text.secondary',
            error: 'error.main',
        },
    },

    // Common styles for form controls
    commonStyles: {
        // Unified input and select styles for consistency
        field: {
            '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'background.paper',
                transition: 'all 0.2s ease-in-out',
                '& fieldset': {
                    borderColor: 'divider',
                    borderWidth: '1px',
                    transition: 'border-color 0.2s ease-in-out',
                },
                '&:hover fieldset': {
                    borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                    borderWidth: '2px',
                },
                '&.Mui-error fieldset': {
                    borderColor: 'error.main',
                },
                '&.Mui-disabled': {
                    backgroundColor: 'action.hover',
                    '& fieldset': {
                        borderColor: 'action.disabled',
                    },
                },
            },
            '& .MuiInputLabel-root': {
                fontWeight: 500,
                color: 'text.primary',
                '&.Mui-focused': {
                    color: 'primary.main',
                },
                '&.Mui-error': {
                    color: 'error.main',
                },
            },
            '& .MuiFormHelperText-root': {
                fontSize: '0.75rem',
                marginTop: 0.5,
                '&.Mui-error': {
                    color: 'error.main',
                },
            },
        },

        // Legacy input styles (kept for backward compatibility)
        input: {
            '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'background.paper',
                transition: 'all 0.2s ease-in-out',
                '& fieldset': {
                    borderColor: 'divider',
                    borderWidth: '1px',
                    transition: 'border-color 0.2s ease-in-out',
                },
                '&:hover fieldset': {
                    borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                    borderWidth: '2px',
                },
                '&.Mui-error fieldset': {
                    borderColor: 'error.main',
                },
                '&.Mui-disabled': {
                    backgroundColor: 'action.hover',
                    '& fieldset': {
                        borderColor: 'action.disabled',
                    },
                },
            },
            '& .MuiInputLabel-root': {
                fontWeight: 500,
                color: 'text.primary',
                '&.Mui-focused': {
                    color: 'primary.main',
                },
                '&.Mui-error': {
                    color: 'error.main',
                },
            },
            '& .MuiFormHelperText-root': {
                fontSize: '0.75rem',
                marginTop: 0.5,
                '&.Mui-error': {
                    color: 'error.main',
                },
            },
        },

        // Button styles
        button: {
            borderRadius: 2,
            textTransform: 'none' as const,
            fontWeight: 500,
            minHeight: 48,
            px: 3,
            py: 1.5,
            transition: 'all 0.2s ease-in-out',
            '&.MuiButton-contained': {
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transform: 'translateY(-1px)',
                },
                '&:active': {
                    transform: 'translateY(0)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                },
            },
            '&.MuiButton-outlined': {
                borderWidth: 1,
                '&:hover': {
                    borderWidth: 1,
                    backgroundColor: 'action.hover',
                },
            },
            '&.MuiButton-text': {
                '&:hover': {
                    backgroundColor: 'action.hover',
                },
            },
            '&.Mui-disabled': {
                opacity: 0.6,
            },
        },

        // Unified select styles (same as field)
        select: {
            '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'background.paper',
                transition: 'all 0.2s ease-in-out',
                '& fieldset': {
                    borderColor: 'divider',
                    borderWidth: '1px',
                    transition: 'border-color 0.2s ease-in-out',
                },
                '&:hover fieldset': {
                    borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                    borderWidth: '2px',
                },
                '&.Mui-error fieldset': {
                    borderColor: 'error.main',
                },
                '&.Mui-disabled': {
                    backgroundColor: 'action.hover',
                    '& fieldset': {
                        borderColor: 'action.disabled',
                    },
                },
            },
            '& .MuiInputLabel-root': {
                fontWeight: 500,
                color: 'text.primary',
                '&.Mui-focused': {
                    color: 'primary.main',
                },
                '&.Mui-error': {
                    color: 'error.main',
                },
            },
            '& .MuiFormHelperText-root': {
                fontSize: '0.75rem',
                marginTop: 0.5,
                '&.Mui-error': {
                    color: 'error.main',
                },
            },
        },
    },

    // Animation and transitions
    transitions: {
        default: 'all 0.2s ease-in-out',
        fast: 'all 0.15s ease-in-out',
        slow: 'all 0.3s ease-in-out',
    },

    // Common sizes
    sizes: {
        small: {
            height: 36,
            fontSize: '0.875rem',
            padding: '8px 12px',
        },
        medium: {
            height: 48,
            fontSize: '1rem',
            padding: '12px 16px',
        },
        large: {
            height: 56,
            fontSize: '1.125rem',
            padding: '16px 20px',
        },
    },

    // Direct sx generator functions
    getSxStyles: (size: 'small' | 'medium' | 'large' = 'medium', customStyles: object = {}) => {
        const sizeStyles = formControlTheme.sizes[size];
        return {
            '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'background.paper',
                transition: 'all 0.2s ease-in-out',
                minHeight: sizeStyles.height,
                '& fieldset': {
                    borderColor: 'divider',
                    borderWidth: '1px',
                    transition: 'border-color 0.2s ease-in-out',
                },
                '&:hover fieldset': {
                    borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                    borderWidth: '2px',
                },
                '&.Mui-error fieldset': {
                    borderColor: 'error.main',
                },
                '&.Mui-disabled': {
                    backgroundColor: 'action.hover',
                    '& fieldset': {
                        borderColor: 'action.disabled',
                    },
                },
            },
            '& .MuiInputLabel-root': {
                fontWeight: 500,
                fontSize: sizeStyles.fontSize,
                color: 'text.primary',
                '&.Mui-focused': {
                    color: 'primary.main',
                },
                '&.Mui-error': {
                    color: 'error.main',
                },
            },
            '& .MuiInputBase-input': {
                fontSize: sizeStyles.fontSize,
                height: 'auto',
                padding: sizeStyles.padding,
            },
            '& .MuiSelect-select': {
                padding: sizeStyles.padding,
                fontSize: sizeStyles.fontSize,
                minHeight: 'auto !important',
            },
            '& .MuiFormHelperText-root': {
                fontSize: '0.75rem',
                marginTop: 0.5,
                '&.Mui-error': {
                    color: 'error.main',
                },
            },
            ...customStyles,
        };
    },
};

export default formControlTheme;
