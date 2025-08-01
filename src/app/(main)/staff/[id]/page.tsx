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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Divider,
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

    if (!staffMember) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
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

    const getAvatarColor = (name: string) => {
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton
                    onClick={() => router.back()}
                    sx={{ mr: 2 }}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Staff Details
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
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

            {/* Main Profile Card */}
            <Card sx={{ mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar
                            sx={{
                                bgcolor: getAvatarColor(staffMember.name),
                                width: 80,
                                height: 80,
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                mr: 3,
                            }}
                        >
                            {staffMember.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {staffMember.name}
                            </Typography>
                            <Chip
                                label={getGenderIcon(staffMember.gender)}
                                size="medium"
                                sx={{
                                    bgcolor: getGenderColor(staffMember.gender),
                                    color: 'white',
                                    fontWeight: 500,
                                }}
                            />
                        </Box>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    {/* Contact Information */}
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                        Contact Information
                    </Typography>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                        gap: 3,
                        mb: 3,
                    }}>
                        <Paper
                            sx={{
                                p: 3,
                                display: 'flex',
                                alignItems: 'center',
                                bgcolor: 'background.default',
                            }}
                        >
                            <EmailIcon sx={{ fontSize: 24, color: 'primary.main', mr: 2 }} />
                            <Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Email Address
                                </Typography>
                                <Typography variant="body1" fontWeight="500">
                                    {staffMember.email}
                                </Typography>
                            </Box>
                        </Paper>

                        <Paper
                            sx={{
                                p: 3,
                                display: 'flex',
                                alignItems: 'center',
                                bgcolor: 'background.default',
                            }}
                        >
                            <PhoneIcon sx={{ fontSize: 24, color: 'success.main', mr: 2 }} />
                            <Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Mobile Number
                                </Typography>
                                <Typography variant="body1" fontWeight="500">
                                    {staffMember.mobile}
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    {/* Timestamps */}
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                        Record Information
                    </Typography>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                        gap: 3,
                    }}>
                        <Paper
                            sx={{
                                p: 3,
                                display: 'flex',
                                alignItems: 'center',
                                bgcolor: 'background.default',
                            }}
                        >
                            <CalendarIcon sx={{ fontSize: 24, color: 'info.main', mr: 2 }} />
                            <Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Created Date
                                </Typography>
                                <Typography variant="body1" fontWeight="500">
                                    {format(new Date(staffMember.createdAt), 'MMMM dd, yyyy')}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {format(new Date(staffMember.createdAt), 'hh:mm a')}
                                </Typography>
                            </Box>
                        </Paper>

                        <Paper
                            sx={{
                                p: 3,
                                display: 'flex',
                                alignItems: 'center',
                                bgcolor: 'background.default',
                            }}
                        >
                            <AccessTimeIcon sx={{ fontSize: 24, color: 'warning.main', mr: 2 }} />
                            <Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Last Updated
                                </Typography>
                                <Typography variant="body1" fontWeight="500">
                                    {format(new Date(staffMember.updatedAt), 'MMMM dd, yyyy')}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {format(new Date(staffMember.updatedAt), 'hh:mm a')}
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => staffMember && staffDialog.openEditDialog(staffMember)}
                    sx={{ minWidth: 140 }}
                >
                    Edit Details
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteClick}
                    sx={{ minWidth: 140 }}
                >
                    Delete Staff
                </Button>
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

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Delete Staff Member</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete <strong>{staffMember.name}</strong>?
                        This action cannot be undone and will permanently remove all their information.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

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
            />
        </Box>
    );
}
