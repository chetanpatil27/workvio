'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Avatar,
    Chip,
    IconButton,
    Divider,
    Stack,
    FormControlLabel,
    Switch,
} from '@mui/material';
import {
    CloudUpload as UploadIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { Modal, useModalCleanup } from '@/components/common';
import { Input, Textarea, Select } from '@/components/form-controls';
import Button from '@/components/form-controls/button';
import { TeamFormData } from '../hooks/use-team-dialog';
import { TeamMember } from '@/store/slices/team';
import { teamRoleOptions } from '../constants/team-constants';

interface TeamDialogProps {
    open: boolean;
    isEditing: boolean;
    formData: TeamFormData;
    errors: Partial<TeamFormData>;
    isSubmitting: boolean;
    onClose: () => void;
    onSave: () => void;
    onFormDataChange: (updates: Partial<TeamFormData>) => void;
    addMember: (member: TeamMember) => void;
    removeMember: (memberId: string) => void;
    updateMemberRole: (memberId: string, role: TeamMember['role']) => void;
}

const TeamDialog: React.FC<TeamDialogProps> = ({
    open,
    isEditing,
    formData,
    errors,
    isSubmitting,
    onClose,
    onSave,
    onFormDataChange,
    addMember,
    removeMember,
    updateMemberRole,
}) => {
    // Use modal cleanup hook to ensure proper cleanup
    useModalCleanup(open);
    
    const [dragOver, setDragOver] = useState(false);
    const [newMember, setNewMember] = useState({ name: '', email: '', role: 'member' as TeamMember['role'] });

    const getAvatarColor = (name: string) => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        if (files[0] && files[0].type.startsWith('image/')) {
            onFormDataChange({ profileImage: files[0] });
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFormDataChange({ profileImage: file });
        }
    };

    const handleAddMember = () => {
        if (newMember.name.trim() && newMember.email.trim()) {
            const member: TeamMember = {
                id: Date.now().toString(),
                name: newMember.name.trim(),
                email: newMember.email.trim().toLowerCase(),
                role: newMember.role,
            };
            addMember(member);
            setNewMember({ name: '', email: '', role: 'member' });
        }
    };

    const actions = (
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Button onClick={onClose} variant="outlined">
                Cancel
            </Button>
            <Button
                onClick={onSave}
                variant="filled"
                disabled={isSubmitting || !formData.name.trim()}
            >
                {isSubmitting ? 'Saving...' : isEditing ? 'Update Team' : 'Create Team'}
            </Button>
        </Box>
    );

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={isEditing ? 'Edit Team' : 'Create New Team'}
            subtitle={isEditing ? 'Update team information and members' : 'Set up your team with members and details'}
            size="lg"
            actions={actions}
            transition="slide"
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {/* Basic Information */}
                <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Basic Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Input
                            label="Team Name"
                            placeholder="Enter team name"
                            value={formData.name}
                            onChange={(e) => onFormDataChange({ name: e.target.value })}
                            error={errors.name}
                            helperText={errors.name}
                            required
                        />
                        
                        <Textarea
                            label="Description"
                            placeholder="Describe the team's purpose and responsibilities"
                            value={formData.description}
                            onChange={(value) => onFormDataChange({ description: value })}
                            rows={4}
                            error={errors.description}
                            helperText={errors.description}
                            isRequired
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.status === 'active'}
                                    onChange={(e) => onFormDataChange({ 
                                        status: e.target.checked ? 'active' : 'inactive' 
                                    })}
                                    color="primary"
                                />
                            }
                            label="Active Status"
                        />
                    </Box>
                </Box>

                {/* Profile Image Upload */}
                <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Team Profile Image
                    </Typography>
                    <Box
                        onDrop={handleDrop}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        sx={{
                            border: '2px dashed',
                            borderColor: dragOver ? 'primary.main' : 'divider',
                            borderRadius: 2,
                            p: 4,
                            textAlign: 'center',
                            cursor: 'pointer',
                            bgcolor: dragOver ? 'primary.light' : 'background.default',
                            transition: 'all 0.2s ease',
                            minHeight: 120,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onClick={() => document.getElementById('profile-upload')?.click()}
                    >
                        <input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                        />

                        <UploadIcon sx={{ fontSize: 32, color: 'text.secondary', mb: 1 }} />
                        <Typography variant="body1" fontWeight="600" gutterBottom>
                            Upload team profile image
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            PNG, JPG or JPEG (Max 5MB)
                        </Typography>

                        {formData.profileImage && (
                            <Chip
                                label={formData.profileImage.name}
                                color="primary"
                                size="small"
                                sx={{ mt: 2 }}
                                onDelete={() => onFormDataChange({ profileImage: null })}
                            />
                        )}
                    </Box>
                </Box>

                <Divider />

                {/* Team Members */}
                <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Team Members
                    </Typography>
                    
                    {/* Add New Member */}
                    <Box sx={{ 
                        p: 3, 
                        border: '1px dashed', 
                        borderColor: 'divider', 
                        borderRadius: 2, 
                        mb: 3,
                        bgcolor: 'background.default'
                    }}>
                        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                            Add New Member
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr auto auto' }, gap: 2, alignItems: 'end' }}>
                            <Input
                                label="Member Name"
                                placeholder="Enter member name"
                                value={newMember.name}
                                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                            />
                            <Input
                                label="Email"
                                placeholder="Enter email address"
                                type="email"
                                value={newMember.email}
                                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                            />
                            <Select
                                label="Role"
                                value={newMember.role}
                                onChange={(e) => setNewMember({ ...newMember, role: e.target.value as TeamMember['role'] })}
                                options={teamRoleOptions}
                                sx={{ minWidth: 120 }}
                            />
                            <Button
                                variant="filled"
                                startIcon={<AddIcon />}
                                onClick={handleAddMember}
                                disabled={!newMember.name.trim() || !newMember.email.trim()}
                                sx={{ height: 'fit-content' }}
                            >
                                Add
                            </Button>
                        </Box>
                    </Box>

                    {/* Current Members */}
                    {formData.members.length > 0 ? (
                        <Stack spacing={2}>
                            {formData.members.map((member) => (
                                <Box
                                    key={member.id}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: 2,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 2,
                                        bgcolor: 'background.paper',
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: getAvatarColor(member.name),
                                            width: 40,
                                            height: 40,
                                            fontSize: '1rem',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {member.name.charAt(0)}
                                    </Avatar>

                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" fontWeight="600">
                                            {member.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {member.email}
                                        </Typography>
                                    </Box>

                                    <Select
                                        label=""
                                        value={member.role}
                                        onChange={(e) => updateMemberRole(member.id, e.target.value as TeamMember['role'])}
                                        options={teamRoleOptions}
                                        size="small"
                                        sx={{ minWidth: 120 }}
                                    />

                                    <IconButton
                                        size="small"
                                        onClick={() => removeMember(member.id)}
                                        sx={{ color: 'error.main' }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </Stack>
                    ) : (
                        <Typography variant="body2" color="text.secondary" fontStyle="italic">
                            No members added yet. Add team members using the form above.
                        </Typography>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

export default TeamDialog;
