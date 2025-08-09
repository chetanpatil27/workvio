'use client';

import React from 'react';
import {
    Box,
    Typography,
    CardContent,
    Chip,
} from '@mui/material';
import CommonCard from '@/components/common/common-card';
import {
    Email as EmailIcon,
} from '@mui/icons-material';
import { Staff } from '@/store/slices/staff';
import { getAvatarColor, getGenderColor } from '../utils/staff-helpers';
import StaffMenu from './staff-menu';

interface StaffCardProps {
    member: Staff;
    onCardClick: () => void;
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const StaffCard: React.FC<StaffCardProps> = ({
    member,
    onCardClick,
    onView,
    onEdit,
    onDelete,
}) => {
    return (
        <CommonCard onClick={onCardClick} sx={{ cursor: "pointer" }}>
            <CardContent sx={{ p: 0 }}>
                {/* Staff Header with Side Color Bar */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1.5,
                            flex: 1,
                        }}
                    >
                        <Box
                            sx={{
                                width: 4,
                                height: 40,
                                borderRadius: "6px",
                                bgcolor: getAvatarColor(member.name),
                                flexShrink: 0,
                            }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 0.5,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight="600"
                                    sx={{ fontSize: "1.1rem" }}
                                >
                                    {member.name}
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: "0.85rem", mb: 1 }}
                            >
                                {member.department || "No Department"}
                            </Typography>
                            <Chip
                                label={member.gender}
                                size="small"
                                sx={{
                                    bgcolor:
                                        getGenderColor(member.gender) === "primary"
                                            ? "rgba(25, 118, 210, 0.1)"
                                            : "rgba(194, 24, 91, 0.1)",
                                    color:
                                        getGenderColor(member.gender) === "primary"
                                            ? "#1976d2"
                                            : "#c2185b",
                                    fontWeight: 500,
                                    fontSize: "0.75rem",
                                    borderRadius: 8,
                                    height: 24,
                                    textTransform: "capitalize",
                                }}
                            />
                        </Box>
                    </Box>

                    <StaffMenu
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        staffDepartment={member.department}
                    />
                </Box>

                {/* Contact Information */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mb: 2,
                    }}
                >
                    <EmailIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.85rem" }}
                    >
                        {member.email}
                    </Typography>
                </Box>

                {/* Staff Details Grid */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 2,
                        pt: 2,
                        borderTop: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: "0.75rem", mb: 0.5 }}
                        >
                            Phone
                        </Typography>
                        <Typography
                            variant="body2"
                            fontWeight="500"
                            sx={{ fontSize: "0.85rem" }}
                        >
                            {member.mobile}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: "0.75rem", mb: 0.5 }}
                        >
                            Department
                        </Typography>
                        <Typography
                            variant="body2"
                            fontWeight="500"
                            sx={{ fontSize: "0.85rem" }}
                        >
                            {member.department || "Not specified"}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: "0.75rem", mb: 0.5 }}
                        >
                            ID
                        </Typography>
                        <Typography
                            variant="body2"
                            fontWeight="500"
                            sx={{ fontSize: "0.85rem" }}
                        >
                            #{member.id.slice(-6)}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: "0.75rem", mb: 0.5 }}
                        >
                            Gender
                        </Typography>
                        <Chip
                            label={member.gender}
                            size="small"
                            sx={{
                                bgcolor:
                                    getGenderColor(member.gender) === "primary"
                                        ? "rgba(25, 118, 210, 0.1)"
                                        : "rgba(194, 24, 91, 0.1)",
                                color:
                                    getGenderColor(member.gender) === "primary"
                                        ? "#1976d2"
                                        : "#c2185b",
                                fontWeight: 500,
                                fontSize: "0.7rem",
                                height: 20,
                                borderRadius: 8,
                                textTransform: "capitalize",
                            }}
                        />
                    </Box>
                </Box>
            </CardContent>
        </CommonCard>
    );
};

export default StaffCard;
