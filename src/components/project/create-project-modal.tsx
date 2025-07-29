'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    IconButton,
    Avatar,
    Chip,
    Divider,
    Button,
} from '@mui/material';
import {
    Close as CloseIcon,
    CloudUpload as UploadIcon,
    Add as AddIcon,
} from '@mui/icons-material';
import { Input, Select } from '@/components/form-controls';

interface TeamMember {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'owner' | 'editor' | 'viewer';
}

interface CreateProjectModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: {
        name: string;
        description: string;
        logo: File | null;
        teamMembers: TeamMember[];
    }) => void;
}

const roleOptions = [
    { value: 'owner', label: 'Owner' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
];

const availableMembers: TeamMember[] = [
    {
        id: '1',
        name: 'Courtney Henry',
        email: 'courtney@example.com',
        role: 'owner'
    },
    {
        id: '2',
        name: 'Cameron Williamson',
        email: 'cameron@example.com',
        role: 'editor'
    },
    {
        id: '3',
        name: 'Leslie Alexander',
        email: 'leslie@example.com',
        role: 'viewer'
    }
];

export default function CreateProjectModal({ open, onClose, onSubmit }: CreateProjectModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        logo: null as File | null,
    });

    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(availableMembers);
    const [dragOver, setDragOver] = useState(false);

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
            setFormData({ ...formData, logo: files[0] });
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, logo: file });
        }
    };

    const updateMemberRole = (memberId: string, newRole: string) => {
        setTeamMembers(prev =>
            prev.map(member =>
                member.id === memberId
                    ? { ...member, role: newRole as 'owner' | 'editor' | 'viewer' }
                    : member
            )
        );
    };

    const addTeamMember = () => {
        // In real app, this would open a member selection dialog
        console.log('Add team member');
    };

    const handleSubmit = () => {
        onSubmit({
            ...formData,
            teamMembers
        });
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 0,
                    maxHeight: '90vh',
                }
            }}
        >
            <DialogContent sx={{ p: 0 }}>
                {/* Header */}
                <Box sx={{
                    p: 4,
                    pb: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                }}>
                    <Box>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Create New Project
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Fill in the details to create a new project.
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={onClose}
                        sx={{ color: 'text.secondary' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ px: 4 }}>
                    {/* Project Name */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                            Project name <span style={{ color: '#f44336' }}>*</span>
                        </Typography>
                        <Input
                            label=""
                            placeholder="Project name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            size="large"
                        />
                    </Box>

                    {/* Team and Upload Section */}
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 300px' },
                        gap: 4,
                        mb: 4
                    }}>
                        {/* Team Section */}
                        <Box>
                            <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                                Team
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {teamMembers.map((member) => (
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
                                            onChange={(value) => updateMemberRole(member.id, String(value))}
                                            options={roleOptions}
                                            size="small"
                                            sx={{ minWidth: 120 }}
                                        />
                                    </Box>
                                ))}

                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={addTeamMember}
                                    sx={{
                                        borderStyle: 'dashed',
                                        borderColor: 'primary.main',
                                        color: 'primary.main',
                                        '&:hover': {
                                            borderStyle: 'dashed',
                                            bgcolor: 'primary.light',
                                        }
                                    }}
                                >
                                    Add Team Member
                                </Button>
                            </Box>
                        </Box>

                        {/* Upload Section */}
                        <Box>
                            <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                                Upload logo
                            </Typography>

                            <Box
                                onDrop={handleDrop}
                                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                sx={{
                                    border: '2px dashed',
                                    borderColor: dragOver ? 'primary.main' : 'divider',
                                    borderRadius: 2,
                                    p: 3,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    bgcolor: dragOver ? 'primary.light' : 'background.default',
                                    transition: 'all 0.2s ease',
                                    position: 'relative',
                                    minHeight: 120,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onClick={() => document.getElementById('logo-upload')?.click()}
                            >
                                <input
                                    id="logo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    style={{ display: 'none' }}
                                />

                                <UploadIcon sx={{ fontSize: 32, color: 'text.secondary', mb: 1 }} />
                                <Typography variant="body2" fontWeight="600" gutterBottom>
                                    Upload project logo
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Min 500×500, PNG or JPEG
                                </Typography>

                                {formData.logo && (
                                    <Chip
                                        label={formData.logo.name}
                                        color="primary"
                                        size="small"
                                        sx={{ mt: 1 }}
                                    />
                                )}
                            </Box>

                            <Button
                                variant="outlined"
                                size="small"
                                sx={{ mt: 2, width: '100%' }}
                            >
                                Update
                            </Button>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    {/* Action Buttons */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 2,
                        pb: 4
                    }}>
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            sx={{ minWidth: 100 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={!formData.name.trim()}
                            sx={{
                                minWidth: 100,
                                bgcolor: 'grey.900',
                                '&:hover': {
                                    bgcolor: 'grey.800',
                                }
                            }}
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
