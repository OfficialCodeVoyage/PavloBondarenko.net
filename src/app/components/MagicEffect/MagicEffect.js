'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import './style.css';

export default function MagicEffect() {
    const magicRef = useRef(null);
    const environmentRef = useRef(null);

    useEffect(() => {
        const vertexShader = `
            attribute float size;
            attribute vec3 customColor;
            varying vec3 vColor;

            void main() {
              vColor = customColor;
              vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
              gl_PointSize = size * ( 300.0 / -mvPosition.z );
              gl_Position = projectionMatrix * mvPosition;
            }
        `;

        const fragmentShader = `
            uniform vec3 color;
            uniform sampler2D pointTexture;
            varying vec3 vColor;

            void main() {
              gl_FragColor = vec4( color * vColor, 1.0 );
              gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
            }
        `;

        const preload = async () => {
            const manager = new THREE.LoadingManager();
            return new Promise((resolve, reject) => {
                let loadedFont = null;
                let loadedParticle = null;

                manager.onLoad = () => {
                    resolve({ font: loadedFont, particle: loadedParticle });
                };
                manager.onError = (url) => {
                    console.error(`Error loading ${url}`);
                    reject(new Error(`Error loading ${url}`));
                };

                const fontLoader = new FontLoader(manager);
                fontLoader.load(
                    'https://res.cloudinary.com/dydre7amr/raw/upload/v1612950355/font_zsd4dr.json',
                    (font) => {
                        loadedFont = font;
                    }
                );

                const textureLoader = new THREE.TextureLoader(manager);
                loadedParticle = textureLoader.load(
                    'https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png'
                );
            });
        };

        class Environment {
            constructor(font, particle) {
                this.font = font;
                this.particle = particle;
                this.container = magicRef.current;
                this.scene = new THREE.Scene();
                this.createCamera();
                this.createRenderer();
                this.setup();
                this.bindEvents();
            }

            bindEvents() {
                window.addEventListener('resize', this.onWindowResize.bind(this));
            }

            setup() {
                this.createParticles = new CreateParticles(
                    this.scene,
                    this.font,
                    this.particle,
                    this.camera,
                    this.renderer
                );
            }

            render() {
                this.createParticles.render();
                this.renderer.render(this.scene, this.camera);
            }

            createCamera() {
                this.camera = new THREE.PerspectiveCamera(
                    65,
                    this.container.clientWidth / this.container.clientHeight,
                    1,
                    10000
                );
                this.camera.position.set(0, 0, 100);
            }

            createRenderer() {
                this.renderer = new THREE.WebGLRenderer({ alpha: true });
                this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                this.renderer.outputColorSpace = THREE.SRGBColorSpace;
                this.container.appendChild(this.renderer.domElement);
                this.renderer.setAnimationLoop(() => {
                    this.render();
                });
                this.renderer.setClearColor(0x000000, 0); // Transparent background
            }

            onWindowResize() {
                this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
            }

            dispose() {
                window.removeEventListener('resize', this.onWindowResize.bind(this));
                this.renderer.dispose();
            }
        }

        class CreateParticles {
            constructor(scene, font, particleImg, camera, renderer) {
                this.scene = scene;
                this.font = font;
                this.particleImg = particleImg;
                this.camera = camera;
                this.renderer = renderer;

                this.raycaster = new THREE.Raycaster();
                this.mouse = new THREE.Vector2(-200, 200);

                this.colorChange = new THREE.Color();

                this.buttom = false;

                this.data = {
                    text: 'FUTURE\nIS NOW',
                    amount: 1000,
                    particleSize: 1,
                    particleColor: 0xf172d1,
                    textSize: 35,
                    area: 250,
                    ease: 0.05,
                };

                this.setup();
                this.bindEvents();
            }

            setup() {
                const geometry = new THREE.PlaneGeometry(
                    this.visibleWidthAtZDepth(100, this.camera),
                    this.visibleHeightAtZDepth(100, this.camera)
                );
                const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true });
                this.planeArea = new THREE.Mesh(geometry, material);
                this.planeArea.visible = false;
                this.scene.add(this.planeArea);
                this.createText();
            }

            bindEvents() {
                this.onMouseDown = this.onMouseDown.bind(this);
                this.onMouseMove = this.onMouseMove.bind(this);
                this.onMouseUp = this.onMouseUp.bind(this);

                document.addEventListener('mousedown', this.onMouseDown);
                document.addEventListener('mousemove', this.onMouseMove);
                document.addEventListener('mouseup', this.onMouseUp);
            }

            onMouseDown(event) {
                this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                const vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
                vector.unproject(this.camera);
                const dir = vector.sub(this.camera.position).normalize();
                const distance = -this.camera.position.z / dir.z;
                this.currenPosition = this.camera.position.clone().add(dir.multiplyScalar(distance));

                this.buttom = true;
                this.data.ease = 0.01;
            }

            onMouseUp() {
                this.buttom = false;
                this.data.ease = 0.05;
            }

            onMouseMove(event) {
                const scaleFactor = 0.7;

                const box = magicRef.current.getBoundingClientRect();
                let x = ((event.clientX - box.left) / box.width) * 2 - 1;
                let y = -((event.clientY - box.top) / box.height) * 2 + 1;

                x *= scaleFactor;
                y *= scaleFactor;

                this.mouse.x = Math.max(-1, Math.min(1, x));
                this.mouse.y = Math.max(-1, Math.min(1, y));
            }

            render() {
                const time = ((0.001 * performance.now()) % 12) / 12;
                const zigzagTime = (1 + Math.sin(time * 2 * Math.PI)) / 6;

                this.raycaster.setFromCamera(this.mouse, this.camera);

                const intersects = this.raycaster.intersectObject(this.planeArea);

                if (intersects.length > 0) {
                    const pos = this.particles.geometry.attributes.position;
                    const copy = this.geometryCopy.attributes.position;
                    const colors = this.particles.geometry.attributes.customColor;
                    const size = this.particles.geometry.attributes.size;

                    const mx = intersects[0].point.x;
                    const my = intersects[0].point.y;
                    const mz = intersects[0].point.z;

                    for (let i = 0, l = pos.count; i < l; i++) {
                        const initX = copy.getX(i);
                        const initY = copy.getY(i);
                        const initZ = copy.getZ(i);

                        let px = pos.getX(i);
                        let py = pos.getY(i);
                        let pz = pos.getZ(i);

                        const isWhitePink = Math.random() > 0.5; // 50% вероятность
                        if (isWhitePink) {
                            this.colorChange.setHSL(0.9, 0.5, Math.min(1.0, 0.9 * 2)); // Светлее
                        } else {
                            this.colorChange.setHSL(0.9, 0.7, Math.min(1.0, 0.6 * 2)); // Светлее
                        }
                        colors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
                        colors.needsUpdate = true;

                        size.array[i] = this.data.particleSize;
                        size.needsUpdate = true;

                        let dx = mx - px;
                        let dy = my - py;
                        const dz = mz - pz;

                        const mouseDistance = this.distance(mx, my, px, py);
                        let d = dx * dx + dy * dy;
                        const f = -this.data.area / d;

                        if (this.buttom) {
                            const t = Math.atan2(dy, dx);
                            px -= f * Math.cos(t);
                            py -= f * Math.sin(t);

                            this.colorChange.setHSL(0.5 + zigzagTime, 1.0, 0.5);
                            colors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
                            colors.needsUpdate = true;

                            if ((px > (initX + 10)) || (px < (initX - 10)) || (py > (initY + 10) || (py < (initY - 10)))) {
                                this.colorChange.setHSL(0.15, 1.0, 0.5);
                                colors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
                                colors.needsUpdate = true;
                            }
                        } else {
                            if (mouseDistance < this.data.area) {
                                if (i % 5 === 0) {
                                    const t = Math.atan2(dy, dx);
                                    px -= 0.03 * Math.cos(t);
                                    py -= 0.03 * Math.sin(t);

                                    this.colorChange.setHSL(0.15, 1.0, 0.5);
                                    colors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
                                    colors.needsUpdate = true;

                                    size.array[i] = this.data.particleSize / 1.2;
                                    size.needsUpdate = true;
                                } else {
                                    const t = Math.atan2(dy, dx);
                                    px += f * Math.cos(t);
                                    py += f * Math.sin(t);

                                    pos.setXYZ(i, px, py, pz);
                                    pos.needsUpdate = true;

                                    size.array[i] = this.data.particleSize * 1.3;
                                    size.needsUpdate = true;
                                }

                                if (
                                    px > initX + 10 ||
                                    px < initX - 10 ||
                                    py > initY + 10 ||
                                    py < initY - 10
                                ) {
                                    this.colorChange.setHSL(0.15, 1.0, 0.5);
                                    colors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
                                    colors.needsUpdate = true;

                                    size.array[i] = this.data.particleSize / 1.8;
                                    size.needsUpdate = true;
                                }
                            }
                        }

                        px += (initX - px) * this.data.ease;
                        py += (initY - py) * this.data.ease;
                        pz += (initZ - pz) * this.data.ease;

                        pos.setXYZ(i, px, py, pz);
                        pos.needsUpdate = true;
                    }
                }
            }

            createText() {
                const thePoints = [];

                const shapes = this.font.generateShapes(this.data.text, this.data.textSize);
                const geometry = new THREE.ShapeGeometry(shapes);
                geometry.computeBoundingBox();

                const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
                const yMid = (geometry.boundingBox.max.y - geometry.boundingBox.min.y) / 8;

                geometry.center();

                const holeShapes = [];

                for (let q = 0; q < shapes.length; q++) {
                    const shape = shapes[q];
                    if (shape.holes && shape.holes.length > 0) {
                        for (let j = 0; j < shape.holes.length; j++) {
                            const hole = shape.holes[j];
                            holeShapes.push(hole);
                        }
                    }
                }
                shapes.push(...holeShapes);

                const colors = [];
                const sizes = [];

                for (let x = 0; x < shapes.length; x++) {
                    const shape = shapes[x];
                    const amountPoints = shape.type === 'Path' ? this.data.amount / 2 : this.data.amount;
                    const points = shape.getSpacedPoints(amountPoints);

                    points.forEach((element) => {
                        const a = new THREE.Vector3(element.x, element.y, 0);
                        thePoints.push(a);

                        const isWhitePink = Math.random() > 0.5;
                        if (isWhitePink) {
                            this.colorChange.setHSL(0.9, 0.5, Math.min(1.0, 0.9 * 2));
                        } else {
                            this.colorChange.setHSL(0.9, 0.7, Math.min(1.0, 0.6 * 2));
                        }
                        colors.push(this.colorChange.r, this.colorChange.g, this.colorChange.b);
                        sizes.push(1);
                    });
                }

                const geoParticles = new THREE.BufferGeometry().setFromPoints(thePoints);
                geoParticles.translate(xMid, yMid, 0);

                geoParticles.setAttribute(
                    'customColor',
                    new THREE.Float32BufferAttribute(colors, 3)
                );
                geoParticles.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

                const material = new THREE.ShaderMaterial({
                    uniforms: {
                        color: { value: new THREE.Color(0xf172d1) },
                        pointTexture: { value: this.particleImg },
                        opacity: { value: 0.5 },
                    },
                    vertexShader: vertexShader,
                    fragmentShader: fragmentShader,
                    blending: THREE.AdditiveBlending,
                    depthTest: false,
                    transparent: true,
                });

                this.particles = new THREE.Points(geoParticles, material);
                this.scene.add(this.particles);

                this.geometryCopy = new THREE.BufferGeometry();
                this.geometryCopy.copy(this.particles.geometry);
            }

            visibleHeightAtZDepth(depth, camera) {
                const cameraOffset = camera.position.z;
                if (depth < cameraOffset) depth -= cameraOffset;
                else depth += cameraOffset;

                const vFOV = (camera.fov * Math.PI) / 180;

                return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
            }

            visibleWidthAtZDepth(depth, camera) {
                const height = this.visibleHeightAtZDepth(depth, camera);
                return height * camera.aspect;
            }

            distance(x1, y1, x2, y2) {
                return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
            }

            dispose() {
                document.removeEventListener('mousedown', this.onMouseDown);
                document.removeEventListener('mousemove', this.onMouseMove);
                document.removeEventListener('mouseup', this.onMouseUp);

                this.particles.geometry.dispose();
                this.particles.material.dispose();
            }
        }

        preload()
            .then(({ font, particle }) => {
                const env = new Environment(font, particle);
                environmentRef.current = env;
            })
            .catch((error) => {
                console.error('Error during preload:', error);
            });

        return () => {
            if (environmentRef.current) {
                environmentRef.current.dispose();
                environmentRef.current = null;
            }
        };
    }, []);

    return <div id="magic" ref={magicRef} ></div>;
}
