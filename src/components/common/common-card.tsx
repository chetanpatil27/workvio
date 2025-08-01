'use client';

import React from 'react';
import { Card, CardProps, SxProps, Theme } from '@mui/material';

export interface CommonCardProps extends Omit<CardProps, 'sx' | 'variant'> {
    /** Custom styling for the card */
    sx?: SxProps<Theme>;
    /** Whether the card should show hover effects */
    interactive?: boolean;
    /** Whether the card has elevated styling */
    elevated?: boolean;
    /** Padding variant */
    padding?: 'none' | 'small' | 'medium' | 'large';
    /** Border variant */
    cardVariant?: 'outlined' | 'elevated' | 'flat';
    /** Hover effect intensity */
    hoverIntensity?: 'subtle' | 'normal' | 'strong';
    /** Click handler for the card */
    onClick?: () => void;
    /** Children content */
    children: React.ReactNode;
}

const CommonCard: React.FC<CommonCardProps> = ({
    children,
    interactive = false,
    elevated = false,
    padding = 'medium',
    cardVariant = 'outlined',
    hoverIntensity = 'normal',
    sx = {},
    onClick,
    ...props
}) => {
    // Padding values
    const paddingValues = {
        none: 0,
        small: 1.5,
        medium: 2.5,
        large: 3,
    };

    // Base card styles
    const baseStyles: SxProps<Theme> = {
        borderRadius: '8px',
        transition: 'all 0.2s ease-in-out',
        cursor: interactive || onClick ? 'pointer' : 'default',
        p: paddingValues[padding],
    };

    // Variant styles
    const getVariantStyles = (cardVariant: 'outlined' | 'elevated' | 'flat'): SxProps<Theme> => {
        switch (cardVariant) {
            case 'outlined':
                return {
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    boxShadow: 'none',
                };
            case 'elevated':
                return {
                    border: 'none',
                    bgcolor: 'background.paper',
                    boxShadow: elevated
                        ? '0 4px 20px rgba(0,0,0,0.1)'
                        : '0 2px 8px rgba(0,0,0,0.08)',
                };
            case 'flat':
                return {
                    border: 'none',
                    bgcolor: 'background.paper',
                    boxShadow: 'none',
                };
            default:
                return {};
        }
    };

    // Hover styles with intensity options
    const getHoverStyles = (intensity: 'subtle' | 'normal' | 'strong'): SxProps<Theme> => {
        if (!(interactive || onClick)) return {};

        const intensityMap = {
            subtle: {
                shadow: cardVariant === 'outlined' ? '0 2px 8px rgba(0,0,0,0.08)' : '0 4px 15px rgba(0,0,0,0.1)',
                transform: 'translateY(-1px)',
            },
            normal: {
                shadow: cardVariant === 'outlined' ? '0 8px 25px rgba(0,0,0,0.12)' : '0 10px 30px rgba(0,0,0,0.15)',
                transform: 'translateY(-2px)',
            },
            strong: {
                shadow: cardVariant === 'outlined' ? '0 12px 35px rgba(0,0,0,0.15)' : '0 15px 40px rgba(0,0,0,0.2)',
                transform: 'translateY(-4px)',
            },
        };

        const styles = intensityMap[intensity];

        return {
            '&:hover': {
                boxShadow: styles.shadow,
                transform: styles.transform,
                borderColor: cardVariant === 'outlined' ? 'primary.main' : undefined,
            },
            '&:active': {
                transform: 'translateY(0px)',
            },
        };
    };

    return (
        <Card
            sx={{
                ...baseStyles,
                ...getVariantStyles(cardVariant as 'outlined' | 'elevated' | 'flat'),
                ...getHoverStyles(hoverIntensity as 'subtle' | 'normal' | 'strong'),
                ...sx,
            } as SxProps<Theme>}
            onClick={onClick}
            {...props}
        >
            {children}
        </Card>
    );
};

export default CommonCard;
