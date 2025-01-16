'use client';
import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

const Preloader = ({ isActive }) => {
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        let timeout;
        if (!isActive) {
            timeout = setTimeout(() => setShouldRender(false), 500); // Длительность совпадает с анимацией
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
            <div className={styles.loader}></div>
        </div>
    );
};

export default Preloader;
