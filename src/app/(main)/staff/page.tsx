'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Avatar,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreIcon,
    Search as SearchIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { Staff, removeStaff } from '@/store/slices/staff';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export default function StaffPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { staff } = useSelector((state: RootState) => state.staff);

    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Filter staff based on search term
    const filteredStaff = staff.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.mobile.includes(searchTerm)
    );

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, staffMember: Staff) => {
        setAnchorEl(event.currentTarget);
        setSelectedStaff(staffMember);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedStaff(null);
    };

    const handleView = () => {
        if (selectedStaff) {
            router.push(`/staff/${selectedStaff.id}`);
        }
        handleMenuClose();
    };

    const handleEdit = () => {
        if (selectedStaff) {
            router.push(`/staff/${selectedStaff.id}/edit`);
        }
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        if (selectedStaff) {
            dispatch(removeStaff(selectedStaff.id));
        }
        setDeleteDialogOpen(false);
        setSelectedStaff(null);
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
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Staff Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your team members and their information
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => router.push('/staff/create')}
                    sx={{
                        bgcolor: 'primary.main',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        },
                    }}
                >
                    Add Staff Member
                </Button>
            </Box>

            {/* Search and Stats */}
            <Box sx={{ mb: 3 }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 3,
                    alignItems: 'center'
                }}>
                    <TextField
                        fullWidth
                        placeholder="Search staff by name, email, or mobile..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Card sx={{ p: 2, minWidth: 120, textAlign: 'center' }}>
                            <Typography variant="h6" color="primary.main" fontWeight="bold">
                                {staff.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Total Staff
                            </Typography>
                        </Card>
                        <Card sx={{ p: 2, minWidth: 120, textAlign: 'center' }}>
                            <Typography variant="h6" color="success.main" fontWeight="bold">
                                {staff.filter(s => s.gender === 'male').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Male
                            </Typography>
                        </Card>
                        <Card sx={{ p: 2, minWidth: 120, textAlign: 'center' }}>
                            <Typography variant="h6" color="error.main" fontWeight="bold">
                                {staff.filter(s => s.gender === 'female').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Female
                            </Typography>
                        </Card>
                    </Box>
                </Box>
            </Box>

            {/* Staff Grid */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                },
                gap: 3,
            }}>
                {filteredStaff.map((staffMember) => (
                    <Card
                        key={staffMember.id}
                        sx={{
                            height: '100%',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                            },
                        }}
                        onClick={() => router.push(`/staff/${staffMember.id}`)}
                    >
                        <CardContent sx={{ p: 3 }}>
                            {/* Header with avatar and menu */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: getAvatarColor(staffMember.name),
                                        width: 56,
                                        height: 56,
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {staffMember.name.charAt(0).toUpperCase()}
                                </Avatar>
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleMenuOpen(e, staffMember);
                                    }}
                                    sx={{ color: 'text.secondary' }}
                                >
                                    <MoreIcon />
                                </IconButton>
                            </Box>

                            {/* Staff Info */}
                            <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
                                {staffMember.name}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <EmailIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    {staffMember.email}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    {staffMember.mobile}
                                </Typography>
                            </Box>

                            {/* Gender and Date */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Chip
                                    label={getGenderIcon(staffMember.gender)}
                                    size="small"
                                    sx={{
                                        bgcolor: getGenderColor(staffMember.gender),
                                        color: 'white',
                                        fontWeight: 500,
                                    }}
                                />
                                <Typography variant="caption" color="text.secondary">
                                    {format(new Date(staffMember.createdAt), 'MMM dd, yyyy')}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Empty State */}
            {filteredStaff.length === 0 && (
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
                    <PersonIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {searchTerm ? 'No staff members found' : 'No staff members yet'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        {searchTerm
                            ? 'Try adjusting your search criteria'
                            : 'Get started by adding your first staff member'
                        }
                    </Typography>
                    {!searchTerm && (
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => router.push('/staff/create')}
                        >
                            Add Staff Member
                        </Button>
                    )}
                </Box>
            )}

            {/* Context Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleView}>
                    <ViewIcon sx={{ mr: 1, fontSize: 20 }} />
                    View Details
                </MenuItem>
                <MenuItem onClick={handleEdit}>
                    <EditIcon sx={{ mr: 1, fontSize: 20 }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                    <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
                    Delete
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
                        Are you sure you want to delete <strong>{selectedStaff?.name}</strong>?
                        This action cannot be undone.
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
        </Box>
    );
}
