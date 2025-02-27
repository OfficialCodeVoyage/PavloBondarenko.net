'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import './style.css';

const resourceCache = {
  font: null,
  particle: null,
};

const vertexShader = `
  attribute float size;
  attribute vec3 customColor;
  varying vec3 vColor;
  void main() {
    vColor = customColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 color;
  uniform sampler2D pointTexture;
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(color * vColor, 1.0);
    gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
  }
`;

export default function MagicEffect() {
  const magicRef = useRef(null);
  const environmentRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const preloadResources = () => {
      if (resourceCache.font && resourceCache.particle) {
        return Promise.resolve({
          font: resourceCache.font,
          particle: resourceCache.particle,
        });
      }
      const manager = new THREE.LoadingManager();
      return new Promise((resolve, reject) => {
        manager.onLoad = () => {
          resolve({
            font: resourceCache.font,
            particle: resourceCache.particle,
          });
        };
        manager.onError = (url) => {
          console.error(`Error loading ${url}`);
          reject(new Error(`Error loading ${url}`));
        };

        const fontLoader = new FontLoader(manager);
        fontLoader.load(
          'https://res.cloudinary.com/dydre7amr/raw/upload/v1612950355/font_zsd4dr.json',
          (font) => {
            resourceCache.font = font;
          }
        );

        const textureLoader = new THREE.TextureLoader(manager);
        textureLoader.load(
          'https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png',
          (particle) => {
            resourceCache.particle = particle;
          }
        );
      });
    };

    class Environment {
      constructor(font, particle) {
        this.font = font;
        this.particle = particle;
        this.container = magicRef.current;
        this.scene = new THREE.Scene();
        this.initCamera();
        this.initRenderer();
        this.setup();
        this.bindEvents();
      }

      bindEvents() {
        this.handleResize = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.handleResize);
      }

      unbindEvents() {
        window.removeEventListener('resize', this.handleResize);
      }

      initCamera() {
        this.camera = new THREE.PerspectiveCamera(
          65,
          this.container.clientWidth / this.container.clientHeight,
          1,
          10000
        );
        this.camera.position.set(0, 0, 100);
      }

      initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.container.appendChild(this.renderer.domElement);
        this.renderer.setAnimationLoop(() => this.render());
        this.renderer.setClearColor(0x000000, 0); // Transparent background
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
        if (this.createParticles) {
          this.createParticles.render();
        }
        this.renderer.render(this.scene, this.camera);
      }

      onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      }

      dispose() {
        this.unbindEvents();
        this.renderer.dispose();
        if (this.createParticles) {
          this.createParticles.dispose();
        }
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
        this.isMouseDown = false;
        this.data = {
          text: 'FUTURE\nIS NOW',
          amount: 1000,
          particleSize: 1,
          particleColor: 0xf172d1,
          textSize: 35,
          area: 250,
          ease: 0.05,
        };
        this.bindEvents();
        this.setup();
      }

      bindEvents() {
        this.handleMouseDown = this.onMouseDown.bind(this);
        this.handleMouseMove = this.onMouseMove.bind(this);
        this.handleMouseUp = this.onMouseUp.bind(this);

        document.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
      }

      unbindEvents() {
        document.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
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

      onMouseDown(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
        vector.unproject(this.camera);
        const dir = vector.sub(this.camera.position).normalize();
        const distance = -this.camera.position.z / dir.z;
        this.currentPosition = this.camera.position.clone().add(dir.multiplyScalar(distance));

        this.isMouseDown = true;
        this.data.ease = 0.01;
      }

      onMouseUp() {
        this.isMouseDown = false;
        this.data.ease = 0.05;
      }

      onMouseMove(event) {
        const scaleFactor = 0.7;
        if (!magicRef.current) return;
        const box = magicRef.current.getBoundingClientRect();
        let x = ((event.clientX - box.left) / box.width) * 2 - 1;
        let y = -((event.clientY - box.top) / box.height) * 2 + 1;
        this.mouse.x = Math.max(-1, Math.min(1, x * scaleFactor));
        this.mouse.y = Math.max(-1, Math.min(1, y * scaleFactor));
      }

      render() {
        const time = ((0.001 * performance.now()) % 12) / 12;
        const zigzagTime = (1 + Math.sin(time * 2 * Math.PI)) / 6;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObject(this.planeArea);

        if (intersects.length > 0) {
          const posAttr = this.particles.geometry.attributes.position;
          const copyAttr = this.geometryCopy.attributes.position;
          const colorAttr = this.particles.geometry.attributes.customColor;
          const sizeAttr = this.particles.geometry.attributes.size;

          const { x: mx, y: my, z: mz } = intersects[0].point;

          for (let i = 0, l = posAttr.count; i < l; i++) {
            const initX = copyAttr.getX(i);
            const initY = copyAttr.getY(i);
            const initZ = copyAttr.getZ(i);

            let px = posAttr.getX(i);
            let py = posAttr.getY(i);
            let pz = posAttr.getZ(i);

            const isWhitePink = Math.random() > 0.5;
            if (isWhitePink) {
              this.colorChange.setHSL(0.9, 0.5, Math.min(1.0, 1.8));
            } else {
              this.colorChange.setHSL(0.9, 0.7, Math.min(1.0, 1.2));
            }
            colorAttr.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
            colorAttr.needsUpdate = true;
            sizeAttr.array[i] = this.data.particleSize;
            sizeAttr.needsUpdate = true;

            const dx = mx - px;
            const dy = my - py;
            const dSquared = dx * dx + dy * dy;
            const f = -this.data.area / dSquared;

            if (this.isMouseDown) {
              const angle = Math.atan2(dy, dx);
              px -= f * Math.cos(angle);
              py -= f * Math.sin(angle);
              this.colorChange.setHSL(0.5 + zigzagTime, 1.0, 0.5);
              colorAttr.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
              colorAttr.needsUpdate = true;
              if (px > initX + 10 || px < initX - 10 || py > initY + 10 || py < initY - 10) {
                this.colorChange.setHSL(0.15, 1.0, 0.5);
                colorAttr.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
                colorAttr.needsUpdate = true;
              }
            } else {
              const mouseDistance = this.distance(mx, my, px, py);
              if (mouseDistance < this.data.area) {
                if (i % 5 === 0) {
                  const angle = Math.atan2(dy, dx);
                  px -= 0.03 * Math.cos(angle);
                  py -= 0.03 * Math.sin(angle);
                  this.colorChange.setHSL(0.15, 1.0, 0.5);
                  colorAttr.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
                  colorAttr.needsUpdate = true;
                  sizeAttr.array[i] = this.data.particleSize / 1.2;
                  sizeAttr.needsUpdate = true;
                } else {
                  const angle = Math.atan2(dy, dx);
                  px += f * Math.cos(angle);
                  py += f * Math.sin(angle);
                  posAttr.setXYZ(i, px, py, pz);
                  posAttr.needsUpdate = true;
                  sizeAttr.array[i] = this.data.particleSize * 1.3;
                  sizeAttr.needsUpdate = true;
                }
                if (px > initX + 10 || px < initX - 10 || py > initY + 10 || py < initY - 10) {
                  this.colorChange.setHSL(0.15, 1.0, 0.5);
                  colorAttr.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
                  colorAttr.needsUpdate = true;
                  sizeAttr.array[i] = this.data.particleSize / 1.8;
                  sizeAttr.needsUpdate = true;
                }
              }
            }

            // Ease back to original position
            px += (initX - px) * this.data.ease;
            py += (initY - py) * this.data.ease;
            pz += (initZ - pz) * this.data.ease;
            posAttr.setXYZ(i, px, py, pz);
            posAttr.needsUpdate = true;
          }
        }
      }

      createText() {
        const points = [];
        const shapes = this.font.generateShapes(this.data.text, this.data.textSize);
        const geometry = new THREE.ShapeGeometry(shapes);
        geometry.computeBoundingBox();
        const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        const yMid = (geometry.boundingBox.max.y - geometry.boundingBox.min.y) / 8;
        geometry.center();

        const holeShapes = [];
        shapes.forEach((shape) => {
          if (shape.holes && shape.holes.length > 0) {
            shape.holes.forEach((hole) => holeShapes.push(hole));
          }
        });
        shapes.push(...holeShapes);

        const colors = [];
        const sizes = [];
        shapes.forEach((shape) => {
          const amountPoints = shape.type === 'Path' ? this.data.amount / 2 : this.data.amount;
          const shapePoints = shape.getSpacedPoints(amountPoints);
          shapePoints.forEach((pt) => {
            points.push(new THREE.Vector3(pt.x, pt.y, 0));
            const isWhitePink = Math.random() > 0.5;
            if (isWhitePink) {
              this.colorChange.setHSL(0.9, 0.5, Math.min(1.0, 1.8));
            } else {
              this.colorChange.setHSL(0.9, 0.7, Math.min(1.0, 1.2));
            }
            colors.push(this.colorChange.r, this.colorChange.g, this.colorChange.b);
            sizes.push(1);
          });
        });

        const geoParticles = new THREE.BufferGeometry().setFromPoints(points);
        geoParticles.translate(xMid, yMid, 0);
        geoParticles.setAttribute('customColor', new THREE.Float32BufferAttribute(colors, 3));
        geoParticles.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            color: { value: new THREE.Color(0xf172d1) },
            pointTexture: { value: this.particleImg },
            opacity: { value: 0.5 },
          },
          vertexShader,
          fragmentShader,
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
        const adjustedDepth = depth < cameraOffset ? depth - cameraOffset : depth + cameraOffset;
        const vFOV = (camera.fov * Math.PI) / 180;
        return 2 * Math.tan(vFOV / 2) * Math.abs(adjustedDepth);
      }

      visibleWidthAtZDepth(depth, camera) {
        return this.visibleHeightAtZDepth(depth, camera) * camera.aspect;
      }

      distance(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
      }

      dispose() {
        this.unbindEvents();
        this.particles.geometry.dispose();
        this.particles.material.dispose();
      }
    }

    preloadResources()
      .then(({ font, particle }) => {
        if (!mounted) return;
        const env = new Environment(font, particle);
        environmentRef.current = env;
      })
      .catch((error) => {
        console.error('Error during preload:', error);
      });

    return () => {
      mounted = false;
      if (environmentRef.current) {
        environmentRef.current.dispose();
        environmentRef.current = null;
      }
    };
  }, []);

  return <div id="magic" ref={magicRef} />;
}