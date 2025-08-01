'use client';

import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { Team, deleteTeam } from '@/store/slices/team';

export const useTeam = () => {
    const dispatch = useDispatch();
    const { teams, loading, error } = useSelector((state: RootState) => state.team);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    // Filter teams based on search and status
    const filteredTeams = useMemo(() => {
        return teams.filter(team => {
            const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                team.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesStatus = filterStatus === 'all' || team.status === filterStatus;
            
            return matchesSearch && matchesStatus;
        });
    }, [teams, searchTerm, filterStatus]);

    // Team statistics
    const teamStats = useMemo(() => {
        const total = teams.length;
        const active = teams.filter(team => team.status === 'active').length;
        const inactive = teams.filter(team => team.status === 'inactive').length;
        const totalMembers = teams.reduce((sum, team) => sum + team.members.length, 0);
        const totalProjects = teams.reduce((sum, team) => sum + team.projectsCount, 0);

        return {
            total,
            active,
            inactive,
            totalMembers,
            totalProjects,
        };
    }, [teams]);

    // Menu handlers
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, team: Team) => {
        event.stopPropagation();
        setSelectedTeam(team);
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedTeam(null);
    };

    // Team actions
    const handleViewTeam = (teamId: string) => {
        console.log('View team:', teamId);
        handleMenuClose();
    };

    const handleDeleteTeam = () => {
        if (selectedTeam) {
            dispatch(deleteTeam(selectedTeam.id));
            handleMenuClose();
        }
    };

    return {
        teams: filteredTeams,
        teamStats,
        selectedTeam,
        searchTerm,
        setSearchTerm,
        filterStatus,
        setFilterStatus,
        anchorEl,
        handleMenuClick,
        handleMenuClose,
        handleViewTeam,
        handleDeleteTeam,
        loading,
        error,
    };
};
