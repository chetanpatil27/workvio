'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
    Popper,
    Paper,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
    ClickAwayListener,
    Grow,
    IconButton
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Visibility as ViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    FileCopy as CopyIcon,
    Archive as ArchiveIcon,
    Restore as RestoreIcon,
    Settings as SettingsIcon,
    PlayArrow as StartIcon,
    Stop as CompleteIcon
} from '@mui/icons-material';

export interface MenuAction {
    id: string;
    label: string;
    icon?: React.ReactNode; // Optional - uses default based on id
    onClick: () => void;
    color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    disabled?: boolean;
    divider?: boolean; // Add divider after this item
}

interface ContextMenuProps {
    trigger?: React.ReactElement; // Custom trigger button, defaults to three-dot menu
    actions: MenuAction[];
    anchorOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
}

// Use a Map to track open menus (better for SSR)
const openMenus = new Map<string, () => void>();

// Default icons for common actions
const getDefaultIcon = (actionId: string): React.ReactNode => {
    const iconMap: Record<string, React.ReactNode> = {
        'view': <ViewIcon fontSize="small" />,
        'edit': <EditIcon fontSize="small" />,
        'delete': <DeleteIcon fontSize="small" />,
        'add': <AddIcon fontSize="small" />,
        'copy': <CopyIcon fontSize="small" />,
        'archive': <ArchiveIcon fontSize="small" />,
        'restore': <RestoreIcon fontSize="small" />,
        'settings': <SettingsIcon fontSize="small" />,
        'start': <StartIcon fontSize="small" />,
        'complete': <CompleteIcon fontSize="small" />,
    };

    return iconMap[actionId] || <MoreVertIcon fontSize="small" />;
};

