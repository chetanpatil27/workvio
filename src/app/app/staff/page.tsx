"use client";

import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { Staff, removeStaff } from "@/store/slices/staff";
import { useRouter } from "next/navigation";
import { ConfirmationModal } from "@/components/common";

// Import new components
import {
  StaffHeader,
  StaffSearchFilters,
  StaffList,
  StaffDialog,
} from "./components";
import { useStaffDialog } from "./hooks";
import {
  filterStaffBySearch,
  filterStaffByTab,
  getStaffStats
} from "./utils";
import { STAFF_TABS } from "./constants";

export default function StaffPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { staff } = useSelector((state: RootState) => state.staff);

  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<number>(STAFF_TABS.ALL);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  // Staff dialog hook
  const staffDialog = useStaffDialog();

  // Memoized filtered staff for performance
  const filteredStaff = useMemo(() => {
    let filtered = filterStaffBySearch(staff, searchTerm);
    filtered = filterStaffByTab(filtered, selectedTab);
    return filtered;
  }, [staff, searchTerm, selectedTab]);

  // Calculate stats
  const stats = useMemo(() => getStaffStats(staff), [staff]);

  // Calculate active staff count for tabs
  const activeStaffCount = useMemo(() =>
    filterStaffByTab(filterStaffBySearch(staff, searchTerm), STAFF_TABS.ACTIVE).length,
    [staff, searchTerm]
  );

  const handleDeleteConfirm = () => {
    if (selectedStaff) {
      dispatch(removeStaff(selectedStaff.id));
    }
    setDeleteDialogOpen(false);
    setSelectedStaff(null);
  };

  const handleView = (staff: Staff) => {
    router.push(`/staff/${staff.id}`);
  };

  const handleEdit = (staff: Staff) => {
    staffDialog.openEditDialog(staff);
  };

  const handleDelete = (staff: Staff) => {
    setSelectedStaff(staff);
    setDeleteDialogOpen(true);
  };

  const handleStaffClick = (staffId: string) => {
    router.push(`/staff/${staffId}`);
  };

  return (
    <Box>
      {/* Header with stats */}
      <StaffHeader
        stats={stats}
        onCreateStaff={staffDialog.openCreateDialog}
      />

      {/* Search and Tabs Section */}
      <StaffSearchFilters
        searchTerm={searchTerm}
        selectedTab={selectedTab}
        filteredStaffCount={filteredStaff.length}
        activeStaffCount={activeStaffCount}
        onSearchChange={setSearchTerm}
        onTabChange={setSelectedTab}
      />

      {/* Staff List/Grid */}
      <StaffList
        staff={filteredStaff}
        searchTerm={searchTerm}
        onStaffClick={handleStaffClick}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreateStaff={staffDialog.openCreateDialog}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Staff Member"
        subtitle="This action cannot be undone"
        message={
          <>
            Are you sure you want to delete{" "}
            <strong>{selectedStaff?.name}</strong>? This action cannot be
            undone.
          </>
        }
        confirmText="Delete"
        confirmColor="error"
        size="sm"
        transition="zoom"
        transitionDuration={250}
      />

      {/* Staff Dialog */}
      <StaffDialog
        open={staffDialog.isOpen}
        isEditing={staffDialog.isEditing}
        formData={staffDialog.formData}
        errors={staffDialog.errors}
        isSubmitting={staffDialog.isSubmitting}
        onClose={staffDialog.closeDialog}
        onSave={staffDialog.handleSave}
        onFormDataChange={staffDialog.handleFormDataChange}
      />
    </Box>
  );
}
