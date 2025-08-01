'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Group as GroupIcon } from '@mui/icons-material';
import { Team } from '@/store/slices/team';
import TeamCard from './team-card';
import Button from '@/components/form-controls/button';

interface TeamListProps {
    teams: Team[];
    onTeamClick: (teamId: string) => void;
    onMenuClick: (event: React.MouseEvent<HTMLElement>, team: Team) => void;
    onCreateTeam: () => void;
}

const TeamList: React.FC<TeamListProps> = ({
    teams,
    onTeamClick,
    onMenuClick,
    onCreateTeam,
}) => {
    if (teams.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8,
                    px: 3,
                    textAlign: 'center',
                }}
            >
                <GroupIcon
                    sx={{
                        fontSize: 80,
                        color: 'text.secondary',
                        opacity: 0.5,
                        mb: 3,
                    }}
                />
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ mb: 2, color: 'text.primary' }}
                >
                    No Teams Found
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4, maxWidth: 400 }}
                >
                    You haven&apos;t created any teams yet. Start building your team structure by creating your first team.
                </Typography>
                <Button
                    variant="filled"
                    startIcon={<GroupIcon />}
                    onClick={onCreateTeam}
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        },
                    }}
                >
                    Create Your First Team
                </Button>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                },
                gap: 3,
            }}
        >
            {teams.map((team) => (
                <TeamCard
                    key={team.id}
                    team={team}
                    onTeamClick={onTeamClick}
                    onMenuClick={onMenuClick}
                />
            ))}
        </Box>
    );
};

export default TeamList;
