'use client';

import React from 'react';
import {
    Card,
    CardContent,
    Box,
    Typography,
    Avatar,
    AvatarGroup,
    Chip,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Group as GroupIcon,
    Assignment as ProjectIcon,
} from '@mui/icons-material';
import { Team } from '@/store/slices/team';

interface TeamCardProps {
    team: Team;
    onTeamClick: (teamId: string) => void;
    onMenuClick: (event: React.MouseEvent<HTMLElement>, team: Team) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onTeamClick, onMenuClick }) => {
    const getAvatarColor = (name: string) => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const getStatusColor = (status: string) => {
        return status === 'active' ? 'success' : 'default';
    };

    return (
        <Card
            sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                    borderColor: 'primary.main',
                },
            }}
            onClick={() => onTeamClick(team.id)}
        >
            <CardContent sx={{ p: 3 }}>
                {/* Header with Team Name and Menu */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{
                                fontSize: '1.1rem',
                                lineHeight: 1.3,
                                mb: 0.5,
                                color: 'text.primary',
                                wordBreak: 'break-word',
                            }}
                        >
                            {team.name}
                        </Typography>
                        <Chip
                            label={team.status}
                            size="small"
                            color={getStatusColor(team.status)}
                            sx={{
                                textTransform: 'capitalize',
                                fontWeight: 500,
                                fontSize: '0.75rem',
                            }}
                        />
                    </Box>
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            onMenuClick(e, team);
                        }}
                        sx={{ color: 'text.secondary' }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Box>

                {/* Description */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 3,
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minHeight: '2.4em',
                    }}
                >
                    {team.description}
                </Typography>

                {/* Team Members */}
                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <GroupIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            Team Members ({team.members.length})
                        </Typography>
                    </Box>
                    
                    {team.members.length > 0 ? (
                        <AvatarGroup 
                            max={4} 
                            sx={{ 
                                justifyContent: 'flex-start',
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    fontSize: '0.875rem',
                                    fontWeight: 'bold',
                                    border: '2px solid white',
                                },
                            }}
                        >
                            {team.members.map((member) => (
                                <Tooltip key={member.id} title={`${member.name} (${member.role})`}>
                                    <Avatar
                                        sx={{
                                            bgcolor: getAvatarColor(member.name),
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {member.name.charAt(0)}
                                    </Avatar>
                                </Tooltip>
                            ))}
                        </AvatarGroup>
                    ) : (
                        <Typography variant="body2" color="text.secondary" fontStyle="italic">
                            No members assigned
                        </Typography>
                    )}
                </Box>

                {/* Projects Count */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ProjectIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                            {team.projectsCount} Projects
                        </Typography>
                    </Box>
                    
                    <Typography variant="caption" color="text.secondary">
                        Updated {new Date(team.updatedAt).toLocaleDateString()}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TeamCard;