const ContextMenu: React.FC<ContextMenuProps> = ({
    trigger,
    actions,
    anchorOrigin = {
        vertical: 'top',
        horizontal: 'right',
    },
}) => {
    // Internal state management
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Handle trigger click
    const handleTriggerClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    // Handle close
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    // Default trigger component (three-dot menu button)
    const defaultTrigger = (
        <IconButton
            data-menu-button="true"
            size="small"
            sx={{ ml: 1 }}
        >
            <MoreVertIcon fontSize="small" />
        </IconButton>
    );

    // Get the trigger to use
    const triggerToUse = trigger || defaultTrigger;

    // Generate a unique ID for this menu instance
    const menuId = React.useRef(`menu-${Math.random().toString(36).substr(2, 9)}`).current;

    // Register this menu when it opens and close others
    useEffect(() => {
        if (open) {
            // Close all other open menus
            openMenus.forEach((closeMenu, id) => {
                if (id !== menuId) {
                    closeMenu();
                }
            });
            // Register this menu
            openMenus.set(menuId, handleClose);
        } else {
            // Unregister this menu when it closes
            openMenus.delete(menuId);
        }

        // Cleanup on unmount
        return () => {
            openMenus.delete(menuId);
        };
    }, [open, handleClose, menuId]);

    // Handle scroll events to close menu when scrolling outside
    useEffect(() => {
        if (!open) return;

        const handleScroll = (event: Event) => {
            const target = event.target as HTMLElement;

            // Check if the scroll is happening within the menu
            const menuElement = document.querySelector(`[data-menu-id="${menuId}"]`);
            if (menuElement && menuElement.contains(target)) {
                return; // Don't close if scrolling within the menu
            }

            // Close menu if scrolling outside
            handleClose();
        };

        // Add scroll listener to document and all scrollable containers
        document.addEventListener('scroll', handleScroll, true);
        window.addEventListener('scroll', handleScroll, true);

        return () => {
            document.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [open, handleClose, menuId]);

    const handleActionClick = (action: MenuAction) => {
        action.onClick();
        handleClose();
    };

    // Handle click away - but ignore clicks on menu buttons
    const handleClickAway = (event: MouseEvent | TouchEvent) => {
        const target = event.target as HTMLElement;

        // Check if the click is on a menu button (data-menu-button="true")
        const isMenuButton = target.closest('[data-menu-button="true"]');

        // Don't close if clicking on a menu button - let the button handle opening/closing
        if (!isMenuButton) {
            // Small delay to prevent race conditions with other menu opens
            setTimeout(() => {
                handleClose();
            }, 10);
        }
    };

    // Convert anchorOrigin to Popper placement
    const getPlacement = () => {
        const { vertical, horizontal } = anchorOrigin;
        if (vertical === 'bottom' && horizontal === 'right') return 'bottom-end';
        if (vertical === 'bottom' && horizontal === 'left') return 'bottom-start';
        if (vertical === 'top' && horizontal === 'right') return 'top-end';
        if (vertical === 'top' && horizontal === 'left') return 'top-start';
        if (vertical === 'bottom' && horizontal === 'center') return 'bottom';
        if (vertical === 'top' && horizontal === 'center') return 'top';
        return 'bottom-end'; // default
    };

    // Don't render on server to avoid hydration issues
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <>
            {triggerToUse && React.cloneElement(triggerToUse, {
                onClick: handleTriggerClick,
            } as React.HTMLAttributes<HTMLElement>)}
            <Popper
                open={open}
                anchorEl={anchorEl}
                placement={getPlacement()}
                transition
                disablePortal={false}
                modifiers={[
                    {
                        name: 'preventOverflow',
                        enabled: true,
                        options: {
                            altAxis: true,
                            altBoundary: true,
                            tether: true,
                            rootBoundary: 'document',
                            padding: 8,
                        },
                    },
                    {
                        name: 'flip',
                        enabled: true,
                        options: {
                            altBoundary: true,
                            rootBoundary: 'document',
                            padding: 8,
                        },
                    },
                ]}
                style={{ zIndex: 1300 }}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement.includes('bottom') ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper
                            elevation={3}
                            data-menu-id={menuId}
                            sx={{
                                borderRadius: '6px',
                                border: '1px solid',
                                borderColor: 'divider',
                                minWidth: 160,
                                maxWidth: 320,
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <MenuList
                                    autoFocusItem={false}
                                    disablePadding={false}
                                    sx={{
                                        py: 0.5,
                                    }}
                                >
                                    {actions.map((action, index) => {
                                        const menuItems = [];

                                        menuItems.push(
                                            <MenuItem
                                                key={action.id}
                                                onClick={() => handleActionClick(action)}
                                                disabled={action.disabled}
                                                sx={{
                                                    color: action.color ? `${action.color}.main` : 'text.primary',
                                                    py: 1.25,
                                                    px: 2,
                                                    fontSize: '0.875rem',
                                                    mx: 0.5,
                                                    borderRadius: '4px',
                                                    '&:hover': {
                                                        bgcolor: action.color === 'error'
                                                            ? 'error.light'
                                                            : 'action.hover',
                                                        ...(action.color === 'error' && {
                                                            color: 'error.contrastText',
                                                        }),
                                                    },
                                                    '&.Mui-disabled': {
                                                        opacity: 0.5,
                                                    },
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 32,
                                                        color: 'inherit',
                                                        '& .MuiSvgIcon-root': {
                                                            fontSize: '1.1rem',
                                                        },
                                                    }}
                                                >
                                                    {action.icon || getDefaultIcon(action.id)}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={action.label}
                                                    sx={{
                                                        '& .MuiListItemText-primary': {
                                                            fontSize: '0.875rem',
                                                            fontWeight: 500,
                                                        },
                                                    }}
                                                />
                                            </MenuItem>
                                        );

                                        if (action.divider && index < actions.length - 1) {
                                            menuItems.push(
                                                <Divider key={`divider-${action.id}`} sx={{ my: 0.5 }} />
                                            );
                                        }

                                        return menuItems;
                                    }).flat()}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

export default ContextMenu;
