'use client';
import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

const Preloader = ({ isActive }) => {
    const [shouldRender, setShouldRender] = useState(isActive);

    useEffect(() => {
        let timeout;
        if (!isActive) {
            timeout = setTimeout(() => setShouldRender(false), 150);
        } else {
            setShouldRender(true);
        }
        return () => clearTimeout(timeout);
    }, [isActive]);

    if (!shouldRender) {
        return null;
    }

    return (
        <div className={`${styles.preloader} ${!isActive ? styles.off : ''}`}>
            <div className={styles.black_wall}></div>
        </div>
    );
};

export default Preloader;
