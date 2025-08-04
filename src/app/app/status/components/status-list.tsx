'use client';

import React from 'react';
import { Box, Typography, IconButton, Chip, Tooltip } from '@mui/material';
import { MoreVert as MoreIcon, DragIndicator as DragIcon } from '@mui/icons-material';
import Button from '@/components/form-controls/button';
import { CommonCard } from '@/components/common';
import type { TicketStatus } from '@/store/slices/status';

interface StatusListProps {
    statuses: TicketStatus[];
    onMenuClick: (event: React.MouseEvent<HTMLElement>, status: TicketStatus) => void;
    onCreateStatus: () => void;
}

const StatusList: React.FC<StatusListProps> = ({
    statuses,
    onMenuClick,
    onCreateStatus,
}) => {
    if (statuses.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    No statuses found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
                    Create your first ticket status to start organizing your workflow. You can customize colors and descriptions for each status.
                </Typography>
                <Button variant="filled" onClick={onCreateStatus}>
                    Create First Status
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'grid', gap: 2 }}>
            {statuses.map((status) => (
                <CommonCard
                    key={status.id}
                    cardVariant="outlined"
                    padding="large"
                    sx={{
                        borderRadius: '12px',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {/* Drag Handle */}
                        <DragIcon sx={{ color: 'text.disabled', cursor: 'grab' }} />

                        {/* Status Color Indicator */}
                        <Box
                            sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                bgcolor: status.color,
                                flexShrink: 0,
                            }}
                        />

                        {/* Status Info */}
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <Typography
                                    variant="h6"
                                    fontWeight="600"
                                    sx={{
                                        fontSize: '1.1rem',
                                        opacity: status.active ? 1 : 0.5,
                                        textDecoration: status.active ? 'none' : 'line-through',
                                    }}
                                >
                                    {status.name}
                                </Typography>

                                {status.isDefault && (
                                    <Chip
                                        label="Default"
                                        size="small"
                                        sx={{
                                            bgcolor: 'success.light',
                                            color: 'success.contrastText',
                                            fontWeight: 500,
                                            fontSize: '0.7rem',
                                            height: 20,
                                        }}
                                    />
                                )}

                                {!status.active && (
                                    <Chip
                                        label="Inactive"
                                        size="small"
                                        sx={{
                                            bgcolor: 'error.light',
                                            color: 'error.contrastText',
                                            fontWeight: 500,
                                            fontSize: '0.7rem',
                                            height: 20,
                                        }}
                                    />
                                )}
                            </Box>

                            {status.description && (
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                                    {status.description}
                                </Typography>
                            )}
                        </Box>

                        {/* Status Order */}
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: '6px',
                                px: 1.5,
                                py: 0.5,
                                fontSize: '0.75rem',
                                fontWeight: 500,
                            }}
                        >
                            #{status.order}
                        </Typography>

                        {/* Menu Button */}
                        <Tooltip title="More options">
                            <IconButton
                                data-menu-button="true"
                                onClick={(e) => onMenuClick(e, status)}
                                size="small"
                                sx={{ color: 'text.secondary', ml: 1 }}
                            >
                                <MoreIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </CommonCard>
            ))}

            {/* Add Status Button */}
            <CommonCard
                cardVariant="outlined"
                padding="large"
                interactive
                onClick={onCreateStatus}
                sx={{
                    borderRadius: '12px',
                    border: '2px dashed',
                    borderColor: 'divider',
                    bgcolor: 'background.default',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'primary.lighter',
                    },
                }}
            >
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary" fontWeight="500">
                        + Add New Status
                    </Typography>
                </Box>
            </CommonCard>
        </Box>
    );
};

export default StatusList;
