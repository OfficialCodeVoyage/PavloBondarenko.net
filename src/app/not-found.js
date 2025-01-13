'use client';

import { useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from './not-found.module.css';
import * as THREE from 'three';

export default function NotFoundPage() {
    const bolaRef = useRef(null);

    useEffect(() => {
        if (!bolaRef.current) return;

        const container = bolaRef.current;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(80, 1, 0.1, 10000);
        camera.position.z = 200;

        const scene = new THREE.Scene();

        // Освещение
        const L1 = new THREE.PointLight(0xffffff, 1);
        L1.position.set(100, 100, 100);
        scene.add(L1);

        const L2 = new THREE.PointLight(0xffffff, 0.8);
        L2.position.set(-100, 400, 200);
        scene.add(L2);

        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);

        const pinkMat = new THREE.MeshPhongMaterial({
            color: new THREE.Color('rgb(226,35,213)'),
            emissive: new THREE.Color('rgb(0,0,0)'),
            specular: new THREE.Color('rgb(255,155,255)'),
            shininess: 100,
            flatShading: true,
            transparent: true,
            opacity: 1,
        });

        const icoGeometry = new THREE.IcosahedronGeometry(75, 1);
        const Ico = new THREE.Mesh(icoGeometry, pinkMat);
        Ico.rotation.z = 0.5;
        scene.add(Ico);

        const animate = () => {
            requestAnimationFrame(animate);
            Ico.rotation.x += 0.02;
            Ico.rotation.y += 0.02;
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <>
            <Head>
                <title>404 - Soon</title>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet" />
            </Head>
            <main className={styles.container_not_found}>
                <p className={styles.mega}>
                    4<span className={styles.boom}>0</span>4
                </p>
                <div ref={bolaRef} className={styles.bola}></div>
                <p className={styles.mini}>
                    I am working on it) <i>P.B.</i>
                </p>
                <p className={styles.mini2}>
                    Go Back to the{' '}
                    <i>
                        <a href="/" style={{ color: 'white' }}>
                            Main Page
                        </a>
                    </i>
                </p>
            </main>
        </>
    );
}
