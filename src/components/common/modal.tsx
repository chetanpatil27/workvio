'use client';

import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Box,
    Typography,
    Breakpoint,
} from '@mui/material';
import {
    Close as CloseIcon,
} from '@mui/icons-material';

export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    size?: Breakpoint | false;
    fullWidth?: boolean;
    maxHeight?: string | number;
    showCloseButton?: boolean;
    disableBackdropClick?: boolean;
    disableEscapeKeyDown?: boolean;
    children?: React.ReactNode;
    actions?: React.ReactNode;
    contentPadding?: number | string;
    titleActions?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    title,
    subtitle,
    size = 'sm',
    fullWidth = true,
    maxHeight = '90vh',
    showCloseButton = true,
    disableBackdropClick = false,
    disableEscapeKeyDown = false,
    children,
    actions,
    contentPadding = 3,
    titleActions,
}) => {
    const handleClose = (event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
        if (disableBackdropClick && reason === 'backdropClick') {
            return;
        }
        if (disableEscapeKeyDown && reason === 'escapeKeyDown') {
            return;
        }
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={size}
            fullWidth={fullWidth}
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    maxHeight,
                },
            }}
        >
            {(title || subtitle || showCloseButton || titleActions) && (
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        pb: subtitle ? 1 : 2,
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        {title && (
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '1.25rem',
                                    lineHeight: 1.2,
                                }}
                            >
                                {title}
                            </Typography>
                        )}
                        {subtitle && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.5 }}
                            >
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
                        {titleActions}
                        {showCloseButton && (
                            <IconButton
                                onClick={onClose}
                                size="small"
                                sx={{
                                    color: 'text.secondary',
                                    '&:hover': {
                                        bgcolor: 'action.hover',
                                    },
                                }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Box>
                </DialogTitle>
            )}

            {children && (
                <DialogContent
                    dividers={!!title || !!subtitle}
                    sx={{
                        p: contentPadding,
                        '&.MuiDialogContent-dividers': {
                            borderTop: '1px solid',
                            borderBottom: actions ? '1px solid' : 'none',
                            borderColor: 'divider',
                        },
                    }}
                >
                    {children}
                </DialogContent>
            )}

            {actions && (
                <DialogActions
                    sx={{
                        p: 3,
                        gap: 1,
                        justifyContent: 'flex-end',
                    }}
                >
                    {actions}
                </DialogActions>
            )}
        </Dialog>
    );
};

export default Modal;
