'use client';

import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Work as DesignationIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import Button from '@/components/form-controls/button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import {
    addDesignation,
    deleteDesignation,
    toggleDesignationStatus,
    type Designation
} from '@/store/slices/designation';

const initialFormData = {
    name: '',
    description: '',
    department: '',
    level: 'Junior' as const,
    isActive: true,
};

export default function DesignationPage() {
    const dispatch = useDispatch();
    const { designations } = useSelector((state: RootState) => state.designation);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const handleOpenCreateModal = () => {
        setFormData(initialFormData);
        setFormErrors({});
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
        setFormData(initialFormData);
        setFormErrors({});
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (formErrors[field]) {
            setFormErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) {
            errors.name = 'Designation name is required';
        }
        if (!formData.description.trim()) {
            errors.description = 'Description is required';
        }
        if (!formData.department.trim()) {
            errors.department = 'Department is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleCreateDesignation = () => {
        if (!validateForm()) return;

        const newDesignation: Designation = {
            id: Date.now().toString(),
            ...formData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        dispatch(addDesignation(newDesignation));
        handleCloseCreateModal();
    };

    const handleToggleStatus = (id: string) => {
        dispatch(toggleDesignationStatus(id));
    };

    const handleDeleteDesignation = (id: string) => {
        dispatch(deleteDesignation(id));
    };

    const getLevelColor = (level: string): 'info' | 'primary' | 'warning' | 'secondary' | 'success' | 'error' | 'default' => {
        switch (level) {
            case 'Junior':
                return 'info';
            case 'Mid':
                return 'primary';
            case 'Senior':
                return 'warning';
            case 'Lead':
                return 'secondary';
            case 'Manager':
                return 'success';
            case 'Director':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            {/* Header Section */}
            <Box sx={{
                mb: 4,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 2, md: 0 }
            }}>
                <Box>
                    <Typography
                        variant="h4"
                        fontWeight="700"
                        sx={{
                            color: 'text.primary',
                            fontSize: { xs: '1.75rem', md: '2.125rem' },
                            mb: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <DesignationIcon sx={{ fontSize: '2rem', color: 'primary.main' }} />
                        Designations
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 400
                        }}
                    >
                        Manage job designations and roles within your organization
                    </Typography>
                </Box>
                <Button
                    color="success"
                    variant="filled"
                    size="md"
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreateModal}
                >
                    Create Designation
                </Button>
            </Box>

            {/* Designations Table */}
            <Card
                elevation={0}
                sx={{
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                }}
            >
                <CardContent sx={{ p: 0 }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: 'grey.50' }}>
                                    <TableCell sx={{ fontWeight: 600, py: 2, px: 3 }}>
                                        Designation
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, py: 2, px: 3 }}>
                                        Department
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, py: 2, px: 3 }}>
                                        Level
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, py: 2, px: 3 }}>
                                        Status
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, py: 2, px: 3 }}>
                                        Created
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, py: 2, px: 3, textAlign: 'center' }}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {designations.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                                            <Typography color="text.secondary">
                                                No designations found. Create your first designation!
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    designations.map((designation) => (
                                        <TableRow
                                            key={designation.id}
                                            sx={{
                                                '&:hover': {
                                                    bgcolor: 'grey.50'
                                                }
                                            }}
                                        >
                                            <TableCell sx={{ py: 2, px: 3 }}>
                                                <Box>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                        {designation.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {designation.description}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ py: 2, px: 3 }}>
                                                <Typography variant="body2">
                                                    {designation.department}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ py: 2, px: 3 }}>
                                                <Chip
                                                    label={designation.level}
                                                    size="small"
                                                    color={getLevelColor(designation.level)}
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell sx={{ py: 2, px: 3 }}>
                                                <Chip
                                                    label={designation.isActive ? 'Active' : 'Inactive'}
                                                    size="small"
                                                    color={designation.isActive ? 'success' : 'default'}
                                                    variant={designation.isActive ? 'filled' : 'outlined'}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ py: 2, px: 3 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    {new Date(designation.createdAt).toLocaleDateString()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ py: 2, px: 3, textAlign: 'center' }}>
                                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleToggleStatus(designation.id)}
                                                        sx={{
                                                            color: designation.isActive ? 'warning.main' : 'success.main',
                                                            '&:hover': { bgcolor: designation.isActive ? 'warning.lighter' : 'success.lighter' }
                                                        }}
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleDeleteDesignation(designation.id)}
                                                        sx={{
                                                            color: 'error.main',
                                                            '&:hover': { bgcolor: 'error.lighter' }
                                                        }}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Create Designation Modal */}
            <Dialog
                open={isCreateModalOpen}
                onClose={handleCloseCreateModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '6px',
                        border: '1px solid',
                        borderColor: 'divider',
                    }
                }}
            >
                <DialogTitle sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pb: 2
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Create New Designation
                    </Typography>
                    <IconButton onClick={handleCloseCreateModal} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ py: 0 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 2 }}>
                        <TextField
                            label="Designation Name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            error={!!formErrors.name}
                            helperText={formErrors.name}
                            fullWidth
                            required
                            size="medium"
                        />

                        <TextField
                            label="Description"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            error={!!formErrors.description}
                            helperText={formErrors.description}
                            fullWidth
                            required
                            multiline
                            rows={3}
                            size="medium"
                        />

                        <TextField
                            label="Department"
                            value={formData.department}
                            onChange={(e) => handleInputChange('department', e.target.value)}
                            error={!!formErrors.department}
                            helperText={formErrors.department}
                            fullWidth
                            required
                            size="medium"
                        />

                        <FormControl fullWidth required>
                            <InputLabel>Level</InputLabel>
                            <Select
                                value={formData.level}
                                onChange={(e) => handleInputChange('level', e.target.value)}
                                label="Level"
                                size="medium"
                            >
                                <MenuItem value="Junior">Junior</MenuItem>
                                <MenuItem value="Mid">Mid</MenuItem>
                                <MenuItem value="Senior">Senior</MenuItem>
                                <MenuItem value="Lead">Lead</MenuItem>
                                <MenuItem value="Manager">Manager</MenuItem>
                                <MenuItem value="Director">Director</MenuItem>
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Status:
                            </Typography>
                            <Chip
                                label={formData.isActive ? 'Active' : 'Inactive'}
                                size="small"
                                color={formData.isActive ? 'success' : 'default'}
                                onClick={() => handleInputChange('isActive', !formData.isActive)}
                                sx={{ cursor: 'pointer' }}
                            />
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2 }}>
                    <Button
                        variant="outlined"
                        color="link"
                        onClick={handleCloseCreateModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="filled"
                        color="success"
                        onClick={handleCreateDesignation}
                    >
                        Create Designation
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
