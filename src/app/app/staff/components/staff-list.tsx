'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import CommonCard from '@/components/common/common-card';
import Button from '@/components/form-controls/button';
import StaffCard from './staff-card';
import {
    Add as AddIcon,
    Group as GroupIcon,
} from '@mui/icons-material';
import { Staff } from '@/store/slices/staff';

interface StaffListProps {
    staff: Staff[];
    searchTerm: string;
    onStaffClick: (staffId: string) => void;
    onView: (staff: Staff) => void;
    onEdit: (staff: Staff) => void;
    onDelete: (staff: Staff) => void;
    onCreateStaff: () => void;
}

const StaffList: React.FC<StaffListProps> = ({
    staff,
    searchTerm,
    onStaffClick,
    onView,
    onEdit,
    onDelete,
    onCreateStaff,
}) => {
    if (staff.length === 0) {
        return (
            <CommonCard
                sx={{
                    p: 8,
                    textAlign: "center",
                    border: "2px dashed",
                    borderColor: "divider",
                    bgcolor: "background.default",
                }}
            >
                <GroupIcon sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
                <Typography variant="h6" fontWeight="600" gutterBottom>
                    {searchTerm ? "No staff found" : "No staff members yet"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {searchTerm
                        ? "Try adjusting your search criteria"
                        : "Add your first staff member to get started."}
                </Typography>
                {!searchTerm && (
                    <Button
                        variant="filled"
                        startIcon={<AddIcon />}
                        onClick={onCreateStaff}
                    >
                        Add Staff
                    </Button>
                )}
            </CommonCard>
        );
    }

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                },
                gap: 3,
            }}
        >
            {staff.map((member) => (
                <StaffCard
                    key={member.id}
                    member={member}
                    onCardClick={() => onStaffClick(member.id)}
                    onView={() => onView(member)}
                    onEdit={() => onEdit(member)}
                    onDelete={() => onDelete(member)}
                />
            ))}
        </Box>
    );
};

export default StaffList;
