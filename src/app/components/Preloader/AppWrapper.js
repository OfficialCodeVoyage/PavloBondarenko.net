'use client';

import { useEffect, useState } from 'react';
import Preloader from './Preloader';

const AppWrapper = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [shouldShowPreloader, setShouldShowPreloader] = useState(false);

    useEffect(() => {
        // Check if this is the first visit in the session
        const hasVisited = sessionStorage.getItem('hasVisited');
        
        if (!hasVisited) {
            // First visit - show preloader
            setShouldShowPreloader(true);
            setIsLoading(true);
            
            const timer = setTimeout(() => {
                setIsLoading(false);
                sessionStorage.setItem('hasVisited', 'true');
                // Hide preloader after animation completes
                setTimeout(() => setShouldShowPreloader(false), 500);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            // Already visited - don't show preloader
            setShouldShowPreloader(false);
            setIsLoading(false);
        }
    }, []); // Empty dependency array - only runs once on mount

    return (
        <>
            {shouldShowPreloader && <Preloader isActive={isLoading} />}
            {children}
        </>
    );
};

export default AppWrapper;
