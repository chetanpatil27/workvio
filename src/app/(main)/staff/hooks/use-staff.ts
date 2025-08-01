'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';
import { Staff, removeStaff, addStaff } from '@/store/slices/staff';

export interface StaffFormData {
  name: string;
  email: string;
  mobile: string;
  gender: Staff['gender'];
  department: string;
}

export const useStaff = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { staff } = useSelector((state: RootState) => state.staff);

  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterGender, setFilterGender] = useState<Staff['gender'] | 'all'>('all');

  // Menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);

  // Computed values
  const filteredStaff = useMemo(() => {
    let filtered = staff;

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.department && member.department.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply department filter
    if (filterDepartment !== 'all') {
      filtered = filtered.filter(member => member.department === filterDepartment);
    }

    // Apply gender filter
    if (filterGender !== 'all') {
      filtered = filtered.filter(member => member.gender === filterGender);
    }

    return filtered;
  }, [staff, searchTerm, filterDepartment, filterGender]);

  const staffStats = useMemo(() => ({
    total: staff.length,
    male: staff.filter(s => s.gender === 'male').length,
    female: staff.filter(s => s.gender === 'female').length,
    departments: [...new Set(staff.map(s => s.department).filter(Boolean))].length,
  }), [staff]);

  const departments = useMemo(() => {
    return [...new Set(staff.map(s => s.department).filter(Boolean))];
  }, [staff]);

  // Menu handlers
  const handleMenuClick = useCallback((event: React.MouseEvent<HTMLElement>, staffId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedStaffId(staffId);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    setSelectedStaffId(null);
  }, []);

  // Staff actions
  const handleViewStaff = useCallback((staffId: string) => {
    router.push(`/staff/${staffId}`);
  }, [router]);

  const handleCreateStaff = useCallback(() => {
    router.push('/staff/create');
  }, [router]);

  const handleDeleteStaff = useCallback(() => {
    if (selectedStaffId) {
      dispatch(removeStaff(selectedStaffId));
    }
    handleMenuClose();
  }, [selectedStaffId, dispatch, handleMenuClose]);

  const handleSaveStaff = useCallback((formData: StaffFormData, isEditing: boolean) => {
    const newStaff: Staff = {
      id: isEditing ? selectedStaffId! : `staff-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      gender: formData.gender,
      department: formData.department,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addStaff(newStaff));
  }, [selectedStaffId, dispatch]);

  // Utility functions
  const getSelectedStaff = useCallback(() => {
    return staff.find(s => s.id === selectedStaffId) || null;
  }, [staff, selectedStaffId]);

  return {
    // Data
    staff: filteredStaff,
    staffStats,
    departments,
    selectedStaff: getSelectedStaff(),

    // Search and filter
    searchTerm,
    setSearchTerm,
    selectedTab,
    setSelectedTab,
    filterDepartment,
    setFilterDepartment,
    filterGender,
    setFilterGender,

    // Menu state
    anchorEl,
    selectedStaffId,
    handleMenuClick,
    handleMenuClose,

    // Actions
    handleViewStaff,
    handleCreateStaff,
    handleDeleteStaff,
    handleSaveStaff,
  };
};
