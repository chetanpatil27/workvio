'use client';

import { useEffect } from 'react';

export const useModalCleanup = (isOpen: boolean) => {
    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return;
        
        return () => {
            // Cleanup when component unmounts or modal closes
            if (!isOpen) {
                // Remove any lingering modal elements
                const backdrops = document.querySelectorAll('.MuiBackdrop-root, .MuiModal-backdrop');
                backdrops.forEach(backdrop => {
                    if (backdrop.parentElement) {
                        backdrop.parentElement.removeChild(backdrop);
                    }
                });

                // Reset body styles
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                document.body.style.pointerEvents = '';
                
                // Reset document styles
                document.documentElement.style.pointerEvents = '';
                
                // Remove modal-related attributes
                document.body.removeAttribute('aria-hidden');
                document.body.classList.remove('mui-fixed');
                
                // Force a repaint to ensure styles are applied
                void document.body.offsetHeight;
            }
        };
    }, [isOpen]);

    // Global cleanup on unmount
    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return;
        
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            document.body.style.pointerEvents = '';
            document.documentElement.style.pointerEvents = '';
        };
    }, []);
};
