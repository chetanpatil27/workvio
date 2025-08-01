'use client';

import React, { useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Box,
    Typography,
    Breakpoint,
    Fade,
    Slide,
    Zoom,
    Grow,
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
    transition?: 'fade' | 'slide' | 'zoom' | 'grow';
    transitionDuration?: number;
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
    transition = 'fade',
    transitionDuration = 300,
}) => {
    // Simple cleanup effect
    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return;
        
        return () => {
            // Cleanup on unmount
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            document.body.style.pointerEvents = '';
            document.documentElement.style.pointerEvents = '';
        };
    }, []);

    const handleClose = (event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
        if (disableBackdropClick && reason === 'backdropClick') {
            return;
        }
        if (disableEscapeKeyDown && reason === 'escapeKeyDown') {
            return;
        }
        
        // Force cleanup before closing (only on client)
        if (typeof window !== 'undefined') {
            document.body.style.pointerEvents = '';
            document.documentElement.style.pointerEvents = '';
        }
        
        // Call the onClose callback immediately
        onClose();
    };

    // Get the appropriate transition component
    const getTransitionComponent = () => {
        switch (transition) {
            case 'slide':
                const SlideTransition = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Slide>>((props, ref) => (
                    <Slide direction="down" ref={ref} {...props} />
                ));
                SlideTransition.displayName = 'SlideTransition';
                return SlideTransition;
            case 'zoom':
                return Zoom;
            case 'grow':
                return Grow;
            case 'fade':
            default:
                return Fade;
        }
    };

    const TransitionComponent = getTransitionComponent();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={size}
            fullWidth={fullWidth}
            TransitionComponent={TransitionComponent}
            transitionDuration={transitionDuration}
            keepMounted={false}
            disablePortal={false}
            disableEnforceFocus={true}
            disableAutoFocus={true}
            disableRestoreFocus={true}
            hideBackdrop={false}
            onTransitionExited={() => {
                // Additional cleanup when transition is complete (only on client)
                if (typeof window !== 'undefined') {
                    document.body.style.pointerEvents = '';
                    document.documentElement.style.pointerEvents = '';
                }
            }}
            BackdropProps={{
                sx: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                onClick: (event) => {
                    if (!disableBackdropClick) {
                        handleClose(event, 'backdropClick');
                    }
                }
            }}
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    maxHeight,
                },
            }}
            sx={{
                '& .MuiDialog-paper': {
                    transition: `transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                    willChange: 'transform, opacity',
                },
                '& .MuiBackdrop-root': {
                    transition: `opacity ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                    willChange: 'opacity',
                },
                // Enhanced transition styles based on transition type
                ...(transition === 'slide' && {
                    '& .MuiDialog-paper': {
                        transition: `transform ${transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                    },
                }),
                ...(transition === 'zoom' && {
                    '& .MuiDialog-paper': {
                        transition: `transform ${transitionDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity ${transitionDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
                    },
                }),
                ...(transition === 'grow' && {
                    '& .MuiDialog-paper': {
                        transition: `transform ${transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                        transformOrigin: 'center center',
                    },
                }),
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
