import { useEffect, useRef } from "react";
import type * as THREE from "three";
import { prefersReducedMotion } from "../lib/motion";

/**
 * Ambient 3D layer for the hero — soft glass orbs, drifting
 * light particles and a whisper of parallax. Pure atmosphere:
 * the photography carries the scene if WebGL is unavailable.
 * Three.js is lazy-loaded so it never blocks first paint.
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || prefersReducedMotion()) return;

    let cancelled = false;
    let cleanup = (): void => undefined;

    void (async () => {
      try {
        const T = await import("three");
        if (cancelled || !container.isConnected) return;

        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const W = (): number => container.clientWidth || 1;
        const H = (): number => container.clientHeight || 1;

        const renderer = new T.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.3 : 1.6));
        renderer.setSize(W(), H());
        renderer.domElement.style.position = "absolute";
        renderer.domElement.style.inset = "0";
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        container.appendChild(renderer.domElement);

        const scene = new T.Scene();
        const camera = new T.PerspectiveCamera(42, W() / H(), 0.1, 80);
        camera.position.set(0, 0, 14);

        scene.add(new T.HemisphereLight(0xf7f5ef, 0x10261d, 0.85));
        const key = new T.DirectionalLight(0xffffff, 1.5);
        key.position.set(6, 8, 7);
        scene.add(key);
        const rim = new T.DirectionalLight(0xc7e86a, 0.55);
        rim.position.set(-7, -3, 4);
        scene.add(rim);

        /* ---- Glass orbs ---- */
        const group = new T.Group();
        scene.add(group);
        const orbs: Array<{ mesh: THREE.Mesh; baseY: number; speed: number; phase: number }> = [];

        const glass = (color: number, opacity: number): THREE.MeshPhysicalMaterial =>
          new T.MeshPhysicalMaterial({
            color,
            transparent: true,
            opacity,
            roughness: 0.06,
            metalness: 0.05,
            clearcoat: 1,
            clearcoatRoughness: 0.12,
          });

        const orbDefs = (
          isMobile
            ? [
                { r: 1.1, x: 1.9, y: 1.8, z: -2.5, mat: () => glass(0xf4f1e6, 0.5) },
                { r: 0.5, x: -2, y: -1.2, z: -1, mat: () => glass(0xb7c9b5, 0.5) },
                {
                  r: 0.34,
                  x: 0.7,
                  y: -2.6,
                  z: 0.5,
                  mat: () =>
                    new T.MeshStandardMaterial({
                      color: 0xc7e86a,
                      emissive: 0xc7e86a,
                      emissiveIntensity: 0.5,
                      roughness: 0.35,
                    }),
                },
              ]
            : [
                { r: 1.6, x: 5.4, y: 1.4, z: -2.5, mat: () => glass(0xf4f1e6, 0.5) },
                { r: 0.95, x: -6, y: -1.6, z: -2, mat: () => glass(0xb7c9b5, 0.45) },
                {
                  r: 0.5,
                  x: 3.2,
                  y: -2.7,
                  z: 0.8,
                  mat: () =>
                    new T.MeshStandardMaterial({
                      color: 0xc7e86a,
                      emissive: 0xc7e86a,
                      emissiveIntensity: 0.5,
                      roughness: 0.35,
                    }),
                },
                { r: 0.34, x: -3.6, y: 2.4, z: -0.5, mat: () => glass(0xffffff, 0.55) },
                { r: 2.4, x: -1.2, y: 3.8, z: -7, mat: () => glass(0xdde6da, 0.28) },
              ]
        );

        orbDefs.forEach((def, i) => {
          const mesh = new T.Mesh(new T.SphereGeometry(def.r, 48, 48), def.mat());
          mesh.position.set(def.x, def.y, def.z);
          group.add(mesh);
          orbs.push({ mesh, baseY: def.y, speed: 0.45 + i * 0.12, phase: i * 1.7 });
        });

        /* ---- Drifting light particles ---- */
        const spriteCanvas = document.createElement("canvas");
        spriteCanvas.width = 64;
        spriteCanvas.height = 64;
        const sctx = spriteCanvas.getContext("2d");
        if (sctx) {
          const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
          grad.addColorStop(0, "rgba(255,255,255,1)");
          grad.addColorStop(0.4, "rgba(255,255,255,0.5)");
          grad.addColorStop(1, "rgba(255,255,255,0)");
          sctx.fillStyle = grad;
          sctx.fillRect(0, 0, 64, 64);
        }
        const sprite = new T.CanvasTexture(spriteCanvas);

        const COUNT = isMobile ? 70 : 150;
        const positions = new Float32Array(COUNT * 3);
        for (let i = 0; i < COUNT; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 24;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
          positions[i * 3 + 2] = -6 + Math.random() * 8;
        }
        const particlesGeo = new T.BufferGeometry();
        particlesGeo.setAttribute("position", new T.BufferAttribute(positions, 3));
        const particlesMat = new T.PointsMaterial({
          color: 0xf7f5ef,
          size: 0.09,
          transparent: true,
          opacity: 0.55,
          depthWrite: false,
          map: sprite,
        });
        const particles = new T.Points(particlesGeo, particlesMat);
        group.add(particles);

        /* ---- Interaction: mouse drift + scroll fade ---- */
        const fine = window.matchMedia("(pointer: fine)").matches;
        const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
        const onPointer = (e: PointerEvent): void => {
          mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
          mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        if (fine) window.addEventListener("pointermove", onPointer, { passive: true });

        let inView = true;
        const io = new IntersectionObserver(
          (entries) => {
            inView = entries[0]?.isIntersecting ?? true;
          },
          { threshold: 0 },
        );
        io.observe(container);

        /* Pull the camera back on narrow screens so the scene stays in frame */
        const fitCamera = (): void => {
          camera.aspect = W() / H();
          camera.position.z = camera.aspect < 0.85 ? 19 : 14;
          camera.updateProjectionMatrix();
          renderer.setSize(W(), H());
        };
        fitCamera();
        const ro = new ResizeObserver(fitCamera);
        ro.observe(container);

        const clock = new T.Clock();
        let raf = 0;
        const tick = (): void => {
          raf = requestAnimationFrame(tick);
          if (!inView || document.hidden) return;
          const t = clock.getElapsedTime();

          mouse.x += (mouse.tx - mouse.x) * 0.03;
          mouse.y += (mouse.ty - mouse.y) * 0.03;
          group.rotation.y = t * 0.025 + mouse.x * 0.05;
          group.rotation.x = mouse.y * -0.03;

          for (const orb of orbs) {
            orb.mesh.position.y = orb.baseY + Math.sin(t * orb.speed + orb.phase) * 0.38;
          }
          particles.rotation.y = t * 0.008;
          particlesMat.opacity = 0.45 + Math.sin(t * 0.5) * 0.1;

          const rect = container.getBoundingClientRect();
          group.position.y = T.MathUtils.clamp(-rect.top * 0.004, -2.5, 2.5);
          renderer.domElement.style.opacity = String(
            T.MathUtils.clamp(1 + rect.top / (window.innerHeight * 0.85), 0, 1),
          );

          renderer.render(scene, camera);
        };
        tick();

        cleanup = (): void => {
          cancelAnimationFrame(raf);
          io.disconnect();
          ro.disconnect();
          window.removeEventListener("pointermove", onPointer);
          scene.traverse((obj) => {
            const mesh = obj as THREE.Mesh;
            if (mesh.geometry) mesh.geometry.dispose();
            const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
            if (Array.isArray(material)) material.forEach((m) => m.dispose());
            else if (material) material.dispose();
          });
          sprite.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        /* WebGL unavailable — the photography carries the hero. */
      }
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" />;
}
