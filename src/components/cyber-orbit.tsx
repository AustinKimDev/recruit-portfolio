"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function CyberOrbit() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 120);
    camera.position.set(0, 0.25, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const flightGroup = new THREE.Group();
    scene.add(flightGroup);

    const starCount = 140;
    const starPositions = new Float32Array(starCount * 3);
    const starSpeeds = new Float32Array(starCount);

    for (let i = 0; i < starCount; i += 1) {
      starPositions[i * 3] = THREE.MathUtils.randFloatSpread(8.8);
      starPositions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(4.8);
      starPositions[i * 3 + 2] = THREE.MathUtils.randFloat(-3.6, 1.2);
      starSpeeds[i] = THREE.MathUtils.randFloat(0.006, 0.021);
    }

    const starGeometry = new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );
    const starPositionAttribute = starGeometry.getAttribute("position") as THREE.BufferAttribute;
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        color: 0xd8d2ff,
        size: 0.024,
        transparent: true,
        opacity: 0.52,
      })
    );
    scene.add(stars);

    const speedLineCount = 48;
    const speedLinePositions = new Float32Array(speedLineCount * 6);
    const speedLines = Array.from({ length: speedLineCount }, () => ({
      x: THREE.MathUtils.randFloat(-4.5, 4.8),
      y: THREE.MathUtils.randFloat(-2.2, 2.2),
      z: THREE.MathUtils.randFloat(-2.8, 0.6),
      length: THREE.MathUtils.randFloat(0.5, 1.4),
      speed: THREE.MathUtils.randFloat(0.035, 0.075),
    }));

    const writeSpeedLine = (index: number) => {
      const line = speedLines[index]!;
      const offset = index * 6;
      speedLinePositions[offset] = line.x;
      speedLinePositions[offset + 1] = line.y;
      speedLinePositions[offset + 2] = line.z;
      speedLinePositions[offset + 3] = line.x - line.length;
      speedLinePositions[offset + 4] = line.y - line.length * 0.12;
      speedLinePositions[offset + 5] = line.z;
    };

    speedLines.forEach((_, index) => writeSpeedLine(index));

    const speedLineGeometry = new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.BufferAttribute(speedLinePositions, 3)
    );
    const speedLinePositionAttribute = speedLineGeometry.getAttribute("position") as THREE.BufferAttribute;
    const speedLineMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.3,
    });
    const speedLineMesh = new THREE.LineSegments(speedLineGeometry, speedLineMaterial);
    scene.add(speedLineMesh);

    const ship = new THREE.Group();
    let shipBaseX = 1.25;
    let shipBaseY = -0.08;
    let shipScale = 0.86;
    ship.position.set(shipBaseX, shipBaseY, 0);
    ship.rotation.set(0.16, -0.54, -0.08);
    ship.scale.setScalar(shipScale);
    flightGroup.add(ship);

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xe5e7eb,
      emissive: 0x151827,
      emissiveIntensity: 0.45,
      metalness: 0.62,
      roughness: 0.28,
    });
    const panelMaterial = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.52,
      metalness: 0.2,
      roughness: 0.34,
    });
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.45,
      metalness: 0.05,
      roughness: 0.08,
      transparent: true,
      opacity: 0.76,
    });

    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.32, 1.45, 10, 1, false),
      bodyMaterial
    );
    body.rotation.z = Math.PI / 2;
    ship.add(body);

    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.62, 10), bodyMaterial);
    nose.rotation.z = -Math.PI / 2;
    nose.position.x = 0.94;
    ship.add(nose);

    const engine = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.22, 0.26, 10),
      panelMaterial
    );
    engine.rotation.z = Math.PI / 2;
    engine.position.x = -0.84;
    ship.add(engine);

    const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 12), glassMaterial);
    cockpit.scale.set(1.35, 0.68, 0.52);
    cockpit.position.set(0.28, 0.22, 0.22);
    ship.add(cockpit);

    const wingMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide,
    });

    const createWing = (side: 1 | -1) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
          new Float32Array([
            -0.06, -0.07, side * 0.18,
            -0.82, -0.2, side * 0.86,
            -0.46, 0.17, side * 0.26,
          ]),
          3
        )
      );
      geometry.computeVertexNormals();
      return new THREE.Mesh(geometry, wingMaterial);
    };

    ship.add(createWing(1));
    ship.add(createWing(-1));

    const finGeometry = new THREE.BufferGeometry();
    finGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([
          -0.48, 0.18, 0,
          0.06, 0.22, 0,
          -0.72, 0.68, 0,
        ]),
        3
      )
    );
    finGeometry.computeVertexNormals();
    ship.add(new THREE.Mesh(finGeometry, wingMaterial));

    const flameMaterial = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const flameCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.62,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.95, 16), flameMaterial);
    flame.rotation.z = Math.PI / 2;
    flame.position.x = -1.42;
    ship.add(flame);

    const flameCore = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.7, 16), flameCoreMaterial);
    flameCore.rotation.z = Math.PI / 2;
    flameCore.position.x = -1.32;
    ship.add(flameCore);

    const trailMaterials = [0x7c3aed, 0x60a5fa, 0xc4b5fd].map(
      (color) =>
        new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.28,
          blending: THREE.AdditiveBlending,
        })
    );

    const trails = trailMaterials.map((material, index) => {
      const yOffset = (index - 1) * 0.14;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.98, yOffset, 0),
        new THREE.Vector3(-1.64, yOffset - 0.08, 0.04),
        new THREE.Vector3(-2.48, yOffset - 0.18, -0.02),
        new THREE.Vector3(-3.62, yOffset - 0.34, 0),
      ]);
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(48)),
        material
      );
      ship.add(line);
      return line;
    });

    const gateMaterial = new THREE.LineBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.28,
    });
    const gate = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.TorusGeometry(1.36, 0.006, 8, 96)),
      gateMaterial
    );
    gate.position.set(3.1, 0.16, -1.1);
    gate.rotation.set(0.2, 0.9, 0.16);
    scene.add(gate);

    const routeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.2, -1.48, -0.2),
      new THREE.Vector3(-2.6, -0.88, -0.1),
      new THREE.Vector3(-1.05, -0.4, -0.04),
      new THREE.Vector3(1.25, -0.1, 0),
      new THREE.Vector3(3.25, 0.18, -0.8),
    ]);
    const routeLineMaterial = new THREE.LineBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.22,
    });
    const routeLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(routeCurve.getPoints(120)),
      routeLineMaterial
    );
    scene.add(routeLine);

    scene.add(new THREE.AmbientLight(0xffffff, 0.78));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.7);
    keyLight.position.set(2.8, 3, 5);
    scene.add(keyLight);
    const violet = new THREE.PointLight(0xa855f7, 2.1, 14);
    violet.position.set(-2.1, 1.2, 2.2);
    scene.add(violet);
    const engineLight = new THREE.PointLight(0x60a5fa, 1.5, 8);
    engineLight.position.set(-1.4, -0.05, 0.7);
    ship.add(engineLight);

    const pointer = new THREE.Vector2(0, 0);
    const handlePointer = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * -2;
    };
    host.addEventListener("pointermove", handlePointer);

    let frame = 0;
    let animationFrame = 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resize = () => {
      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const visibleHeight = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const visibleWidth = visibleHeight * camera.aspect;
      const targetScreenX = width < 700 ? 0.68 : width < 1180 ? 0.65 : 0.66;
      const targetScreenY = width < 700 ? 0.72 : width < 1180 ? 0.5 : 0.48;

      shipBaseX = (targetScreenX - 0.5) * visibleWidth;
      shipBaseY = (0.5 - targetScreenY) * visibleHeight;
      shipScale = width < 700 ? 0.5 : width < 1180 ? 0.74 : 0.86;
      ship.scale.setScalar(shipScale);
      renderer.setSize(width, height, false);
    };

    const render = () => {
      frame += prefersReducedMotion ? 0.002 : 0.018;

      for (let i = 0; i < starCount; i += 1) {
        starPositions[i * 3] -= starSpeeds[i];
        if (starPositions[i * 3] < -4.7) {
          starPositions[i * 3] = 4.7;
          starPositions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(4.8);
        }
      }
      starPositionAttribute.needsUpdate = true;

      speedLines.forEach((line, index) => {
        line.x -= prefersReducedMotion ? line.speed * 0.12 : line.speed;
        if (line.x < -5.2) {
          line.x = THREE.MathUtils.randFloat(4.2, 5.4);
          line.y = THREE.MathUtils.randFloat(-2.2, 2.2);
          line.z = THREE.MathUtils.randFloat(-2.8, 0.6);
        }
        writeSpeedLine(index);
      });
      speedLinePositionAttribute.needsUpdate = true;

      ship.position.x = shipBaseX + Math.sin(frame * 1.3) * 0.08 + pointer.x * 0.08;
      ship.position.y = shipBaseY + Math.sin(frame * 1.7) * 0.05 + pointer.y * 0.06;
      ship.rotation.y = -0.54 + Math.sin(frame * 0.8) * 0.08 + pointer.x * 0.12;
      ship.rotation.z = -0.08 + Math.sin(frame * 1.9) * 0.055 - pointer.y * 0.06;
      ship.rotation.x = 0.16 + Math.sin(frame * 1.1) * 0.025;
      flame.scale.set(1 + Math.sin(frame * 10) * 0.2, 1, 1);
      flameCore.scale.set(1 + Math.cos(frame * 12) * 0.18, 1, 1);
      trails.forEach((_, index) => {
        trailMaterials[index]!.opacity = 0.23 + Math.sin(frame * 2.8 + index) * 0.08;
      });
      gate.rotation.z += prefersReducedMotion ? 0.0004 : 0.002;
      routeLineMaterial.opacity = 0.18 + Math.sin(frame * 1.6) * 0.06;
      speedLineMaterial.opacity = 0.22 + Math.sin(frame * 1.8) * 0.08;
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
      scene.traverse((object) => {
        const disposable = object as THREE.Object3D & {
          geometry?: THREE.BufferGeometry;
          material?: THREE.Material | THREE.Material[];
        };
        disposable.geometry?.dispose();
        if (Array.isArray(disposable.material)) {
          disposable.material.forEach((material) => material.dispose());
        } else {
          disposable.material?.dispose();
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="space-flight-scene pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
      aria-hidden="true"
    />
  );
}
