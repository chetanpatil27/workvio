'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface MenuState {
    anchorEl: HTMLElement | null;
    menuId: string | null;
    data: unknown;
}

interface MenuContextType {
    currentMenu: MenuState;
    openMenu: (menuId: string, anchorEl: HTMLElement, data?: unknown) => void;
    closeMenu: () => void;
    isMenuOpen: (menuId: string) => boolean;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
    children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
    const [currentMenu, setCurrentMenu] = useState<MenuState>({
        anchorEl: null,
        menuId: null,
        data: null,
    });

    const openMenu = useCallback((menuId: string, anchorEl: HTMLElement, data?: unknown) => {
        setCurrentMenu({
            anchorEl,
            menuId,
            data,
        });
    }, []);

    const closeMenu = useCallback(() => {
        setCurrentMenu({
            anchorEl: null,
            menuId: null,
            data: null,
        });
    }, []);

    const isMenuOpen = useCallback((menuId: string) => {
        return currentMenu.menuId === menuId && currentMenu.anchorEl !== null;
    }, [currentMenu]);

    const value: MenuContextType = {
        currentMenu,
        openMenu,
        closeMenu,
        isMenuOpen,
    };

    return (
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
};

// Hook for individual menu components
export const useMenuHandler = (menuId: string) => {
    const { currentMenu, openMenu, closeMenu, isMenuOpen } = useMenu();

    const handleMenuClick = useCallback((event: React.MouseEvent<HTMLElement>, data?: unknown) => {
        event.stopPropagation();

        // If this menu is already open, close it
        if (isMenuOpen(menuId)) {
            closeMenu();
        } else {
            // Close any other open menu and open this one
            openMenu(menuId, event.currentTarget, data);
        }
    }, [menuId, openMenu, closeMenu, isMenuOpen]);

    const handleMenuClose = useCallback(() => {
        closeMenu();
    }, [closeMenu]);

    return {
        anchorEl: isMenuOpen(menuId) ? currentMenu.anchorEl : null,
        isOpen: isMenuOpen(menuId),
        selectedData: isMenuOpen(menuId) ? currentMenu.data : null,
        handleMenuClick,
        handleMenuClose,
    };
};
