"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_SIZE = 0.018;
const PARTICLE_COUNT = 7000;
const SPHERE_RADIUS = 4.2;
const REPEL_THRESHOLD = 1.6;
const REPEL_FORCE = 0.52;
const RETURN_STRENGTH = 0.045;
const AUTO_ROTATION_SPEED = 0.0012;
const PARTICLE_COLOR = 0x1a3d2b;

const ParticleGlobe = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 9;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(2, 2);
    const intersectionPoint = new THREE.Vector3();
    const worldMatrix = new THREE.Matrix4();
    const inverseWorldMatrix = new THREE.Matrix4();
    const dummy = new THREE.Object3D();

    const intersectionSphere = new THREE.Mesh(
      new THREE.SphereGeometry(SPHERE_RADIUS, 32, 32),
      new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide }),
    );
    scene.add(intersectionSphere);

    const particleSystem = new THREE.InstancedMesh(
      new THREE.SphereGeometry(PARTICLE_SIZE, 8, 8),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(PARTICLE_COLOR),
        transparent: true,
        opacity: 0.82,
      }),
      PARTICLE_COUNT,
    );

    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const x = SPHERE_RADIUS * Math.sin(phi) * Math.cos(theta);
      const y = SPHERE_RADIUS * Math.sin(phi) * Math.sin(theta);
      const z = SPHERE_RADIUS * Math.cos(phi);
      const index = i * 3;

      originalPositions[index] = x;
      originalPositions[index + 1] = y;
      originalPositions[index + 2] = z;

      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      particleSystem.setMatrixAt(i, dummy.matrix);
    }

    particleSystem.instanceMatrix.needsUpdate = true;
    scene.add(particleSystem);

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    let isDragging = false;
    let previousX = 0;
    let previousY = 0;
    let rotationX = 0;
    let rotationY = 0;
    let animationFrame = 0;

    const onPointerDown = (event: PointerEvent) => {
      isDragging = true;
      previousX = event.clientX;
      previousY = event.clientY;
      container.setPointerCapture(event.pointerId);
    };

    const onPointerUp = (event: PointerEvent) => {
      isDragging = false;
      if (container.hasPointerCapture(event.pointerId)) {
        container.releasePointerCapture(event.pointerId);
      }
    };

    const onPointerDrag = (event: PointerEvent) => {
      onPointerMove(event);

      if (!isDragging) return;

      rotationY += (event.clientX - previousX) * 0.004;
      rotationX += (event.clientY - previousY) * 0.004;
      previousX = event.clientX;
      previousY = event.clientY;
    };

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);

      rotationY += AUTO_ROTATION_SPEED;
      particleSystem.rotation.set(rotationX, rotationY, 0);
      intersectionSphere.rotation.copy(particleSystem.rotation);

      worldMatrix.copy(particleSystem.matrixWorld);
      inverseWorldMatrix.copy(worldMatrix).invert();

      raycaster.setFromCamera(mouse, camera);
      const intersections = raycaster.intersectObject(intersectionSphere);
      const hasIntersection = intersections.length > 0;

      if (hasIntersection) {
        intersectionPoint.copy(intersections[0].point);
        intersectionPoint.applyMatrix4(inverseWorldMatrix);
      }

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const index = i * 3;
        const particlePosition = new THREE.Vector3(
          originalPositions[index] + velocities[index],
          originalPositions[index + 1] + velocities[index + 1],
          originalPositions[index + 2] + velocities[index + 2],
        );

        if (hasIntersection) {
          const distance = particlePosition.distanceTo(intersectionPoint);

          if (distance < REPEL_THRESHOLD) {
            const direction = new THREE.Vector3()
              .subVectors(particlePosition, intersectionPoint)
              .normalize();
            const force = REPEL_FORCE * (1 - distance / REPEL_THRESHOLD);

            velocities[index] += direction.x * force;
            velocities[index + 1] += direction.y * force;
            velocities[index + 2] += direction.z * force;
          }
        }

        velocities[index] *= 0.95;
        velocities[index + 1] *= 0.95;
        velocities[index + 2] *= 0.95;

        velocities[index] +=
          (originalPositions[index] - particlePosition.x) * RETURN_STRENGTH;
        velocities[index + 1] +=
          (originalPositions[index + 1] - particlePosition.y) * RETURN_STRENGTH;
        velocities[index + 2] +=
          (originalPositions[index + 2] - particlePosition.z) * RETURN_STRENGTH;

        dummy.position.set(
          originalPositions[index] + velocities[index],
          originalPositions[index + 1] + velocities[index + 1],
          originalPositions[index + 2] + velocities[index + 2],
        );
        dummy.updateMatrix();
        particleSystem.setMatrixAt(i, dummy.matrix);
      }

      particleSystem.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    container.addEventListener("pointermove", onPointerDrag);
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerleave", onPointerUp);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointermove", onPointerDrag);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerleave", onPointerUp);

      particleSystem.geometry.dispose();
      if (Array.isArray(particleSystem.material)) {
        particleSystem.material.forEach((material) => material.dispose());
      } else {
        particleSystem.material.dispose();
      }
      intersectionSphere.geometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  );
};

export default ParticleGlobe;
