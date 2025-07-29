'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    Chip,
    IconButton,
    Button,
    LinearProgress,
    Paper,
    Tab,
    Tabs,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Breadcrumbs,
    Link,
    Divider,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Settings as SettingsIcon,
    Group as GroupIcon,
    TrendingUp as TrendingUpIcon,
    Assignment as AssignmentIcon,
    CheckCircle as CheckCircleIcon,
    BugReport as BugReportIcon,
    Task as TaskIcon,
    MenuBook as StoryIcon,
    CalendarToday as CalendarIcon,
    DateRange as DateRangeIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { format } from 'date-fns';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`project-tabpanel-${index}`}
            aria-labelledby={`project-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

export default function ProjectDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;
    const [tabValue, setTabValue] = useState(0);

    const { projects } = useSelector((state: RootState) => state.project);
    const { sprints } = useSelector((state: RootState) => state.sprint);
    const { tickets } = useSelector((state: RootState) => state.ticket);

    const project = projects.find(p => p.id === projectId);
    const projectSprints = sprints.filter(s => s.projectId === projectId);
    const projectTickets = tickets.filter(t => t.projectId === projectId);

    if (!project) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h5" color="text.secondary">
                    Project not found
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => router.push('/projects')}
                    sx={{ mt: 2 }}
                >
                    Back to Projects
                </Button>
            </Box>
        );
    }

    const getProjectProgress = () => {
        if (projectSprints.length === 0) return 0;
        const completedSprints = projectSprints.filter(sprint => sprint.status === 'completed').length;
        return (completedSprints / projectSprints.length) * 100;
    };

    const getTicketsByType = (type: string) => {
        return projectTickets.filter(ticket => ticket.type === type).length;
    };

    const getTicketsByStatus = (status: string) => {
        return projectTickets.filter(ticket => ticket.status === status).length;
    };

    const statusColors = {
        active: 'success',
        inactive: 'warning',
        archived: 'default',
        completed: 'info',
        'on-hold': 'warning',
    } as const;

    const sprintStatusColors = {
        planning: 'default',
        active: 'primary',
        completed: 'success',
        cancelled: 'error',
    } as const;

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton
                        onClick={() => router.push('/projects')}
                        sx={{ mr: 1 }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Avatar
                        sx={{
                            bgcolor: project.color,
                            color: 'white',
                            fontWeight: 600,
                            width: 48,
                            height: 48,
                            fontSize: '1.2rem',
                            mr: 2,
                        }}
                    >
                        {project.key}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {project.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {project.description}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                            label={project.status}
                            color={statusColors[project.status]}
                            sx={{ textTransform: 'capitalize' }}
                        />
                        <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            size="small"
                        >
                            Edit
                        </Button>
                        <IconButton>
                            <SettingsIcon />
                        </IconButton>
                    </Box>
                </Box>

                {/* Stats Overview */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)',
                        },
                        gap: 3,
                        mb: 4,
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            textAlign: 'center',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                        }}
                    >
                        <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2 }}>
                            <AssignmentIcon />
                        </Avatar>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {projectSprints.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total Sprints
                        </Typography>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            textAlign: 'center',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                        }}
                    >
                        <Avatar sx={{ bgcolor: 'success.main', mx: 'auto', mb: 2 }}>
                            <TrendingUpIcon />
                        </Avatar>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {projectSprints.filter(s => s.status === 'active').length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Active Sprints
                        </Typography>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            textAlign: 'center',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                        }}
                    >
                        <Avatar sx={{ bgcolor: 'info.main', mx: 'auto', mb: 2 }}>
                            <TaskIcon />
                        </Avatar>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {projectTickets.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total Tickets
                        </Typography>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            textAlign: 'center',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                        }}
                    >
                        <Avatar sx={{ bgcolor: 'warning.main', mx: 'auto', mb: 2 }}>
                            <GroupIcon />
                        </Avatar>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {project?.members?.length || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Team Members
                        </Typography>
                    </Paper>
                </Box>

                {/* Progress */}
                <Box sx={{ mt: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            Project Progress
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {Math.round(getProjectProgress())}%
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={getProjectProgress()}
                        sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            '& .MuiLinearProgress-bar': {
                                borderRadius: 4,
                                backgroundColor: project.color,
                            },
                        }}
                    />
                </Box>
            </Box>

            {/* Tabs */}
            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Tabs
                    value={tabValue}
                    onChange={(_, newValue) => setTabValue(newValue)}
                    sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
                >
                    <Tab label="Sprints" />
                    <Tab label="Tickets" />
                    <Tab label="Team" />
                    <Tab label="Activity" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                    {/* Sprints */}
                    <Box sx={{ px: 3 }}>
                        {projectSprints.length > 0 ? (
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        md: 'repeat(2, 1fr)',
                                    },
                                    gap: 2,
                                }}
                            >
                                {projectSprints.map((sprint) => (
                                    <Card
                                        key={sprint.id}
                                        sx={{
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            '&:hover': {
                                                boxShadow: 2,
                                                transform: 'translateY(-2px)',
                                            }
                                        }}
                                        onClick={() => router.push(`/sprints/${sprint.id}`)}
                                    >
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    {sprint.name}
                                                </Typography>
                                                <Chip
                                                    label={sprint.status}
                                                    color={sprintStatusColors[sprint.status]}
                                                    size="small"
                                                    sx={{ textTransform: 'capitalize' }}
                                                />
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                {format(new Date(sprint.startDate), 'MMM dd')} - {format(new Date(sprint.endDate), 'MMM dd, yyyy')}
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Goal: {sprint.goal}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        ) : (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Typography variant="body1" color="text.secondary">
                                    No sprints found for this project
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    {/* Tickets Summary */}
                    <Box sx={{ px: 3 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: 'repeat(2, 1fr)',
                                    md: 'repeat(4, 1fr)',
                                },
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                }}
                            >
                                <TaskIcon sx={{ color: 'primary.main', mb: 1 }} />
                                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                    {getTicketsByType('task')}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Tasks
                                </Typography>
                            </Paper>

                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                }}
                            >
                                <BugReportIcon sx={{ color: 'error.main', mb: 1 }} />
                                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                    {getTicketsByType('bug')}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Bugs
                                </Typography>
                            </Paper>

                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                }}
                            >
                                <StoryIcon sx={{ color: 'success.main', mb: 1 }} />
                                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                    {getTicketsByType('story')}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Stories
                                </Typography>
                            </Paper>

                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                }}
                            >
                                <CheckCircleIcon sx={{ color: 'success.main', mb: 1 }} />
                                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                    {getTicketsByStatus('completed')}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Completed
                                </Typography>
                            </Paper>
                        </Box>

                        {projectTickets.length === 0 && (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Typography variant="body1" color="text.secondary">
                                    No tickets found for this project
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                    {/* Team Members */}
                    <Box sx={{ px: 3 }}>
                        <List>
                            {project.members?.map((memberId, index) => (
                                <ListItem key={memberId} divider={index < (project.members?.length || 0) - 1}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: `hsl(${index * 60}, 70%, 50%)` }}>
                                            {memberId.charAt(0).toUpperCase()}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`User ${memberId}`}
                                        secondary={index === 0 ? 'Project Lead' : 'Team Member'}
                                    />
                                    <Chip
                                        label="Active"
                                        color="success"
                                        size="small"
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={3}>
                    {/* Activity */}
                    <Box sx={{ px: 3 }}>
                        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                            Activity feed coming soon...
                        </Typography>
                    </Box>
                </TabPanel>
            </Paper>
        </Box>
    );
}
