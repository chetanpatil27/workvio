'use client';

import React, { useEffect } from 'react';
import {
    Popper,
    Paper,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
    ClickAwayListener,
    Grow
} from '@mui/material';

export interface MenuAction {
    id: string;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    disabled?: boolean;
    divider?: boolean; // Add divider after this item
}

interface ContextMenuProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    onClose: () => void;
    actions: MenuAction[];
    anchorOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
}

// Use a Map to track open menus (better for SSR)
const openMenus = new Map<string, () => void>();

const ContextMenu: React.FC<ContextMenuProps> = ({
    anchorEl,
    open,
    onClose,
    actions,
    anchorOrigin = {
        vertical: 'top',
        horizontal: 'right',
    },
}) => {
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
            openMenus.set(menuId, onClose);
        } else {
            // Unregister this menu when it closes
            openMenus.delete(menuId);
        }

        // Cleanup on unmount
        return () => {
            openMenus.delete(menuId);
        };
    }, [open, onClose, menuId]);

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
            onClose();
        };

        // Add scroll listener to document and all scrollable containers
        document.addEventListener('scroll', handleScroll, true);
        window.addEventListener('scroll', handleScroll, true);

        return () => {
            document.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [open, onClose, menuId]);

    const handleActionClick = (action: MenuAction) => {
        action.onClick();
        onClose();
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
                onClose();
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
                                                {action.icon}
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
    );
};

export default ContextMenu;
