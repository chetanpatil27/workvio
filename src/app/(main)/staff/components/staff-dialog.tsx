'use client';

import React from 'react';
import {
    Box,
} from '@mui/material';
import Button from '@/components/form-controls/button';
import { Input, Select } from '@/components/form-controls';
import { Modal } from '@/components/common';

export interface StaffFormData {
    name: string;
    email: string;
    mobile: string;
    gender: string;
}

interface StaffDialogProps {
    open: boolean;
    isEditing: boolean;
    formData: StaffFormData;
    errors: Partial<StaffFormData>;
    isSubmitting: boolean;
    onClose: () => void;
    onSave: () => void;
    onFormDataChange: (updates: Partial<StaffFormData>) => void;
    transition?: 'fade' | 'slide' | 'zoom' | 'grow';
    transitionDuration?: number;
}

const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];

const StaffDialog: React.FC<StaffDialogProps> = ({
    open,
    isEditing,
    formData,
    errors,
    isSubmitting,
    onClose,
    onSave,
    onFormDataChange,
    transition = 'slide',
    transitionDuration = 300,
}) => {
    const handleSave = () => {
        onSave();
    };

    const actions = (
        <>
            <Button
                variant="outlined"
                onClick={onClose}
                disabled={isSubmitting}
            >
                Cancel
            </Button>
            <Button
                variant="filled"
                onClick={handleSave}
                loading={isSubmitting}
            >
                {isEditing ? 'Update Staff' : 'Add Staff'}
            </Button>
        </>
    );

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={isEditing ? 'Edit Staff Member' : 'Add New Staff Member'}
            subtitle={isEditing ? 'Update staff member information' : 'Enter details for the new staff member'}
            size="sm"
            actions={actions}
            transition={transition}
            transitionDuration={transitionDuration}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Input
                    label="Full Name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => onFormDataChange({ name: e.target.value })}
                    error={errors.name}
                    helperText={errors.name}
                    required
                />
                
                <Input
                    label="Email Address"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => onFormDataChange({ email: e.target.value })}
                    error={errors.email}
                    helperText={errors.email}
                    type="email"
                    required
                />
                
                <Input
                    label="Mobile Number"
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={(e) => onFormDataChange({ mobile: e.target.value })}
                    error={errors.mobile}
                    helperText={errors.mobile}
                    required
                />
                
                <Select
                    label="Gender"
                    placeholder="Select gender"
                    value={formData.gender}
                    onChange={(e) => onFormDataChange({ gender: e.target.value as string })}
                    options={genderOptions}
                    error={errors.gender}
                    required
                />
            </Box>
        </Modal>
    );
};

export default StaffDialog;
