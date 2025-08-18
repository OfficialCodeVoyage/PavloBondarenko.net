'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader, Font } from 'three/examples/jsm/loaders/FontLoader';
import './style.css';

// Type definitions
interface ResourceCache {
  font: Font | null;
  particle: THREE.Texture | null;
}

interface ConfigData {
  text: string;
  amount: number;
  particleSize: number;
  particleColor: number;
  textSize: number;
  area: number;
  ease: number;
}

// Cache resources to avoid reloading
const resourceCache: ResourceCache = {
  font: null,
  particle: null,
};

// Shader code moved to constants for better readability
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

// Configuration constants
const CONFIG = {
  RESOURCES: {
    FONT_URL: 'https://res.cloudinary.com/dydre7amr/raw/upload/v1612950355/font_zsd4dr.json',
    PARTICLE_URL: 'https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png',
  },
  PARTICLES: {
    TEXT: 'FUTURE\nIS NOW',
    AMOUNT: 1000,
    SIZE: 1,
    COLOR: 0xf172d1,
    TEXT_SIZE: 35,
    AREA: 250,
    EASE: 0.05,
  },
};

// Helper functions
const calculateVisibleHeightAtZDepth = (depth: number, camera: THREE.PerspectiveCamera): number => {
  const cameraOffset = camera.position.z;
  const adjustedDepth = depth < cameraOffset ? depth - cameraOffset : depth + cameraOffset;
  const vFOV = (camera.fov * Math.PI) / 180;
  return 2 * Math.tan(vFOV / 2) * Math.abs(adjustedDepth);
};

const calculateVisibleWidthAtZDepth = (depth: number, camera: THREE.PerspectiveCamera): number => {
  return calculateVisibleHeightAtZDepth(depth, camera) * camera.aspect;
};

const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};

// Environment class manages the 3D scene
class Environment {
  font: Font;
  particle: THREE.Texture;
  container: HTMLDivElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  createParticles: CreateParticles | null = null;
  handleResize: () => void;

