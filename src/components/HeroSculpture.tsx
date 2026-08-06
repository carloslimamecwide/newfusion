"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

export function HeroSculpture({ alt }: { alt: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const hostElement = host;
    const canvasElement = canvas;

    let disposed = false;
    let animationFrame = 0;
    let visible = true;
    let pageVisible = !document.hidden;
    let scrollProgress = 0;
    const pointer = { x: 0, y: 0 };
    const easedPointer = { x: 0, y: 0 };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;
    const staticFrame = reduceMotion || saveData;

    if (staticFrame) {
      hostElement.dataset.webgl = "fallback";
      return;
    }

    async function initialise() {
      const probe = document.createElement("canvas");
      const supportsWebGL = Boolean(probe.getContext("webgl2") || probe.getContext("webgl"));
      if (!supportsWebGL) {
        hostElement.dataset.webgl = "fallback";
        return undefined;
      }

      try {
        const THREE = await import("three");
        const { mergeGeometries } = await import("three/examples/jsm/utils/BufferGeometryUtils.js");
        if (disposed) return;

        const renderer = new THREE.WebGLRenderer({
          canvas: canvasElement,
          alpha: true,
          antialias: window.innerWidth > 680,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 680 ? 1.1 : 1.5));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 30);
        camera.position.set(0.1, 0.05, 5.6);

        const sculpture = new THREE.Group();
        sculpture.rotation.set(-0.28, -0.24, -0.08);
        scene.add(sculpture);

        const contours: Array<
          InstanceType<typeof THREE.TubeGeometry> | InstanceType<typeof THREE.SphereGeometry>
        > = [];
        const layerCount = 68;
        const curvePoints = window.innerWidth < 680 ? 48 : 70;

        const createSignalPoint = (u: number, v: number) => {
          const x = THREE.MathUtils.lerp(-1.58, 1.58, u);
          const envelope = Math.pow(Math.sin(Math.PI * u), 0.7);
          const signal =
            Math.sin(x * 2.15 + v * 4.8) * 0.34 +
            Math.cos(x * 4.4 - v * 3.2) * 0.12;
          const pulseCenter = Math.sin(v * Math.PI * 2) * 0.24;
          const pulse = Math.exp(-Math.pow(x - pulseCenter, 2) * 1.5) * 0.3 * Math.sin(v * Math.PI * 3);
          const y = (v - 0.5) * 0.58 + envelope * (signal + pulse);
          const z = THREE.MathUtils.lerp(-1.14, 1.14, v) + Math.sin(x * 1.7 + v * 5) * 0.12 * envelope;
          return new THREE.Vector3(x, y, z);
        };

        for (let layer = 0; layer < layerCount; layer += 1) {
          const v = layer / (layerCount - 1);
          const points: InstanceType<typeof THREE.Vector3>[] = [];

          for (let point = 0; point < curvePoints; point += 1) {
            points.push(createSignalPoint(point / (curvePoints - 1), v));
          }

          const curve = new THREE.CatmullRomCurve3(points, false, "centripetal", 0.5);
          contours.push(new THREE.TubeGeometry(curve, curvePoints, 0.0125, 5, false));
        }

        const connectorCount = 11;
        for (let connector = 0; connector < connectorCount; connector += 1) {
          const u = (connector + 1) / (connectorCount + 1);
          const connectorPoints: InstanceType<typeof THREE.Vector3>[] = [];
          for (let point = 0; point < 34; point += 1) {
            connectorPoints.push(createSignalPoint(u, point / 33));
          }
          const curve = new THREE.CatmullRomCurve3(connectorPoints, false, "centripetal", 0.5);
          contours.push(new THREE.TubeGeometry(curve, 34, 0.008, 5, false));

          if (connector % 2 === 0) {
            const nodePosition = createSignalPoint(u, 0.18 + ((connector * 0.13) % 0.64));
            const node = new THREE.SphereGeometry(0.035, 8, 6);
            node.translate(nodePosition.x, nodePosition.y, nodePosition.z);
            contours.push(node);
          }
        }

        const merged = mergeGeometries(contours, false);
        contours.forEach((geometry) => geometry.dispose());
        if (!merged) throw new Error("Unable to merge sculpture geometry");
        merged.computeVertexNormals();

        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#e8e6e0"),
          roughness: 0.86,
          metalness: 0.015,
        });
        const mesh = new THREE.Mesh(merged, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        sculpture.add(mesh);

        scene.add(new THREE.HemisphereLight("#fffdf8", "#8d8b87", 2.25));
        const key = new THREE.DirectionalLight("#fffdf8", 4.4);
        key.position.set(-3.5, 5, 5);
        key.castShadow = true;
        key.shadow.mapSize.set(window.innerWidth < 680 ? 512 : 1024, window.innerWidth < 680 ? 512 : 1024);
        key.shadow.camera.near = 0.1;
        key.shadow.camera.far = 14;
        scene.add(key);
        const rim = new THREE.DirectionalLight("#d9d7d2", 2.2);
        rim.position.set(4, 1, -3);
        scene.add(rim);

        const floorMaterial = new THREE.ShadowMaterial({ color: "#494844", opacity: 0.16 });
        const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -1.18;
        floor.receiveShadow = true;
        scene.add(floor);

        const resize = () => {
          const { width, height } = hostElement.getBoundingClientRect();
          if (width <= 0 || height <= 0) return;
          const responsiveScale = THREE.MathUtils.clamp(1.28 - width * 0.0006, 0.76, 1);
          sculpture.scale.setScalar(responsiveScale);
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };

        const draw = (time = 0) => {
          const seconds = time * 0.001;
          easedPointer.x += (pointer.x - easedPointer.x) * 0.045;
          easedPointer.y += (pointer.y - easedPointer.y) * 0.045;
          sculpture.rotation.y = -0.34 + easedPointer.x * 0.18 + (staticFrame ? 0 : seconds * 0.035) + scrollProgress * 0.14;
          sculpture.rotation.x = -0.04 + easedPointer.y * 0.09 + scrollProgress * 0.035;
          sculpture.position.y = staticFrame ? 0 : Math.sin(seconds * 0.7) * 0.025;
          renderer.render(scene, camera);
        };

        const loop = (time: number) => {
          if (disposed || !visible || !pageVisible || staticFrame) return;
          draw(time);
          animationFrame = window.requestAnimationFrame(loop);
        };

        const start = () => {
          window.cancelAnimationFrame(animationFrame);
          if (disposed) return;
          if (staticFrame) {
            draw();
          } else if (visible && pageVisible) {
            animationFrame = window.requestAnimationFrame(loop);
          }
        };

        const handlePointer = (event: PointerEvent) => {
          const bounds = hostElement.getBoundingClientRect();
          pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
          pointer.y = -((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
        };
        const resetPointer = () => {
          pointer.x = 0;
          pointer.y = 0;
        };
        const handleScroll = () => {
          const bounds = hostElement.getBoundingClientRect();
          scrollProgress = THREE.MathUtils.clamp(-bounds.top / Math.max(bounds.height, 1), 0, 1);
        };
        const handleVisibility = () => {
          pageVisible = !document.hidden;
          start();
        };
        const handleContextLost = (event: Event) => {
          event.preventDefault();
          hostElement.dataset.webgl = "fallback";
          window.cancelAnimationFrame(animationFrame);
        };

        const resizeObserver = new ResizeObserver(() => {
          resize();
          draw();
        });
        const intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            start();
          },
          { rootMargin: "120px 0px", threshold: 0.01 },
        );

        resizeObserver.observe(hostElement);
        intersectionObserver.observe(hostElement);
        hostElement.addEventListener("pointermove", handlePointer, { passive: true });
        hostElement.addEventListener("pointerleave", resetPointer, { passive: true });
        window.addEventListener("scroll", handleScroll, { passive: true });
        document.addEventListener("visibilitychange", handleVisibility);
        canvasElement.addEventListener("webglcontextlost", handleContextLost);
        resize();
        handleScroll();
        hostElement.dataset.webgl = "ready";
        start();

        return () => {
          resizeObserver.disconnect();
          intersectionObserver.disconnect();
          hostElement.removeEventListener("pointermove", handlePointer);
          hostElement.removeEventListener("pointerleave", resetPointer);
          window.removeEventListener("scroll", handleScroll);
          document.removeEventListener("visibilitychange", handleVisibility);
          canvasElement.removeEventListener("webglcontextlost", handleContextLost);
          window.cancelAnimationFrame(animationFrame);
          merged.dispose();
          material.dispose();
          floor.geometry.dispose();
          floorMaterial.dispose();
          renderer.dispose();
        };
      } catch {
        hostElement.dataset.webgl = "fallback";
        return undefined;
      }
    }

    let cleanup: (() => void) | undefined;
    void initialise().then((disposeScene) => {
      cleanup = disposeScene;
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      cleanup?.();
    };
  }, []);

  return (
    <div ref={hostRef} className="hero-sculpture" data-webgl="loading" role="img" aria-label={alt}>
      <Image
        src="/images/editorial/hero-data-flow.webp"
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="(max-width: 767px) 100vw, 58vw"
        className="hero-sculpture-fallback object-contain"
      />
      <canvas ref={canvasRef} className="hero-sculpture-canvas" aria-hidden="true" />
    </div>
  );
}
