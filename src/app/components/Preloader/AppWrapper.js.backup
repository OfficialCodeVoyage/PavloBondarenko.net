'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Preloader from './Preloader';

const AppWrapper = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 150);

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <>
            <Preloader isActive={isLoading} />
            {children}
        </>
    );
};

export default AppWrapper;
