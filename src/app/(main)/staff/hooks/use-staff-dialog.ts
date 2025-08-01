'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStaff, updateStaff, Staff } from '@/store/slices/staff';
import { StaffFormData } from '../components/staff-dialog';

export const useStaffDialog = () => {
    const dispatch = useDispatch();
    
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState<StaffFormData>({
        name: '',
        email: '',
        mobile: '',
        gender: '',
    });
    
    const [errors, setErrors] = useState<Partial<StaffFormData>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<StaffFormData> = {};

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
        return Object.keys(newErrors).length === 0;
    };

    const openCreateDialog = () => {
        setIsEditing(false);
        setEditingStaff(null);
        setFormData({
            name: '',
            email: '',
            mobile: '',
            gender: '',
        });
        setErrors({});
        setIsOpen(true);
    };

    const openEditDialog = (staff: Staff) => {
        setIsEditing(true);
        setEditingStaff(staff);
        setFormData({
            name: staff.name,
            email: staff.email,
            mobile: staff.mobile,
            gender: staff.gender,
        });
        setErrors({});
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        setIsEditing(false);
        setEditingStaff(null);
        setFormData({
            name: '',
            email: '',
            mobile: '',
            gender: '',
        });
        setErrors({});
        setIsSubmitting(false);
    };

    const handleFormDataChange = (updates: Partial<StaffFormData>) => {
        setFormData(prev => ({ ...prev, ...updates }));
        
        // Clear errors for changed fields
        const updatedErrors = { ...errors };
        Object.keys(updates).forEach(key => {
            delete updatedErrors[key as keyof StaffFormData];
        });
        setErrors(updatedErrors);
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (isEditing && editingStaff) {
                dispatch(updateStaff({
                    ...editingStaff,
                    name: formData.name.trim(),
                    email: formData.email.trim().toLowerCase(),
                    mobile: formData.mobile.trim(),
                    gender: formData.gender as 'male' | 'female' | 'other',
                }));
            } else {
                dispatch(addStaff({
                    name: formData.name.trim(),
                    email: formData.email.trim().toLowerCase(),
                    mobile: formData.mobile.trim(),
                    gender: formData.gender as 'male' | 'female' | 'other',
                }));
            }

            closeDialog();
        } catch (error) {
            console.error('Error saving staff:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isOpen,
        isEditing,
        formData,
        errors,
        isSubmitting,
        openCreateDialog,
        openEditDialog,
        closeDialog,
        handleFormDataChange,
        handleSave,
    };
};