  constructor(font: Font, particle: THREE.Texture, container: HTMLDivElement) {
    this.font = font;
    this.particle = particle;
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      65,
      this.container.clientWidth / this.container.clientHeight,
      1,
      10000
    );
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.handleResize = this.onWindowResize.bind(this);
    this.initCamera();
    this.initRenderer();
    this.setup();
    this.bindEvents();
  }

  bindEvents(): void {
    window.addEventListener('resize', this.handleResize);
  }

  unbindEvents(): void {
    window.removeEventListener('resize', this.handleResize);
  }

  initCamera(): void {
    this.camera.position.set(0, 0, 100);
  }

  initRenderer(): void {
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);
    this.renderer.setAnimationLoop(() => this.render());
    this.renderer.setClearColor(0x000000, 0); // Transparent background
  }

  setup(): void {
    this.createParticles = new CreateParticles(
      this.scene,
      this.font,
      this.particle,
      this.camera,
      this.renderer,
      this.container
    );
  }

  render(): void {
    if (this.createParticles) {
      this.createParticles.render();
    }
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize(): void {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  dispose(): void {
    this.unbindEvents();
    this.renderer.dispose();
    if (this.createParticles) {
      this.createParticles.dispose();
    }
  }
}

// CreateParticles class handles the particle system
class CreateParticles {
  scene: THREE.Scene;
  font: Font;
  particleImg: THREE.Texture;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  container: HTMLDivElement;
  raycaster: THREE.Raycaster;
  mouse: THREE.Vector2;
  colorChange: THREE.Color;
  isMouseDown: boolean = false;
  data: ConfigData;
  planeArea: THREE.Mesh | null = null;
  particles: THREE.Points | null = null;
  geometryCopy: THREE.BufferGeometry | null = null;
  currentPosition: THREE.Vector3 | null = null;
  handleMouseDown: (event: MouseEvent) => void;
  handleMouseMove: (event: MouseEvent) => void;
  handleMouseUp: () => void;

  constructor(
    scene: THREE.Scene, 
    font: Font, 
    particleImg: THREE.Texture, 
    camera: THREE.PerspectiveCamera, 
    renderer: THREE.WebGLRenderer,
    container: HTMLDivElement
  ) {
    this.scene = scene;
    this.font = font;
    this.particleImg = particleImg;
    this.camera = camera;
    this.renderer = renderer;
    this.container = container;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-200, 200);
    this.colorChange = new THREE.Color();
    this.data = {
      text: CONFIG.PARTICLES.TEXT,
      amount: CONFIG.PARTICLES.AMOUNT,
      particleSize: CONFIG.PARTICLES.SIZE,
      particleColor: CONFIG.PARTICLES.COLOR,
      textSize: CONFIG.PARTICLES.TEXT_SIZE,
      area: CONFIG.PARTICLES.AREA,
      ease: CONFIG.PARTICLES.EASE,
    };
    this.handleMouseDown = this.onMouseDown.bind(this);
    this.handleMouseMove = this.onMouseMove.bind(this);
    this.handleMouseUp = this.onMouseUp.bind(this);
    this.bindEvents();
    this.setup();
  }

  bindEvents(): void {
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  unbindEvents(): void {
    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  setup(): void {
    const geometry = new THREE.PlaneGeometry(
      calculateVisibleWidthAtZDepth(100, this.camera),
      calculateVisibleHeightAtZDepth(100, this.camera)
    );
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true });
    this.planeArea = new THREE.Mesh(geometry, material);
    this.planeArea.visible = false;
    this.scene.add(this.planeArea);
    this.createText();
  }

  onMouseDown(event: MouseEvent): void {
    // Calculate mouse position relative to the container
    const container = this.renderer.domElement.parentElement;
    if (!container) return;
    
    const box = container.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * 2 - 1;
    const y = -((event.clientY - box.top) / box.height) * 2 + 1;
    
    // Set mouse position at the edge of the container in the direction of the click
    const angle = Math.atan2(y, x);
    this.mouse.x = Math.cos(angle);
    this.mouse.y = Math.sin(angle);

    const vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
    vector.unproject(this.camera);
    const dir = vector.sub(this.camera.position).normalize();
    const distance = -this.camera.position.z / dir.z;
    this.currentPosition = this.camera.position.clone().add(dir.multiplyScalar(distance));

    this.isMouseDown = true;
    this.data.ease = 0.01;
  }

  onMouseUp(): void {
    this.isMouseDown = false;
    this.data.ease = 0.05;
  }

  onMouseMove(event: MouseEvent): void {
    const scaleFactor = 0.7;
    const container = this.renderer.domElement.parentElement;
    if (!container) return;
    
    const box = container.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * 2 - 1;
    const y = -((event.clientY - box.top) / box.height) * 2 + 1;
    this.mouse.x = Math.max(-1, Math.min(1, x * scaleFactor));
    this.mouse.y = Math.max(-1, Math.min(1, y * scaleFactor));
  }

  createText(): void {
    const points: THREE.Vector3[] = [];
    const shapes = this.font.generateShapes(this.data.text, this.data.textSize);
    const geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();
    
    const boundingBox = geometry.boundingBox;
    if (!boundingBox) return;
    
    const xMid = -0.5 * (boundingBox.max.x - boundingBox.min.x);
    const yMid = (boundingBox.max.y - boundingBox.min.y) / 8;
    geometry.center();

    const holeShapes: THREE.Shape[] = [];
    shapes.forEach((shape) => {
      if (shape.holes && shape.holes.length > 0) {
        shape.holes.forEach((hole) => holeShapes.push(hole as THREE.Shape));
      }
    });
    shapes.push(...holeShapes);

    const colors: number[] = [];
    const sizes: number[] = [];
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
        color: { value: new THREE.Color(this.data.particleColor) },
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

  render(): void {
    if (!this.particles || !this.geometryCopy || !this.planeArea) return;
    
    const time = ((0.001 * performance.now()) % 12) / 12;
    const zigzagTime = (1 + Math.sin(time * 2 * Math.PI)) / 6;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.planeArea);

    if (intersects.length > 0) {
      const posAttr = this.particles.geometry.attributes.position as THREE.BufferAttribute;
      const copyAttr = this.geometryCopy.attributes.position as THREE.BufferAttribute;
      const colorAttr = this.particles.geometry.attributes.customColor as THREE.BufferAttribute;
      const sizeAttr = this.particles.geometry.attributes.size as THREE.BufferAttribute;

      const { x: mx, y: my } = intersects[0].point;

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
          // Increase force factor for more dramatic edge effect
          const forceFactor = 2.5;
          const angle = Math.atan2(dy, dx);
          px -= f * Math.cos(angle) * forceFactor;
          py -= f * Math.sin(angle) * forceFactor;
          
          // Add radial movement from edge
          const distanceFromCenter = Math.sqrt(px * px + py * py);
          const maxDistance = Math.max(
            this.container?.clientWidth || window.innerWidth,
            this.container?.clientHeight || window.innerHeight
          ) / 2;
          
          const edgeFactor = Math.min(1, distanceFromCenter / maxDistance);
          px += edgeFactor * Math.cos(angle) * 0.5;
          py += edgeFactor * Math.sin(angle) * 0.5;
          
          this.colorChange.setHSL(0.5 + zigzagTime, 1.0, 0.5);
          colorAttr.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
          colorAttr.needsUpdate = true;
          if (px > initX + 10 || px < initX - 10 || py > initY + 10 || py < initY - 10) {
            this.colorChange.setHSL(0.15, 1.0, 0.5);
            colorAttr.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
            colorAttr.needsUpdate = true;
          }
        } else {
          const mouseDistance = calculateDistance(mx, my, px, py);
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

  dispose(): void {
    this.unbindEvents();
    if (this.particles) {
      this.particles.geometry.dispose();
      (this.particles.material as THREE.Material).dispose();
    }
  }
}

// Preload resources function
const preloadResources = (): Promise<{ font: Font; particle: THREE.Texture }> => {
  if (resourceCache.font && resourceCache.particle) {
    return Promise.resolve({
      font: resourceCache.font,
      particle: resourceCache.particle,
    });
  }
  
  const manager = new THREE.LoadingManager();
  return new Promise((resolve, reject) => {
    manager.onLoad = () => {
      if (resourceCache.font && resourceCache.particle) {
        resolve({
          font: resourceCache.font,
          particle: resourceCache.particle,
        });
      }
    };
    
    manager.onError = (url: string) => {
      console.error(`Error loading ${url}`);
      reject(new Error(`Error loading ${url}`));
    };

    const fontLoader = new FontLoader(manager);
    fontLoader.load(
      CONFIG.RESOURCES.FONT_URL,
      (font: Font) => {
        resourceCache.font = font;
      }
    );

    const textureLoader = new THREE.TextureLoader(manager);
    textureLoader.load(
      CONFIG.RESOURCES.PARTICLE_URL,
      (particle: THREE.Texture) => {
        resourceCache.particle = particle;
      }
    );
  });
};

const MagicEffect: React.FC = () => {
  const magicRef = useRef<HTMLDivElement>(null);
  const environmentRef = useRef<Environment | null>(null);

  useEffect(() => {
    let mounted = true;

    preloadResources()
      .then(({ font, particle }) => {
        if (!mounted || !magicRef.current) return;
        const env = new Environment(font, particle, magicRef.current);
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

export default MagicEffect;