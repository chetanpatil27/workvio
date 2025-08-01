'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Button,
    Paper,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    MoreVert as MoreIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    CalendarToday as CalendarIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Person as PersonIcon,
    AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { useRouter, useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeStaff } from '@/store/slices/staff';
import { format } from 'date-fns';
import { StaffDialog } from '../components';
import { useStaffDialog } from '../hooks';
import { ConfirmationModal } from '@/components/common';
import { useTheme } from '@/components/providers/theme-provider';

export default function StaffDetailsPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const params = useParams();
    const staffId = params.id as string;

    const staffMember = useSelector((state: RootState) =>
        state.staff.staff.find(s => s.id === staffId)
    );

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Staff dialog hook
    const staffDialog = useStaffDialog();
    const { darkMode } = useTheme();

    if (!staffMember) {
        return (
            <Box sx={{ 
                minHeight: '100vh',
                bgcolor: darkMode ? 'background.default' : 'grey.50',
                p: 3, 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: '6px',
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        p: 4,
                        textAlign: 'center',
                        maxWidth: 400,
                    }}
                >
                    <PersonIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Staff Member Not Found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        The staff member you&apos;re looking for doesn&apos;t exist or has been removed.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => router.push('/staff')}
                    >
                        Back to Staff List
                    </Button>
                </Card>
            </Box>
        );
    }

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        if (staffMember) {
            staffDialog.openEditDialog(staffMember);
        }
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        dispatch(removeStaff(staffId));
        setDeleteDialogOpen(false);
        router.push('/staff');
    };

    const getGenderColor = (gender: string) => {
        switch (gender) {
            case 'male': return '#1976d2';
            case 'female': return '#e91e63';
            case 'other': return '#9c27b0';
            default: return '#757575';
        }
    };

    const getGenderIcon = (gender: string) => {
        return gender.charAt(0).toUpperCase() + gender.slice(1);
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: darkMode ? 'background.default' : 'grey.50',
            py: { xs: 2, sm: 3 },
            px: { xs: 1, sm: 2, md: 3 }
        }}>
            {/* Header */}
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: { xs: 2, md: 3 },
                px: { xs: 1, sm: 0 }
            }}>
                <IconButton
                    onClick={() => router.back()}
                    sx={{ mr: 2 }}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" fontWeight="700" sx={{ 
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                        mb: 0.5 
                    }}>
                        Staff Details
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                        View and manage staff member information
                    </Typography>
                </Box>
                <IconButton
                    onClick={handleMenuOpen}
                    sx={{ color: 'text.secondary' }}
                >
                    <MoreIcon />
                </IconButton>
            </Box>

            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, sm: 2.5, md: 3 }
            }}>
                {/* Personal Information Card - Full Width */}
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: '6px',
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                    }}
                >
                    <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            mb: { xs: 2.5, md: 3 } 
                        }}>
                            <Typography variant="h6" sx={{ 
                                fontWeight: 600, 
                                fontSize: { xs: '1rem', sm: '1.25rem' } 
                            }}>
                                Personal Information
                            </Typography>
                            <IconButton 
                                size="small"
                                onClick={() => staffMember && staffDialog.openEditDialog(staffMember)}
                            >
                                <EditIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(4, 1fr)'
                            },
                            gap: { xs: 2, sm: 2.5, md: 3 }
                        }}>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ 
                                    mb: 0.5, 
                                    fontSize: { xs: '0.8rem', sm: '0.875rem' } 
                                }}>
                                    Full Name
                                </Typography>
                                <Typography variant="body1" sx={{ 
                                    fontWeight: 500, 
                                    fontSize: { xs: '0.9rem', sm: '1rem' } 
                                }}>
                                    {staffMember.name}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ 
                                    mb: 0.5, 
                                    fontSize: { xs: '0.8rem', sm: '0.875rem' } 
                                }}>
                                    Email Address
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <EmailIcon sx={{ 
                                        fontSize: { xs: '0.9rem', sm: '1rem' }, 
                                        color: 'text.secondary' 
                                    }} />
                                    <Typography variant="body1" sx={{ 
                                        fontWeight: 500, 
                                        fontSize: { xs: '0.9rem', sm: '1rem' }, 
                                        wordBreak: 'break-word' 
                                    }}>
                                        {staffMember.email}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ 
                                    mb: 0.5, 
                                    fontSize: { xs: '0.8rem', sm: '0.875rem' } 
                                }}>
                                    Mobile Number
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PhoneIcon sx={{ 
                                        fontSize: { xs: '0.9rem', sm: '1rem' }, 
                                        color: 'text.secondary' 
                                    }} />
                                    <Typography variant="body1" sx={{ 
                                        fontWeight: 500, 
                                        fontSize: { xs: '0.9rem', sm: '1rem' } 
                                    }}>
                                        {staffMember.mobile}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ 
                                    mb: 0.5, 
                                    fontSize: { xs: '0.8rem', sm: '0.875rem' } 
                                }}>
                                    Gender
                                </Typography>
                                <Chip
                                    label={getGenderIcon(staffMember.gender)}
                                    size="small"
                                    sx={{
                                        bgcolor: getGenderColor(staffMember.gender),
                                        color: 'white',
                                        fontWeight: 600,
                                        textTransform: 'capitalize',
                                        fontSize: { xs: '0.7rem', sm: '0.75rem' }
                                    }}
                                />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                {/* Profile Overview and Record Information Layout */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' },
                    gap: { xs: 2, sm: 2.5, md: 3 }
                }}>
                    {/* Profile Overview Card */}
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: '6px',
                            border: '1px solid',
                            borderColor: 'divider',
                            bgcolor: 'background.paper',
                            overflow: 'hidden',
                            height: 'fit-content',
                        }}
                    >
                        {/* Profile Header with Gradient Background */}
                        <Box
                            sx={{
                                background: darkMode
                                    ? 'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)'
                                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                p: { xs: 2.5, sm: 3 },
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                                    opacity: 0.3,
                                },
                            }}
                        >
                            <Box sx={{ position: 'relative', textAlign: 'center' }}>
                                <Avatar
                                    sx={{
                                        width: { xs: 70, sm: 80 },
                                        height: { xs: 70, sm: 80 },
                                        fontSize: { xs: '1.75rem', sm: '2rem' },
                                        background: darkMode
                                            ? 'linear-gradient(45deg, #3a3a3a 30%, #2a2a2a 90%)'
                                            : 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
                                        color: darkMode ? '#90caf9' : '#1976d2',
                                        fontWeight: 700,
                                        mx: 'auto',
                                        mb: 2,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    {staffMember.name.charAt(0).toUpperCase()}
                                </Avatar>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'white',
                                        textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                                        mb: 0.5,
                                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                                    }}
                                >
                                    {staffMember.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'rgba(255,255,255,0.9)',
                                        mb: 2,
                                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                        wordBreak: 'break-word',
                                        px: 1,
                                    }}
                                >
                                    {staffMember.email}
                                </Typography>
                                <Chip
                                    label={getGenderIcon(staffMember.gender)}
                                    size="small"
                                    sx={{
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        color: 'white',
                                        textTransform: 'capitalize',
                                        fontWeight: 600,
                                        backdropFilter: 'blur(10px)',
                                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                    }}
                                />
                            </Box>
                        </Box>

                        <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                            <Typography variant="h6" sx={{ 
                                fontWeight: 600, 
                                mb: 2, 
                                fontSize: { xs: '1rem', sm: '1.25rem' } 
                            }}>
                                Quick Actions
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    onClick={() => staffMember && staffDialog.openEditDialog(staffMember)}
                                    fullWidth
                                    sx={{ 
                                        py: 1.5,
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }}
                                >
                                    Edit Details
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={handleDeleteClick}
                                    fullWidth
                                    sx={{ 
                                        py: 1.5,
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }}
                                >
                                    Delete Staff
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Record Information Card */}
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: '6px',
                            border: '1px solid',
                            borderColor: 'divider',
                            bgcolor: 'background.paper',
                        }}
                    >
                        <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                            <Typography variant="h6" sx={{ 
                                fontWeight: 600, 
                                mb: { xs: 2, sm: 3 }, 
                                fontSize: { xs: '1rem', sm: '1.25rem' } 
                            }}>
                                Record Information
                            </Typography>

                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                                gap: { xs: 2, sm: 3 }
                            }}>
                                <Paper
                                    sx={{
                                        p: { xs: 2, sm: 3 },
                                        display: 'flex',
                                        alignItems: 'center',
                                        bgcolor: 'background.default',
                                        borderRadius: '8px',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <CalendarIcon sx={{ 
                                        fontSize: { xs: 20, sm: 24 }, 
                                        color: 'info.main', 
                                        mr: 2 
                                    }} />
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{
                                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                            mb: 0.5
                                        }}>
                                            Created Date
                                        </Typography>
                                        <Typography variant="body1" sx={{
                                            fontWeight: 500,
                                            fontSize: { xs: '0.875rem', sm: '1rem' }
                                        }}>
                                            {format(new Date(staffMember.createdAt), 'MMMM dd, yyyy')}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{
                                            fontSize: { xs: '0.7rem', sm: '0.75rem' }
                                        }}>
                                            {format(new Date(staffMember.createdAt), 'hh:mm a')}
                                        </Typography>
                                    </Box>
                                </Paper>

                                <Paper
                                    sx={{
                                        p: { xs: 2, sm: 3 },
                                        display: 'flex',
                                        alignItems: 'center',
                                        bgcolor: 'background.default',
                                        borderRadius: '8px',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <AccessTimeIcon sx={{ 
                                        fontSize: { xs: 20, sm: 24 }, 
                                        color: 'warning.main', 
                                        mr: 2 
                                    }} />
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{
                                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                            mb: 0.5
                                        }}>
                                            Last Updated
                                        </Typography>
                                        <Typography variant="body1" sx={{
                                            fontWeight: 500,
                                            fontSize: { xs: '0.875rem', sm: '1rem' }
                                        }}>
                                            {format(new Date(staffMember.updatedAt), 'MMMM dd, yyyy')}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{
                                            fontSize: { xs: '0.7rem', sm: '0.75rem' }
                                        }}>
                                            {format(new Date(staffMember.updatedAt), 'hh:mm a')}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/* Context Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleEdit}>
                    <EditIcon sx={{ mr: 1, fontSize: 20 }} />
                    Edit Details
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                    <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
                    Delete Staff
                </MenuItem>
            </Menu>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Staff Member"
                subtitle="This action cannot be undone"
                message={
                    <>
                        Are you sure you want to delete <strong>{staffMember.name}</strong>?
                        This action cannot be undone and will permanently remove all their information.
                    </>
                }
                confirmText="Delete"
                confirmColor="error"
                size="sm"
                transition="zoom"
                transitionDuration={250}
            />

            {/* Staff Dialog */}
            <StaffDialog
                open={staffDialog.isOpen}
                isEditing={staffDialog.isEditing}
                formData={staffDialog.formData}
                errors={staffDialog.errors}
                isSubmitting={staffDialog.isSubmitting}
                onClose={staffDialog.closeDialog}
                onSave={staffDialog.handleSave}
                onFormDataChange={staffDialog.handleFormDataChange}
                transition="slide"
                transitionDuration={300}
            />
        </Box>
    );
}
