'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Group, People, Assignment, TrendingUp } from '@mui/icons-material';
import { CountCard } from '@/components/common';
import Button from '@/components/form-controls/button';

interface TeamStats {
    total: number;
    active: number;
    inactive: number;
    totalMembers: number;
    totalProjects: number;
}

interface TeamHeaderProps {
    stats: TeamStats;
    onCreateTeam: () => void;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ stats, onCreateTeam }) => {
    return (
        <Box sx={{ mb: 4 }}>
            {/* Header with Title and Create Button */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                }}
            >
                <Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Teams Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your teams, members, and collaboration
                    </Typography>
                </Box>
                <Button
                    variant="filled"
                    onClick={onCreateTeam}
                    startIcon={<Group />}
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        px: 3,
                        py: 1.5,
                        borderRadius: 2,
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        },
                    }}
                >
                    Create Team
                </Button>
            </Box>

            {/* Stats Cards */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(5, 1fr)' },
                gap: 2.5,
            }}>
                <CountCard
                    value={stats.total}
                    label="Total Teams"
                    icon={<Group />}
                    iconBgColor="rgba(102, 126, 234, 0.1)"
                    iconColor="#667eea"
                />
                <CountCard
                    value={stats.active}
                    label="Active Teams"
                    icon={<TrendingUp />}
                    iconBgColor="rgba(76, 175, 80, 0.1)"
                    iconColor="success.main"
                />
                <CountCard
                    value={stats.totalMembers}
                    label="Total Members"
                    icon={<People />}
                    iconBgColor="rgba(79, 172, 254, 0.1)"
                    iconColor="#4facfe"
                />
                <CountCard
                    value={stats.totalProjects}
                    label="Total Projects"
                    icon={<Assignment />}
                    iconBgColor="rgba(67, 233, 123, 0.1)"
                    iconColor="#43e97b"
                />
                <CountCard
                    value={stats.inactive}
                    label="Inactive Teams"
                    icon={<Group />}
                    iconBgColor="rgba(250, 112, 154, 0.1)"
                    iconColor="#fa709a"
                />
            </Box>
        </Box>
    );
};

export default TeamHeader;
