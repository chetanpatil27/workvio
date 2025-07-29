'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    IconButton,
    Paper,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addStaff } from '@/store/slices/staff';
import { Input, Select, Button as FormButton } from '@/components/form-controls';

export default function CreateStaffPage() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        gender: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        mobile: '',
        gender: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
    ];

    const validateForm = () => {
        const newErrors = {
            name: '',
            email: '',
            mobile: '',
            gender: '',
        };

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Mobile validation
        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^[\+]?[1-9][\d\s\-\(\)]{7,15}$/.test(formData.mobile)) {
            newErrors.mobile = 'Please enter a valid mobile number';
        }

        // Gender validation
        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            dispatch(addStaff({
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                mobile: formData.mobile.trim(),
                gender: formData.gender as 'male' | 'female' | 'other',
            }));

            router.push('/staff');
        } catch (error) {
            console.error('Error creating staff:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));

        // Clear error when user starts typing
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [field]: '',
            }));
        }
    };

    return (
        <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
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
                        Add New Staff Member
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Create a new staff member profile with their basic information
                    </Typography>
                </Box>
            </Box>

            {/* Form Card */}
            <Card sx={{ mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <PersonIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                        <Typography variant="h6" fontWeight="bold">
                            Personal Information
                        </Typography>
                    </Box>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                        gap: 3,
                        mb: 4,
                    }}>
                        <Input
                            label="Full Name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            error={errors.name}
                            isRequired
                            placeholder="Enter full name"
                            size="large"
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            error={errors.email}
                            isRequired
                            placeholder="Enter email address"
                            size="large"
                        />

                        <Input
                            label="Mobile Number"
                            type="tel"
                            value={formData.mobile}
                            onChange={(e) => handleInputChange('mobile', e.target.value)}
                            error={errors.mobile}
                            isRequired
                            placeholder="Enter mobile number"
                            size="large"
                        />

                        <Select
                            label="Gender"
                            value={formData.gender}
                            onChange={(value) => handleInputChange('gender', String(value))}
                            options={genderOptions}
                            error={errors.gender}
                            isRequired
                            placeholder="Select gender"
                            size="large"
                        />
                    </Box>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                    variant="outlined"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>

                <FormButton
                    variant="contained"
                    onClick={handleSubmit}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    size="large"
                    sx={{
                        minWidth: 140,
                        '&:hover': {
                            transform: 'translateY(-1px)',
                        },
                    }}
                >
                    {isSubmitting ? 'Creating...' : 'Create Staff Member'}
                </FormButton>
            </Paper>

            {/* Info Box */}
            <Box
                sx={{
                    mt: 3,
                    p: 3,
                    bgcolor: 'info.light',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'info.main',
                }}
            >
                <Typography variant="body2" color="info.dark">
                    <strong>Note:</strong> The staff member will be created with the provided information.
                    You can always edit these details later from the staff member&apos;s profile page.
                </Typography>
            </Box>
        </Box>
    );
}
