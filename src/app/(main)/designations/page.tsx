'use client';

import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Switch } from '@mui/material';
import Button from '@/components/form-controls/button';
import { Input, Textarea } from '@/components/form-controls';
import { useDispatch } from 'react-redux';
import { addDesignation, updateDesignation } from '@/store/slices/designation';
import { useDesignation } from './hooks';
import {
  DesignationHeader,
  DesignationSearchFilters,
  DesignationList,
  DesignationMenu,
} from './components';

interface DesignationFormData {
  name: string;
  description: string;
  active: boolean;
}

export default function DesignationsPage() {
  const dispatch = useDispatch();
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<DesignationFormData>({
    name: '',
    description: '',
    active: true,
  });

  const {
    designations,
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
  } = useDesignation();

  // Form handlers
  const handleCreateNew = () => {
    setFormData({
      name: '',
      description: '',
      active: true,
    });
    setIsEditMode(false);
    setFormDialogOpen(true);
  };

  const handleEdit = () => {
    if (selectedDesignation) {
      setFormData({
        name: selectedDesignation.name,
        description: selectedDesignation.description,
        active: selectedDesignation.active,
      });
      setIsEditMode(true);
      setFormDialogOpen(true);
    }
    handleMenuClose();
  };

  const handleFormClose = () => {
    setFormDialogOpen(false);
    setIsEditMode(false);
    setFormData({
      name: '',
      description: '',
      active: true,
    });
  };

  const handleFormSubmit = () => {
    if (formData.name.trim()) {
      if (isEditMode && selectedDesignation) {
        dispatch(updateDesignation({
          ...selectedDesignation,
          ...formData,
        }));
      } else {
        dispatch(addDesignation(formData));
      }
      handleFormClose();
    }
  };

  const handleInputChange = (field: keyof DesignationFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      active: event.target.checked,
    }));
  };

  return (
    <Box>
      {/* Header with Stats */}
      <DesignationHeader
        stats={designationStats}
        onCreateDesignation={handleCreateNew}
      />

      {/* Search and Filters */}
      <DesignationSearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Designation List */}
      <DesignationList
        designations={designations}
        onDesignationClick={handleViewDesignation}
        onMenuClick={handleMenuClick}
        onCreateDesignation={handleCreateNew}
      />

      {/* Context Menu */}
      <DesignationMenu
        anchorEl={anchorEl}
        isActive={selectedDesignation?.active || false}
        onClose={handleMenuClose}
        onView={() => handleViewDesignation()}
        onEdit={handleEdit}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeleteDesignation}
      />

      {/* Form Dialog */}
      <Dialog 
        open={formDialogOpen} 
        onClose={handleFormClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '6px',
            border: '1px solid',
            borderColor: 'divider',
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, fontSize: '1.25rem' }}>
          {isEditMode ? 'Edit Designation' : 'Create New Designation'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Input
              label="Designation Name"
              value={formData.name}
              onChange={handleInputChange('name')}
              isRequired
              sx={{ mb: 2 }}
            />
            
            <Box sx={{ mb: 2 }}>
              <Textarea
                label="Description"
                value={formData.description}
                onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                rows={4}
                placeholder="Enter a detailed description of this designation..."
              />
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={formData.active}
                  onChange={handleSwitchChange}
                  color="primary"
                />
              }
              label="Active Status"
              sx={{ mt: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={handleFormClose} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={handleFormSubmit} 
            variant="filled"
            disabled={!formData.name.trim()}
          >
            {isEditMode ? 'Update Designation' : 'Create Designation'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
