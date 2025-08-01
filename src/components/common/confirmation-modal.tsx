'use client';

import React from 'react';
import { Typography } from '@mui/material';
import Button from '@/components/form-controls/button';
import { Modal } from '@/components/common';

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    subtitle?: string;
    message: string | React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: 'primary' | 'error' | 'warning' | 'success';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
    isLoading?: boolean;
    transition?: 'fade' | 'slide' | 'zoom' | 'grow';
    transitionDuration?: number;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    open,
    onClose,
    onConfirm,
    title,
    subtitle,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmColor = 'primary',
    size = 'sm',
    isLoading = false,
    transition = 'zoom',
    transitionDuration = 250,
}) => {
    const getSxStyles = () => {
        switch (confirmColor) {
            case 'error':
                return {
                    bgcolor: 'error.main',
                    '&:hover': { bgcolor: 'error.dark' },
                };
            case 'warning':
                return {
                    bgcolor: 'warning.main',
                    '&:hover': { bgcolor: 'warning.dark' },
                };
            case 'success':
                return {
                    bgcolor: 'success.main',
                    '&:hover': { bgcolor: 'success.dark' },
                };
            default:
                return {};
        }
    };

    const actions = (
        <>
            <Button
                variant="outlined"
                onClick={onClose}
                disabled={isLoading}
            >
                {cancelText}
            </Button>
            <Button
                variant="filled"
                onClick={onConfirm}
                loading={isLoading}
                sx={getSxStyles()}
            >
                {confirmText}
            </Button>
        </>
    );

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
            subtitle={subtitle}
            size={size}
            actions={actions}
            disableBackdropClick={isLoading}
            disableEscapeKeyDown={isLoading}
            transition={transition}
            transitionDuration={transitionDuration}
        >
            {typeof message === 'string' ? (
                <Typography>{message}</Typography>
            ) : (
                message
            )}
        </Modal>
    );
};

export default ConfirmationModal;
