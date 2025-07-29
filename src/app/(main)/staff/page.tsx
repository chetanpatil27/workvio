'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
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
    Tabs,
    Tab,
} from '@mui/material';
import Button from '@/components/form-controls/button';
import {
    Add as AddIcon,
    MoreVert as MoreIcon,
    Search as SearchIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
    Group as GroupIcon,
    Business as BusinessIcon,
    FilterList as FilterIcon,
    Sort as SortIcon,
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
    const [selectedTab, setSelectedTab] = useState(0);

    // Filter staff based on search term and selected tab
    const filteredStaff = staff.filter(member => {
        // Search filter
        const matchesSearch =
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.mobile.includes(searchTerm) ||
            (member.department && member.department.toLowerCase().includes(searchTerm.toLowerCase()));

        // Tab filter
        let matchesTab = true;
        if (selectedTab === 1) { // Active tab
            matchesTab = member.department !== 'Former Employee';
        }
        // selectedTab === 0 shows all staff

        return matchesSearch && matchesTab;
    });

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
        const colors = ['#1976d2', '#1565c0', '#0d47a1', '#42a5f5', '#1e88e5', '#2196f3'];
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
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            {/* Enhanced Header with Taskora-style layout */}
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', md: 'center' },
                mb: 3,
                gap: 2
            }}>
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="h4"
                        fontWeight="700"
                        gutterBottom
                        sx={{
                            color: 'text.primary',
                            fontSize: { xs: '1.75rem', md: '2.125rem' },
                            mb: 0.5
                        }}
                    >
                        Staff Management
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            fontSize: '0.95rem',
                            fontWeight: 400,
                            mb: { xs: 2, md: 0 }
                        }}
                    >
                        Manage your team members and track their performance
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    {/* Filter Button */}
                    <Button
                        variant="outlined"
                        startIcon={<FilterIcon />}
                    >
                        Filter
                    </Button>

                    {/* Sort Button */}
                    <Button
                        variant="outlined"
                        startIcon={<SortIcon />}
                    >
                        Sort
                    </Button>

                    {/* Add Staff Button */}
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => router.push('/staff/create')}
                    >
                        Add Staff
                    </Button>
                </Box>
            </Box>

            {/* Search and Tabs Section */}
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', md: 'center' },
                mb: 3,
                gap: 2
            }}>
                {/* Search Bar */}
                <Box sx={{ flex: 1, maxWidth: { xs: '100%', md: 400 } }}>
                    <TextField
                        placeholder="Search staff by name, position, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        size="small"
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                                height: 44,
                                fontSize: '0.875rem',
                                '& fieldset': {
                                    borderColor: 'divider',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.main',
                                    borderWidth: '2px',
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: 'text.secondary', fontSize: '1.1rem' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {/* Staff Status Tabs */}
                <Box sx={{ flex: 1, display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                    <Tabs
                        value={selectedTab}
                        onChange={(_, newValue) => setSelectedTab(newValue)}
                        sx={{
                            '& .MuiTab-root': {
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                textTransform: 'none',
                                minHeight: 44,
                                px: 2,
                                '&.Mui-selected': {
                                    color: 'primary.main',
                                    fontWeight: 600,
                                }
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: 'primary.main',
                                height: 3,
                                borderRadius: '3px 3px 0 0',
                            }
                        }}
                    >
                        <Tab
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    All Staff
                                    <Chip
                                        label={filteredStaff.length}
                                        size="small"
                                        sx={{
                                            height: 20,
                                            fontSize: '0.75rem',
                                            bgcolor: selectedTab === 0 ? 'primary.main' : 'action.hover',
                                            color: selectedTab === 0 ? 'white' : 'text.secondary',
                                        }}
                                    />
                                </Box>
                            }
                        />
                        <Tab
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    Active
                                    <Chip
                                        label={filteredStaff.filter(s => s.department !== 'Former Employee').length}
                                        size="small"
                                        sx={{
                                            height: 20,
                                            fontSize: '0.75rem',
                                            bgcolor: selectedTab === 1 ? 'primary.main' : 'action.hover',
                                            color: selectedTab === 1 ? 'white' : 'text.secondary',
                                        }}
                                    />
                                </Box>
                            }
                        />
                    </Tabs>
                </Box>
            </Box>

            {/* Stats Cards */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
                gap: 2.5,
                mb: 3
            }}>
                <Card sx={{
                    p: 2.5,
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    transition: 'box-shadow 0.2s',
                    '&:hover': {
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            bgcolor: 'rgba(25, 118, 210, 0.1)',
                            p: 1.2,
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <GroupIcon sx={{ color: '#1976d2', fontSize: '1.3rem' }} />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="700" color="text.primary">
                                {staff.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                Total Staff
                            </Typography>
                        </Box>
                    </Box>
                </Card>

                <Card sx={{
                    p: 2.5,
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    transition: 'box-shadow 0.2s',
                    '&:hover': {
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            bgcolor: 'rgba(46, 125, 50, 0.1)',
                            p: 1.2,
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <PersonIcon sx={{ color: '#2e7d32', fontSize: '1.3rem' }} />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="700" color="text.primary">
                                {staff.filter(s => s.gender.toLowerCase() === 'male').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                Male
                            </Typography>
                        </Box>
                    </Box>
                </Card>

                <Card sx={{
                    p: 2.5,
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    transition: 'box-shadow 0.2s',
                    '&:hover': {
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            bgcolor: 'rgba(194, 24, 91, 0.1)',
                            p: 1.2,
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <PersonIcon sx={{ color: '#c2185b', fontSize: '1.3rem' }} />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="700" color="text.primary">
                                {staff.filter(s => s.gender.toLowerCase() === 'female').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                Female
                            </Typography>
                        </Box>
                    </Box>
                </Card>

                <Card sx={{
                    p: 2.5,
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    transition: 'box-shadow 0.2s',
                    '&:hover': {
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            bgcolor: 'rgba(245, 124, 0, 0.1)',
                            p: 1.2,
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <BusinessIcon sx={{ color: '#f57c00', fontSize: '1.3rem' }} />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="700" color="text.primary">
                                {new Set(staff.map(s => s.department || 'Unknown')).size}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
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
                                borderRadius: '6px',
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
                                {/* Staff Header with Side Color Bar */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, flex: 1 }}>
                                        <Box
                                            sx={{
                                                width: 4,
                                                height: 40,
                                                borderRadius: 2,
                                                bgcolor: getAvatarColor(member.name),
                                                flexShrink: 0,
                                            }}
                                        />
                                        <Box sx={{ flex: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                <Typography variant="h6" fontWeight="600" sx={{ fontSize: '1.1rem' }}>
                                                    {member.name}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', mb: 1 }}>
                                                {member.department || 'No Department'}
                                            </Typography>
                                            <Chip
                                                label={member.gender}
                                                size="small"
                                                sx={{
                                                    bgcolor: getGenderColor(member.gender) === 'primary' ? 'rgba(25, 118, 210, 0.1)' : 'rgba(194, 24, 91, 0.1)',
                                                    color: getGenderColor(member.gender) === 'primary' ? '#1976d2' : '#c2185b',
                                                    fontWeight: 500,
                                                    fontSize: '0.75rem',
                                                    borderRadius: 8,
                                                    height: 24,
                                                    textTransform: 'capitalize',
                                                }}
                                            />
                                        </Box>
                                    </Box>

                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleMenuClick(e, member);
                                        }}
                                        size="small"
                                        sx={{ color: 'text.secondary', ml: 1 }}
                                    >
                                        <MoreIcon />
                                    </IconButton>
                                </Box>

                                {/* Contact Information */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                                    <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                                        {member.email}
                                    </Typography>
                                </Box>

                                {/* Staff Details Grid */}
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: 2,
                                    pt: 2,
                                    borderTop: '1px solid',
                                    borderColor: 'divider'
                                }}>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                                            Phone
                                        </Typography>
                                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.85rem' }}>
                                            {member.mobile}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                                            Department
                                        </Typography>
                                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.85rem' }}>
                                            {member.department || 'Not specified'}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                                            ID
                                        </Typography>
                                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.85rem' }}>
                                            #{member.id.slice(-6)}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                                            Gender
                                        </Typography>
                                        <Chip
                                            label={member.gender}
                                            size="small"
                                            sx={{
                                                bgcolor: getGenderColor(member.gender) === 'primary' ? 'rgba(25, 118, 210, 0.1)' : 'rgba(194, 24, 91, 0.1)',
                                                color: getGenderColor(member.gender) === 'primary' ? '#1976d2' : '#c2185b',
                                                fontWeight: 500,
                                                fontSize: '0.7rem',
                                                height: 20,
                                                borderRadius: 8,
                                                textTransform: 'capitalize',
                                            }}
                                        />
                                    </Box>
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
                        variant="outlined"
                        onClick={() => setDeleteDialogOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleDeleteConfirm}
                        sx={{
                            bgcolor: 'error.main',
                            '&:hover': {
                                bgcolor: 'error.dark',
                            }
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
