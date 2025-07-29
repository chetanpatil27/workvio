'use client';

import React from 'react';
import { Box, Card, Typography, SxProps, Theme } from '@mui/material';

export interface CountCardProps {
    /** The main value/count to display */
    value: number | string;
    /** The label/title for the count */
    label: string;
    /** The icon component to display */
    icon: React.ReactNode;
    /** Background color for the icon container (rgba format recommended) */
    iconBgColor?: string;
    /** Color for the icon */
    iconColor?: string;
    /** Custom styling for the card */
    sx?: SxProps<Theme>;
    /** Click handler for the card */
    onClick?: () => void;
    /** Whether the card should show hover effects */
    interactive?: boolean;
}

const CountCard: React.FC<CountCardProps> = ({
    value,
    label,
    icon,
    iconBgColor = 'rgba(25, 118, 210, 0.1)',
    iconColor = 'primary.main',
    sx = {},
    onClick,
    interactive = false,
    ...props
}) => {
    return (
        <Card
            sx={{
                p: 3,
                borderRadius: '6px',
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                transition: 'all 0.2s ease',
                cursor: interactive || onClick ? 'pointer' : 'default',
                '&:hover': {
                    boxShadow: interactive || onClick ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                    ...(interactive || onClick ? { transform: 'translateY(-1px)' } : {}),
                },
                ...sx
            }}
            onClick={onClick}
            {...props}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                    bgcolor: iconBgColor,
                    p: 1.5,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 48,
                    minHeight: 48,
                    '& > *': {
                        color: iconColor,
                        fontSize: '1.5rem !important',
                    }
                }}>
                    {icon}
                </Box>
                <Box>
                    <Typography variant="h4" fontWeight="600" color="text.primary">
                        {value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        {label}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
};

export default CountCard;
