'use client';

import React, { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Button from '@/components/form-controls/button';
import {
    Save as SaveIcon,
    Delete as DeleteIcon,
    Warning as WarningIcon,
    Info as InfoIcon,
    Add as AddIcon,
    Link as LinkIcon,
} from '@mui/icons-material';

export default function ButtonDemo() {
    const [loading, setLoading] = useState(false);

    const handleLoadingDemo = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                Enhanced Button Component Demo
            </Typography>

            {/* Filled Variants */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Filled Variants (Auto White Text)
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <Button color="primary" variant="filled" startIcon={<AddIcon />}>
                    Primary
                </Button>
                <Button color="success" variant="filled" startIcon={<SaveIcon />}>
                    Success
                </Button>
                <Button color="danger" variant="filled" startIcon={<DeleteIcon />}>
                    Danger
                </Button>
                <Button color="warning" variant="filled" startIcon={<WarningIcon />}>
                    Warning
                </Button>
                <Button color="info" variant="filled" startIcon={<InfoIcon />}>
                    Info
                </Button>
                <Button color="link" variant="filled" startIcon={<LinkIcon />}>
                    Link
                </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Outlined Variants */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Outlined Variants (Smart Color Text)
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <Button color="primary" variant="outlined" startIcon={<AddIcon />}>
                    Primary
                </Button>
                <Button color="success" variant="outlined" startIcon={<SaveIcon />}>
                    Success
                </Button>
                <Button color="danger" variant="outlined" startIcon={<DeleteIcon />}>
                    Danger
                </Button>
                <Button color="warning" variant="outlined" startIcon={<WarningIcon />}>
                    Warning
                </Button>
                <Button color="info" variant="outlined" startIcon={<InfoIcon />}>
                    Info
                </Button>
                <Button color="link" variant="outlined" startIcon={<LinkIcon />}>
                    Link
                </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Size Variants */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Size Variants
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 4 }}>
                <Button color="success" size="sm">
                    Small
                </Button>
                <Button color="success" size="md">
                    Medium
                </Button>
                <Button color="success" size="lg">
                    Large
                </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Loading States */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Loading States (Color-Matched Spinners)
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <Button
                    color="success"
                    loading={loading}
                    loadingText="Saving..."
                    onClick={handleLoadingDemo}
                >
                    Test Loading
                </Button>
                <Button
                    color="danger"
                    variant="outlined"
                    loading={loading}
                    loadingText="Deleting..."
                >
                    Delete Item
                </Button>
                <Button
                    color="info"
                    loading={loading}
                >
                    Processing
                </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Disabled States */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Disabled States (Auto Gray)
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <Button color="success" disabled>
                    Disabled Filled
                </Button>
                <Button color="danger" variant="outlined" disabled>
                    Disabled Outlined
                </Button>
                <Button color="warning" size="lg" disabled>
                    Disabled Large
                </Button>
            </Box>

            <Box sx={{
                mt: 4,
                p: 3,
                bgcolor: 'grey.50',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.200'
            }}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                    ✨ Key Features:
                </Typography>
                <Typography variant="body2" component="div">
                    • <strong>Smart text colors:</strong> Auto white text on dark backgrounds<br />
                    • <strong>Color-matched hovers:</strong> Each color has its own hover behavior<br />
                    • <strong>Consistent shadows:</strong> Shadow colors match button colors<br />
                    • <strong>Loading spinners:</strong> Spinner colors match text colors<br />
                    • <strong>Clean API:</strong> Just use color=&quot;success&quot; instead of complex styling
                </Typography>
            </Box>
        </Box>
    );
}
