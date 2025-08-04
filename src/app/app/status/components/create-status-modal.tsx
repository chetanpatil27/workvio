'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    IconButton,
    FormControlLabel,
    Switch,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Button from '@/components/form-controls/button';
import Input from '@/components/form-controls/input';
import TextArea from '@/components/form-controls/textarea';

interface CreateStatusModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string; color: string; description?: string; active: boolean }) => void;
}

const predefinedColors = [
    '#64748b', // slate
    '#ef4444', // red
    '#f97316', // orange
    '#f59e0b', // amber
    '#eab308', // yellow
    '#84cc16', // lime
    '#22c55e', // green
    '#10b981', // emerald
    '#06b6d4', // cyan
    '#3b82f6', // blue
    '#6366f1', // indigo
    '#8b5cf6', // violet
    '#a855f7', // purple
    '#d946ef', // fuchsia
    '#ec4899', // pink
    '#f43f5e', // rose
];

const CreateStatusModal: React.FC<CreateStatusModalProps> = ({
    open,
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        color: '#3b82f6',
        description: '',
        active: true,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Status name is required';
        }

        if (!formData.color) {
            newErrors.color = 'Status color is required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onSubmit({
                name: formData.name.trim(),
                color: formData.color,
                description: formData.description.trim() || undefined,
                active: formData.active,
            });
            handleClose();
        }
    };

    const handleClose = () => {
        setFormData({
            name: '',
            color: '#3b82f6',
            description: '',
            active: true,
        });
        setErrors({});
        onClose();
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '12px',
                    overflow: 'visible',
                },
            }}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pb: 2,
                        fontWeight: 600,
                    }}
                >
                    Create New Status
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ pb: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Status Name */}
                        <Input
                            label="Status Name"
                            placeholder="Enter status name (e.g., In Review)"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            error={errors.name}
                            helperText={errors.name}
                            required
                        />

                        {/* Status Color */}
                        <Box>
                            <Typography variant="subtitle2" fontWeight="500" sx={{ mb: 2 }}>
                                Status Color
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
                                {predefinedColors.map((color) => (
                                    <Box
                                        key={color}
                                        onClick={() => handleInputChange('color', color)}
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: '6px',
                                            bgcolor: color,
                                            cursor: 'pointer',
                                            border: '2px solid',
                                            borderColor: formData.color === color ? 'primary.main' : 'transparent',
                                            transition: 'all 0.2s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                                borderColor: 'primary.light',
                                            },
                                        }}
                                    />
                                ))}
                            </Box>

                            {/* Custom Color Input */}
                            <Input
                                label="Custom Color"
                                type="color"
                                value={formData.color}
                                onChange={(e) => handleInputChange('color', e.target.value)}
                                error={errors.color}
                                helperText={errors.color || 'You can also choose a custom color'}
                            />
                        </Box>

                        {/* Description */}
                        <TextArea
                            label="Description (Optional)"
                            placeholder="Describe when this status should be used..."
                            value={formData.description}
                            onChange={(value) => handleInputChange('description', value)}
                            rows={3}
                        />

                        {/* Active Status Toggle */}
                        <Box>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.active}
                                        onChange={(e) => handleInputChange('active', e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Active Status"
                                sx={{ mb: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                                Active statuses are available for use in tickets. Inactive statuses are hidden from selection.
                            </Typography>
                        </Box>

                        {/* Preview */}
                        <Box>
                            <Typography variant="subtitle2" fontWeight="500" sx={{ mb: 1 }}>
                                Preview
                            </Typography>
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    p: 2,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: '8px',
                                    bgcolor: 'background.paper',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: '50%',
                                        bgcolor: formData.color,
                                    }}
                                />
                                <Typography variant="body2" fontWeight="500">
                                    {formData.name || 'Status Name'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 3, pt: 2 }}>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="filled">
                        Create Status
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreateStatusModal;
