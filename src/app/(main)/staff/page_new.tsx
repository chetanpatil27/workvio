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
    Group as GroupIcon,
    Business as BusinessIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { Staff, removeStaff } from '@/store/slices/staff';
import { useRouter } from 'next/navigation';

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

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, staffMember: Staff) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setSelectedStaff(staffMember);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedStaff(null);
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

    const handleViewDetails = () => {
        if (selectedStaff) {
            router.push(`/staff/${selectedStaff.id}`);
        }
        handleMenuClose();
    };

    const getAvatarColor = (name: string) => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const getGenderColor = (gender: string) => {
        switch (gender.toLowerCase()) {
            case 'male': return 'primary';
            case 'female': return 'secondary';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 4
            }}>
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
                        bgcolor: 'grey.900',
                        '&:hover': {
                            bgcolor: 'grey.800',
                        },
                        borderRadius: 2,
                        px: 3,
                        py: 1.5,
                    }}
                >
                    Add Staff
                </Button>
            </Box>

            {/* Stats Cards */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
                gap: 3,
                mb: 4
            }}>
                <Card sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            bgcolor: 'primary.light',
                            p: 1.5,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <GroupIcon sx={{ color: 'primary.main' }} />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="bold">
                                {staff.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Total Staff
                            </Typography>
                        </Box>
                    </Box>
                </Card>

                <Card sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            bgcolor: 'success.light',
                            p: 1.5,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <PersonIcon sx={{ color: 'success.main' }} />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="bold">
                                {staff.filter(s => s.gender.toLowerCase() === 'male').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Male
                            </Typography>
                        </Box>
                    </Box>
                </Card>

                <Card sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            bgcolor: 'info.light',
                            p: 1.5,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <PersonIcon sx={{ color: 'info.main' }} />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="bold">
                                {staff.filter(s => s.gender.toLowerCase() === 'female').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Female
                            </Typography>
                        </Box>
                    </Box>
                </Card>

                <Card sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            bgcolor: 'warning.light',
                            p: 1.5,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <BusinessIcon sx={{ color: 'warning.main' }} />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="bold">
                                {new Set(staff.map(s => s.department || 'Unknown')).size}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Departments
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            </Box>

            {/* Search and Filter */}
            <Box sx={{ mb: 4 }}>
                <TextField
                    placeholder="Search staff by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="medium"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        maxWidth: 500,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        },
                    }}
                />
            </Box>

            {/* Staff Grid */}
            {filteredStaff.length === 0 ? (
                <Card sx={{
                    p: 8,
                    textAlign: 'center',
                    borderRadius: 3,
                    border: '2px dashed',
                    borderColor: 'divider',
                    bgcolor: 'background.default'
                }}>
                    <GroupIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                        {searchTerm ? 'No staff found' : 'No staff members yet'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {searchTerm
                            ? 'Try adjusting your search criteria'
                            : 'Add your first staff member to get started.'
                        }
                    </Typography>
                    {!searchTerm && (
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => router.push('/staff/create')}
                            sx={{
                                bgcolor: 'grey.900',
                                '&:hover': {
                                    bgcolor: 'grey.800',
                                }
                            }}
                        >
                            Add Staff
                        </Button>
                    )}
                </Card>
            ) : (
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                    gap: 3
                }}>
                    {filteredStaff.map((member) => (
                        <Card
                            key={member.id}
                            sx={{
                                borderRadius: 3,
                                border: '1px solid',
                                borderColor: 'divider',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 4,
                                }
                            }}
                            onClick={() => router.push(`/staff/${member.id}`)}
                        >
                            <CardContent sx={{ p: 3 }}>
                                {/* Staff Header */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: getAvatarColor(member.name),
                                                width: 56,
                                                height: 56,
                                                fontSize: '1.5rem',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                                {member.name}
                                            </Typography>
                                            <Chip
                                                label={member.gender}
                                                color={getGenderColor(member.gender) as 'primary' | 'secondary' | 'default'}
                                                size="small"
                                                sx={{
                                                    borderRadius: 1,
                                                    textTransform: 'capitalize',
                                                    fontSize: '0.75rem',
                                                }}
                                            />
                                        </Box>
                                    </Box>

                                    <IconButton
                                        onClick={(e) => handleMenuClick(e, member)}
                                        size="small"
                                    >
                                        <MoreIcon />
                                    </IconButton>
                                </Box>

                                {/* Contact Information */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {member.email}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {member.mobile}
                                        </Typography>
                                    </Box>
                                    {member.department && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <BusinessIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {member.department}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}

            {/* Context Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleViewDetails}>
                    <ViewIcon sx={{ mr: 1 }} />
                    View Details
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <EditIcon sx={{ mr: 1 }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                    <DeleteIcon sx={{ mr: 1 }} />
                    Delete
                </MenuItem>
            </Menu>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                PaperProps={{
                    sx: { borderRadius: 3 }
                }}
            >
                <DialogTitle sx={{ fontWeight: 600 }}>
                    Delete Staff Member
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete <strong>{selectedStaff?.name}</strong>?
                        This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 1 }}>
                    <Button
                        onClick={() => setDeleteDialogOpen(false)}
                        sx={{ borderRadius: 2 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteConfirm}
                        sx={{ borderRadius: 2 }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
