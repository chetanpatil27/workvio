'use client';

import React from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Chip,
    LinearProgress,
    Avatar,
    IconButton,
    Divider,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Add as AddIcon,
    BugReport as BugIcon,
    Assignment as TaskIcon,
    MenuBook as StoryIcon,
    MoreVert as MoreIcon,
    Person as PersonIcon,
    Schedule as ScheduleIcon,
    TrendingUp as ProgressIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';

const statusColors = {
    planning: '#ed6c02',
    active: '#2e7d32',
    completed: '#1976d2',
    cancelled: '#d32f2f',
};

const ticketTypeIcons = {
    task: TaskIcon,
    bug: BugIcon,
    story: StoryIcon,
};

const ticketStatusColors = {
    todo: '#757575',
    inprogress: '#1976d2',
    qa: '#ed6c02',
    completed: '#2e7d32',
};

interface Ticket {
    id: string;
    title: string;
    type: 'task' | 'bug' | 'story';
    status: 'todo' | 'inprogress' | 'qa' | 'completed';
    assignee: string;
    priority: 'low' | 'medium' | 'high';
    storyPoints: number;
}

// Sample tickets for demonstration
const sampleTickets: Ticket[] = [
    {
        id: 'ECOM-101',
        title: 'Implement user registration form',
        type: 'task',
        status: 'completed',
        assignee: 'John Doe',
        priority: 'high',
        storyPoints: 5,
    },
    {
        id: 'ECOM-102',
        title: 'Add OAuth login integration',
        type: 'story',
        status: 'inprogress',
        assignee: 'Jane Smith',
        priority: 'high',
        storyPoints: 8,
    },
    {
        id: 'ECOM-103',
        title: 'Fix login validation bug',
        type: 'bug',
        status: 'qa',
        assignee: 'Mike Johnson',
        priority: 'medium',
        storyPoints: 3,
    },
    {
        id: 'ECOM-104',
        title: 'Implement 2FA setup',
        type: 'task',
        status: 'todo',
        assignee: 'Sarah Wilson',
        priority: 'medium',
        storyPoints: 8,
    },
];

