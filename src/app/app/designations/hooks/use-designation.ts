'use client';

import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { 
  Designation,
  removeDesignation,
  toggleDesignationStatus
} from '@/store/slices/designation';
import { useRouter } from 'next/navigation';

export const useDesignation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { designations } = useSelector((state: RootState) => state.designation);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDesignation, setSelectedDesignation] = useState<Designation | null>(null);

  // Calculate stats
  const designationStats = useMemo(() => {
    const active = designations.filter(d => d.active).length;
    const inactive = designations.filter(d => !d.active).length;
    
    return {
      total: designations.length,
      active,
      inactive,
    };
  }, [designations]);

  // Filter designations based on search term
  const filteredDesignations = useMemo(() => {
    if (!searchTerm.trim()) return designations;
    
    const term = searchTerm.toLowerCase();
    return designations.filter(designation =>
      designation.name.toLowerCase().includes(term) ||
      designation.description.toLowerCase().includes(term)
    );
  }, [designations, searchTerm]);

  // Handle menu actions
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, designationId: string) => {
    setAnchorEl(event.currentTarget);
    const designation = designations.find(d => d.id === designationId);
    setSelectedDesignation(designation || null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDesignation(null);
  };

  const handleViewDesignation = (designationId?: string) => {
    const id = designationId || selectedDesignation?.id;
    if (id) {
      router.push(`/designations/${id}`);
    }
    handleMenuClose();
  };

  const handleDeleteDesignation = () => {
    if (selectedDesignation) {
      dispatch(removeDesignation(selectedDesignation.id));
    }
    handleMenuClose();
  };

  const handleToggleStatus = () => {
    if (selectedDesignation) {
      dispatch(toggleDesignationStatus(selectedDesignation.id));
    }
    handleMenuClose();
  };

  return {
    designations: filteredDesignations,
    designationStats,
    selectedDesignation,
    searchTerm,
    setSearchTerm,
    anchorEl,
    handleMenuClick,
    handleMenuClose,
    handleViewDesignation,
    handleDeleteDesignation,
    handleToggleStatus,
  };
};
