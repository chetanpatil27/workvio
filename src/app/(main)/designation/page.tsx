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
    Button as MuiButton,
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Work as DesignationIcon,
    Close as CloseIcon,
    ToggleOn,
    ToggleOff,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import {
    addDesignation,
    deleteDesignation,
    toggleDesignationStatus,
    type Designation
} from '../../../store/slices/designation';

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

    const activeDesignations = designations.filter(d => d.isActive).length;
    const inactiveDesignations = designations.filter(d => !d.isActive).length;
    const departments = [...new Set(designations.map(d => d.department))].length;

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Designations
                </Typography>
                
                {/* Stats Cards */}
                <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                    gap: 2, 
                    mb: 3 
                }}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography color="textSecondary" gutterBottom>
                                        Total Designations
                                    </Typography>
                                    <Typography variant="h4" component="div">
                                        {designations.length}
                                    </Typography>
                                </Box>
                                <DesignationIcon color="primary" sx={{ fontSize: 40 }} />
                            </Box>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography color="textSecondary" gutterBottom>
                                        Active
                                    </Typography>
                                    <Typography variant="h4" component="div" color="success.main">
                                        {activeDesignations}
                                    </Typography>
                                </Box>
                                <DesignationIcon color="success" sx={{ fontSize: 40 }} />
                            </Box>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography color="textSecondary" gutterBottom>
                                        Inactive
                                    </Typography>
                                    <Typography variant="h4" component="div" color="warning.main">
                                        {inactiveDesignations}
                                    </Typography>
                                </Box>
                                <DesignationIcon color="warning" sx={{ fontSize: 40 }} />
                            </Box>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography color="textSecondary" gutterBottom>
                                        Departments
                                    </Typography>
                                    <Typography variant="h4" component="div" color="info.main">
                                        {departments}
                                    </Typography>
                                </Box>
                                <DesignationIcon color="info" sx={{ fontSize: 40 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Add Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <MuiButton
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpenCreateModal}
                    >
                        Add Designation
                    </MuiButton>
                </Box>
            </Box>

            {/* Designations Table */}
            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Level</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Created</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {designations.map((designation) => (
                                <TableRow key={designation.id}>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight="medium">
                                            {designation.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography 
                                            variant="body2" 
                                            color="text.secondary"
                                            sx={{ 
                                                maxWidth: 200,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {designation.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{designation.department}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={designation.level}
                                            color={getLevelColor(designation.level)}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={designation.isActive ? 'Active' : 'Inactive'}
                                            color={designation.isActive ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="text.secondary">
                                            {new Date(designation.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleToggleStatus(designation.id)}
                                                color={designation.isActive ? 'warning' : 'success'}
                                                title={designation.isActive ? 'Deactivate' : 'Activate'}
                                            >
                                                {designation.isActive ? <ToggleOn /> : <ToggleOff />}
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleDeleteDesignation(designation.id)}
                                                title="Delete"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {designations.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                        <Typography variant="body1" color="text.secondary">
                                            No designations found. Create your first designation!
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            {/* Create Designation Modal */}
            <Dialog open={isCreateModalOpen} onClose={handleCloseCreateModal} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        Create New Designation
                        <IconButton onClick={handleCloseCreateModal} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
                        <TextField
                            label="Designation Name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            error={!!formErrors.name}
                            helperText={formErrors.name}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Description"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            error={!!formErrors.description}
                            helperText={formErrors.description}
                            multiline
                            rows={3}
                            fullWidth
                            required
                        />

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <FormControl fullWidth required error={!!formErrors.department}>
                                <InputLabel>Department</InputLabel>
                                <Select
                                    value={formData.department}
                                    label="Department"
                                    onChange={(e) => handleInputChange('department', e.target.value)}
                                >
                                    <MenuItem value="Engineering">Engineering</MenuItem>
                                    <MenuItem value="Product">Product</MenuItem>
                                    <MenuItem value="Design">Design</MenuItem>
                                    <MenuItem value="Marketing">Marketing</MenuItem>
                                    <MenuItem value="Sales">Sales</MenuItem>
                                    <MenuItem value="Operations">Operations</MenuItem>
                                    <MenuItem value="HR">HR</MenuItem>
                                    <MenuItem value="Finance">Finance</MenuItem>
                                </Select>
                                {formErrors.department && (
                                    <Typography variant="caption" color="error" sx={{ mt: 0.5, mx: 1.5 }}>
                                        {formErrors.department}
                                    </Typography>
                                )}
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel>Level</InputLabel>
                                <Select
                                    value={formData.level}
                                    label="Level"
                                    onChange={(e) => handleInputChange('level', e.target.value)}
                                >
                                    <MenuItem value="Junior">Junior</MenuItem>
                                    <MenuItem value="Mid">Mid</MenuItem>
                                    <MenuItem value="Senior">Senior</MenuItem>
                                    <MenuItem value="Lead">Lead</MenuItem>
                                    <MenuItem value="Manager">Manager</MenuItem>
                                    <MenuItem value="Director">Director</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2.5, gap: 1 }}>
                    <MuiButton onClick={handleCloseCreateModal} color="inherit">
                        Cancel
                    </MuiButton>
                    <MuiButton 
                        onClick={handleCreateDesignation} 
                        variant="contained"
                        sx={{ minWidth: 80 }}
                    >
                        Create
                    </MuiButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