export default function SprintDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { sprints } = useSelector((state: RootState) => state.sprint);
    const { projects } = useSelector((state: RootState) => state.project);

    const sprint = sprints.find(s => s.id === id);
    const project = sprint ? projects.find(p => p.id === sprint.projectId) : null;

    if (!sprint) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                    Sprint not found
                </Typography>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => router.push('/sprints')}
                    sx={{ mt: 2 }}
                >
                    Back to Sprints
                </Button>
            </Box>
        );
    }

    const calculateProgress = () => {
        if (!sprint.totalPoints || sprint.totalPoints === 0) return 0;
        return (sprint.completedPoints || 0) / sprint.totalPoints * 100;
    };

    const getTicketsByStatus = (status: string) => {
        return sampleTickets.filter(ticket => ticket.status === status);
    };

    const renderTicketCard = (ticket: Ticket) => {
        const IconComponent = ticketTypeIcons[ticket.type as keyof typeof ticketTypeIcons];

        return (
            <Card
                key={ticket.id}
                sx={{
                    mb: 2,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        boxShadow: 2,
                        transform: 'translateY(-1px)',
                        borderColor: 'primary.main',
                    }
                }}
            >
                <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconComponent sx={{ fontSize: 16, color: ticketStatusColors[ticket.status] }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                {ticket.id}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                                label={ticket.priority}
                                size="small"
                                color={ticket.priority === 'high' ? 'error' : ticket.priority === 'medium' ? 'warning' : 'default'}
                                variant="outlined"
                            />
                            <IconButton size="small">
                                <MoreIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>

                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                        {ticket.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                                {ticket.assignee.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" color="text.secondary">
                                {ticket.assignee}
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {ticket.storyPoints} pts
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    };

    return (
        <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton
                        onClick={() => router.push('/sprints')}
                        sx={{
                            mr: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: '6px',
                            padding: '8px',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {sprint.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {project?.name} • Sprint {sprint.id}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                            label={sprint.status}
                            sx={{
                                backgroundColor: statusColors[sprint.status],
                                color: 'white',
                                fontWeight: 600,
                                textTransform: 'capitalize',
                            }}
                        />
                        <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            size="small"
                        >
                            Edit
                        </Button>
                    </Box>
                </Box>

                {/* Sprint Info Cards */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)',
                        },
                        gap: 2,
                        mb: 3,
                    }}
                >
                    <Card
                        elevation={0}
                        sx={{
                            p: 2,
                            textAlign: 'center',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: '6px',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 40,
                                height: 40,
                                borderRadius: '8px',
                                backgroundColor: 'primary.main',
                                mx: 'auto',
                                mb: 2,
                            }}
                        >
                            <ScheduleIcon sx={{ color: 'white', fontSize: 20 }} />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            Duration
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {format(new Date(sprint.startDate), 'MMM dd')} - {format(new Date(sprint.endDate), 'MMM dd')}
                        </Typography>
                    </Card>

                    <Card
                        elevation={0}
                        sx={{
                            p: 2,
                            textAlign: 'center',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: '6px',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 40,
                                height: 40,
                                borderRadius: '8px',
                                backgroundColor: 'success.main',
                                mx: 'auto',
                                mb: 2,
                            }}
                        >
                            <ProgressIcon sx={{ color: 'white', fontSize: 20 }} />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            Progress
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {Math.round(calculateProgress())}%
                        </Typography>
                    </Card>

                    <Card
                        elevation={0}
                        sx={{
                            p: 2,
                            textAlign: 'center',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: '6px',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 40,
                                height: 40,
                                borderRadius: '8px',
                                backgroundColor: 'info.main',
                                mx: 'auto',
                                mb: 2,
                            }}
                        >
                            <TaskIcon sx={{ color: 'white', fontSize: 20 }} />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            Total Points
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {sprint.totalPoints || 0}
                        </Typography>
                    </Card>

                    <Card
                        elevation={0}
                        sx={{
                            p: 2,
                            textAlign: 'center',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: '6px',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 40,
                                height: 40,
                                borderRadius: '8px',
                                backgroundColor: 'warning.main',
                                mx: 'auto',
                                mb: 2,
                            }}
                        >
                            <PersonIcon sx={{ color: 'white', fontSize: 20 }} />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            Team Size
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {sampleTickets.length} tickets
                        </Typography>
                    </Card>
                </Box>

                {/* Sprint Goal */}
                <Card
                    elevation={0}
                    sx={{
                        p: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: '6px',
                        mb: 3,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        Sprint Goal
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {sprint.goal}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                Sprint Progress
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {sprint.completedPoints || 0} / {sprint.totalPoints || 0} points
                            </Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={calculateProgress()}
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: 4,
                                    backgroundColor: statusColors[sprint.status],
                                },
                            }}
                        />
                    </Box>
                </Card>
            </Box>

            {/* Kanban Board */}
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Sprint Board
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        lg: 'repeat(4, 1fr)',
                    },
                    gap: 3,
                    pb: 4,
                }}
            >
                {/* To Do Column */}
                <Card
                    elevation={0}
                    sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: '6px',
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            To Do
                        </Typography>
                        <Chip
                            label={getTicketsByStatus('todo').length}
                            size="small"
                            variant="outlined"
                        />
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {getTicketsByStatus('todo').map(renderTicketCard)}
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        fullWidth
                        sx={{ mt: 1, borderStyle: 'dashed' }}
                    >
                        Add Ticket
                    </Button>
                </Card>

                {/* In Progress Column */}
                <Card
                    elevation={0}
                    sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: '6px',
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            In Progress
                        </Typography>
                        <Chip
                            label={getTicketsByStatus('inprogress').length}
                            size="small"
                            color="primary"
                            variant="outlined"
                        />
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {getTicketsByStatus('inprogress').map(renderTicketCard)}
                </Card>

                {/* QA Column */}
                <Card
                    elevation={0}
                    sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: '6px',
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            QA
                        </Typography>
                        <Chip
                            label={getTicketsByStatus('qa').length}
                            size="small"
                            color="warning"
                            variant="outlined"
                        />
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {getTicketsByStatus('qa').map(renderTicketCard)}
                </Card>

                {/* Completed Column */}
                <Card
                    elevation={0}
                    sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: '6px',
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Completed
                        </Typography>
                        <Chip
                            label={getTicketsByStatus('completed').length}
                            size="small"
                            color="success"
                            variant="outlined"
                        />
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {getTicketsByStatus('completed').map(renderTicketCard)}
                </Card>
            </Box>
        </Box>
    );
}