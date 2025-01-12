'use client';

import { useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from './not-found.module.css';

export default function NotFoundPage() {
    // Создаём ref для элемента с классом bola
    const bolaRef = useRef(null);

    useEffect(() => {
        // Проверяем, что реф не пустой
        if (!bolaRef.current) return;

        const THREE = require('three'); // Импортируем three.js

        const container = bolaRef.current;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        const camera = new THREE.PerspectiveCamera(80, 1, 0.1, 10000);
        const scene = new THREE.Scene();

        scene.add(camera);
        renderer.setSize(300, 300);
        container.appendChild(renderer.domElement);

        // Camera
        camera.position.z = 200;

        // Material
        const pinkMat = new THREE.MeshPhongMaterial({
            color: new THREE.Color('rgb(226,35,213)'),
            emissive: new THREE.Color('rgb(0,0,0)'),
            specular: new THREE.Color('rgb(255,155,255)'),
            shininess: 100,
            flatShading: true,
            transparent: true,
            opacity: 1,
        });


        // Lights
        const L1 = new THREE.PointLight(0xffffff, 1);
        L1.position.set(100, 100, 100);
        scene.add(L1);

        const L2 = new THREE.PointLight(0xffffff, 0.8);
        L2.position.set(-100, 400, 200);
        scene.add(L2);

        // IcoSphere
        const Ico = new THREE.Mesh(new THREE.IcosahedronGeometry(75, 1), pinkMat);
        Ico.rotation.z = 0.5;
        scene.add(Ico);

        function update() {
            Ico.rotation.x += 2 / 100;
            Ico.rotation.y += 2 / 100;
        }

        function render() {
            requestAnimationFrame(render);
            renderer.render(scene, camera);
            update();
        }

        render();
    }, []);

    return (
        <>
            <Head>
                <title>404 - Soon</title>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Head>
            <main className={styles.container_not_found}>
                <p className={styles.mega}>
                    4<span className={styles.boom}>0</span>4
                </p>
                {/* Привязываем реф к div с классом bola */}
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
