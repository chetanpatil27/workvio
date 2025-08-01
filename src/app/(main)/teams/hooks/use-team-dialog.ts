'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTeam, updateTeam, Team, TeamMember } from '@/store/slices/team';

export interface TeamFormData {
    name: string;
    description: string;
    profileImage?: File | null;
    members: TeamMember[];
    status: 'active' | 'inactive';
}

export const useTeamDialog = () => {
    const dispatch = useDispatch();
    
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTeam, setEditingTeam] = useState<Team | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState<TeamFormData>({
        name: '',
        description: '',
        profileImage: null,
        members: [],
        status: 'active',
    });
    
    const [errors, setErrors] = useState<Partial<TeamFormData>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<TeamFormData> = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Team name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Team name must be at least 2 characters';
        }

        // Description validation
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const openCreateDialog = () => {
        setIsEditing(false);
        setEditingTeam(null);
        setFormData({
            name: '',
            description: '',
            profileImage: null,
            members: [],
            status: 'active',
        });
        setErrors({});
        setIsOpen(true);
    };

    const openEditDialog = (team: Team) => {
        setIsEditing(true);
        setEditingTeam(team);
        setFormData({
            name: team.name,
            description: team.description,
            profileImage: null, // We'll handle existing images separately
            members: team.members,
            status: team.status,
        });
        setErrors({});
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        setIsEditing(false);
        setEditingTeam(null);
        setFormData({
            name: '',
            description: '',
            profileImage: null,
            members: [],
            status: 'active',
        });
        setErrors({});
        setIsSubmitting(false);
    };

    const handleFormDataChange = (updates: Partial<TeamFormData>) => {
        setFormData(prev => ({ ...prev, ...updates }));
        
        // Clear errors for changed fields
        const updatedErrors = { ...errors };
        Object.keys(updates).forEach(key => {
            delete updatedErrors[key as keyof TeamFormData];
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

            if (isEditing && editingTeam) {
                dispatch(updateTeam({
                    ...editingTeam,
                    name: formData.name.trim(),
                    description: formData.description.trim(),
                    members: formData.members,
                    status: formData.status,
                }));
            } else {
                dispatch(addTeam({
                    name: formData.name.trim(),
                    description: formData.description.trim(),
                    members: formData.members,
                    status: formData.status,
                    projectsCount: 0,
                }));
            }

            closeDialog();
        } catch (error) {
            console.error('Error saving team:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const addMember = (member: TeamMember) => {
        setFormData(prev => ({
            ...prev,
            members: [...prev.members, member]
        }));
    };

    const removeMember = (memberId: string) => {
        setFormData(prev => ({
            ...prev,
            members: prev.members.filter(m => m.id !== memberId)
        }));
    };

    const updateMemberRole = (memberId: string, role: TeamMember['role']) => {
        setFormData(prev => ({
            ...prev,
            members: prev.members.map(m => 
                m.id === memberId ? { ...m, role } : m
            )
        }));
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
        addMember,
        removeMember,
        updateMemberRole,
    };
};
