// 'use client';
//
// import * as THREE from 'three';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'; // Импортируем FontLoader
//
// import { useEffect } from 'react';
//
// const MagicEffect = () => {
//     useEffect(() => {
//         // Инициализация менеджера загрузки
//         const manager = new THREE.LoadingManager();
//
//         manager.onLoad = function () {
//             const environment = new Environment(typo, particle);
//         };
//
//         let typo = null;
//         // const manager = new THREE.LoadingManager();
//         const loader = new FontLoader(manager);
//         loader.load(
//             'https://res.cloudinary.com/dydre7amr/raw/upload/v1612950355/font_zsd4dr.json',
//             function (font) {
//                 typo = font;
//                 console.log('Шрифт загружен:', font);
//             },
//             undefined,
//             function (error) {
//                 console.error('Ошибка при загрузке шрифта:', error);
//             }
//         );
//
//         // Загрузка текстуры частицы
//         const particle = new THREE.TextureLoader(manager).load(
//             'https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png'
//         );
//
//         // Класс Environment и CreateParticles
//         class Environment {
//             constructor(font, particle) {
//                 this.font = font;
//                 this.particle = particle;
//                 this.container = document.querySelector('#magic');
//                 this.scene = new THREE.Scene();
//                 this.createCamera();
//                 this.createRenderer();
//                 this.setup();
//                 this.bindEvents();
//             }
//
//             bindEvents() {
//                 window.addEventListener('resize', this.onWindowResize.bind(this));
//             }
//
//             setup() {
//                 this.createParticles = new CreateParticles(
//                     this.scene,
//                     this.font,
//                     this.particle,
//                     this.camera,
//                     this.renderer
//                 );
//             }
//
//             render() {
//                 this.createParticles.render();
//                 this.renderer.render(this.scene, this.camera);
//             }
//
//             createCamera() {
//                 this.camera = new THREE.PerspectiveCamera(
//                     65,
//                     this.container.clientWidth / this.container.clientHeight,
//                     1,
//                     10000
//                 );
//                 this.camera.position.set(0, 0, 100);
//             }
//
//             createRenderer() {
//                 this.renderer = new THREE.WebGLRenderer({ alpha: true });
//                 this.renderer.setSize(
//                     this.container.clientWidth,
//                     this.container.clientHeight
//                 );
//                 this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//                 this.renderer.outputEncoding = THREE.sRGBEncoding;
//                 this.container.appendChild(this.renderer.domElement);
//                 this.renderer.setAnimationLoop(() => {
//                     this.render();
//                 });
//                 this.renderer.setClearColor(0x000000, 0); // Прозрачный фон
//             }
//
//             onWindowResize() {
//                 this.camera.aspect =
//                     this.container.clientWidth / this.container.clientHeight;
//                 this.camera.updateProjectionMatrix();
//                 this.renderer.setSize(
//                     this.container.clientWidth,
//                     this.container.clientHeight
//                 );
//             }
//         }
//
//         class CreateParticles {
//             constructor(scene, font, particleImg, camera, renderer) {
//                 this.scene = scene;
//                 this.font = font;
//                 this.particleImg = particleImg;
//                 this.camera = camera;
//                 this.renderer = renderer;
//                 this.raycaster = new THREE.Raycaster();
//                 this.mouse = new THREE.Vector2(-200, 200);
//                 this.colorChange = new THREE.Color();
//                 this.buttom = false;
//
//                 this.data = {
//                     text: 'FUTURE\nIS NOW',
//                     amount: 1000,
//                     particleSize: 1,
//                     particleColor: 0x00d04ba3,
//                     textSize: 29,
//                     area: 250,
//                     ease: 0.05,
//                 };
//
//                 this.setup();
//                 this.bindEvents();
//             }
//
//             setup() {
//                 const geometry = new THREE.PlaneGeometry(
//                     this.visibleWidthAtZDepth(100, this.camera),
//                     this.visibleHeightAtZDepth(100, this.camera)
//                 );
//                 const material = new THREE.MeshBasicMaterial({
//                     color: 0x00ff00,
//                     transparent: true,
//                 });
//                 this.planeArea = new THREE.Mesh(geometry, material);
//                 this.planeArea.visible = false;
//                 this.createText();
//             }
//
//             bindEvents() {
//                 document.addEventListener('mousedown', this.onMouseDown.bind(this));
//                 document.addEventListener('mousemove', this.onMouseMove.bind(this));
//                 document.addEventListener('mouseup', this.onMouseUp.bind(this));
//             }
//
//             onMouseDown(event) {
//                 this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//                 this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//                 this.buttom = true;
//                 this.data.ease = 0.01;
//             }
//
//             onMouseUp() {
//                 this.buttom = false;
//                 this.data.ease = 0.05;
//             }
//
//             onMouseMove(event) {
//                 this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//                 this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//             }
//
//             createText() {
//                 const shapes = this.font.generateShapes(this.data.text, this.data.textSize);
//                 const geometry = new THREE.ShapeGeometry(shapes);
//                 geometry.center();
//
//                 const particles = new THREE.BufferGeometry().setFromPoints(
//                     shapes.map((shape) => shape.getPoints(10)).flat()
//                 );
//
//                 const material = new THREE.PointsMaterial({
//                     color: this.data.particleColor,
//                     size: this.data.particleSize,
//                     map: this.particleImg,
//                     transparent: true,
//                 });
//
//                 this.particles = new THREE.Points(particles, material);
//                 this.scene.add(this.particles);
//             }
//
//             visibleHeightAtZDepth(depth, camera) {
//                 const cameraOffset = camera.position.z;
//                 const vFOV = camera.fov * Math.PI / 180;
//                 return 2 * Math.tan(vFOV / 2) * Math.abs(depth - cameraOffset);
//             }
//
//             visibleWidthAtZDepth(depth, camera) {
//                 return this.visibleHeightAtZDepth(depth, camera) * camera.aspect;
//             }
//         }
//     }, []);
//
//     return <div id="magic" style={{ width: '100vw', height: '100vh' }} />;
// };
//
// export default MagicEffect;
