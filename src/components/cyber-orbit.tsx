"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function CyberOrbit() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    camera.position.set(0, 0.35, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.08, 2),
      new THREE.MeshStandardMaterial({
        color: 0x6f5cff,
        emissive: 0x171a21,
        metalness: 0.18,
        roughness: 0.58,
        wireframe: true,
      })
    );
    group.add(core);

    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(1.62, 64, 32),
      new THREE.MeshBasicMaterial({
        color: 0x8b95a1,
        transparent: true,
        opacity: 0.12,
        wireframe: true,
      })
    );
    group.add(shell);

    const orbitMaterial = new THREE.LineBasicMaterial({
      color: 0x6f5cff,
      transparent: true,
      opacity: 0.34,
    });

    for (let i = 0; i < 3; i += 1) {
      const curve = new THREE.EllipseCurve(0, 0, 1.95 + i * 0.18, 0.52 + i * 0.06);
      const points = curve.getPoints(160).map((point) => new THREE.Vector3(point.x, point.y, 0));
      const orbit = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), orbitMaterial);
      orbit.rotation.x = 0.76 + i * 0.24;
      orbit.rotation.y = i * 0.58;
      group.add(orbit);
    }

    const particleCount = 70;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particles = new THREE.Points(
      new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(positions, 3)),
      new THREE.PointsMaterial({
        color: 0x8b95a1,
        size: 0.02,
        transparent: true,
        opacity: 0.42,
      })
    );
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const violet = new THREE.PointLight(0x8b7bff, 1.4, 20);
    violet.position.set(-3, 3, 4);
    scene.add(violet);
    const cyan = new THREE.PointLight(0x64a8ff, 0.8, 18);
    cyan.position.set(3, -2, 4);
    scene.add(cyan);

    const pointer = new THREE.Vector2(0, 0);
    const handlePointer = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * -2;
    };
    host.addEventListener("pointermove", handlePointer);

    let frame = 0;
    let animationFrame = 0;
    const resize = () => {
      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const render = () => {
      frame += 0.01;
      group.rotation.y += 0.006 + pointer.x * 0.0015;
      group.rotation.x = pointer.y * 0.18 + Math.sin(frame) * 0.045;
      core.rotation.y += 0.011;
      shell.rotation.y -= 0.004;
      particles.rotation.y -= 0.0018;
      particles.rotation.x = Math.sin(frame * 0.7) * 0.08;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", handlePointer);
      renderer.dispose();
      core.geometry.dispose();
      shell.geometry.dispose();
      particles.geometry.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="cyber-orbit relative h-[300px] w-full overflow-hidden rounded-xl md:h-[440px]"
      aria-label="3D orbital visualization"
    />
  );
}
