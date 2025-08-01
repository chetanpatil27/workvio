import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { addStatus, updateStatus, deleteStatus } from '@/store/slices/status';
import type { TicketStatus } from '@/store/slices/status';

export const useStatus = () => {
    const dispatch = useDispatch();
    const { statuses, loading, error } = useSelector((state: RootState) => state.status);

    const [selectedStatus, setSelectedStatus] = useState<TicketStatus | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isClient, setIsClient] = useState(false);

    // Ensure we're on the client side to prevent hydration issues
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Use empty arrays on server-side to prevent hydration mismatch
    const safeStatuses = isClient ? statuses : [];

    // Calculate stats
    const statusStats = {
        total: safeStatuses.filter(s => !s.isDeleted).length,
        active: safeStatuses.filter(s => !s.isDeleted && s.active).length,
        inactive: safeStatuses.filter(s => !s.isDeleted && !s.active).length,
        default: safeStatuses.filter(s => !s.isDeleted && s.isDefault).length,
        custom: safeStatuses.filter(s => !s.isDeleted && !s.isDefault).length,
    };

    // Get visible statuses (not deleted)
    const visibleStatuses = safeStatuses
        .filter(status => !status.isDeleted)
        .sort((a, b) => a.order - b.order);

    // Handle menu click
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, status: TicketStatus) => {
        setAnchorEl(event.currentTarget);
        setSelectedStatus(status);
    };

    // Handle menu close
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedStatus(null);
    };

    // Handle create status
    const handleCreateStatus = (statusData: { name: string; color: string; description?: string; active: boolean }) => {
        const maxOrder = Math.max(...safeStatuses.map(s => s.order), 0);
        dispatch(addStatus({
            ...statusData,
            order: maxOrder + 1,
        }));
    };

    // Handle update status
    const handleUpdateStatus = (id: string, statusData: { name: string; color: string; description?: string }) => {
        dispatch(updateStatus({ id, updates: statusData }));
    };

    // Handle edit status
    const handleEditStatus = () => {
        // This will be called from the menu
        handleMenuClose();
    };

    // Handle delete status
    const handleDeleteStatus = () => {
        if (selectedStatus) {
            dispatch(deleteStatus(selectedStatus.id));
            handleMenuClose();
        }
    };

    // Handle toggle active status
    const handleToggleActive = () => {
        if (selectedStatus) {
            dispatch(updateStatus({
                id: selectedStatus.id,
                updates: { active: !selectedStatus.active }
            }));
            handleMenuClose();
        }
    };

    return {
        statuses: visibleStatuses,
        statusStats,
        selectedStatus,
        anchorEl,
        loading: loading || !isClient, // Show loading until client-side hydration
        error,
        handleMenuClick,
        handleMenuClose,
        handleCreateStatus,
        handleUpdateStatus,
        handleEditStatus,
        handleDeleteStatus,
        handleToggleActive,
    };
};
