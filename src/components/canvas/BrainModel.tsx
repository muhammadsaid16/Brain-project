"use client";

import { useBrainStore } from "@/store/useBrainStore";
import { useGLTF } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const MODEL_PATH = "/models/brain.glb";

// Preload model
useGLTF.preload(MODEL_PATH);

export function BrainModel() {
  const { gl } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  const hologramMode = useBrainStore((state) => state.hologramMode);
  const clippingEnabled = useBrainStore((state) => state.clippingEnabled);
  const clippingAxis = useBrainStore((state) => state.clippingAxis);
  const clippingOffset = useBrainStore((state) => state.clippingOffset);
  const devPickerMode = useBrainStore((state) => state.devPickerMode);
  const setPickedCoords = useBrainStore((state) => state.setPickedCoords);

  // Enable local clipping in WebGLRenderer
  useEffect(() => {
    gl.localClippingEnabled = true;
  }, [gl]);

  // Load GLTF
  const { scene } = useGLTF(MODEL_PATH);

  // Dynamic clipping plane
  const clippingPlane = useMemo(() => {
    if (!clippingEnabled) return null;

    let normal = new THREE.Vector3(1, 0, 0);
    if (clippingAxis === "sagittal") {
      normal = new THREE.Vector3(1, 0, 0);
    } else if (clippingAxis === "axial") {
      normal = new THREE.Vector3(0, 1, 0);
    } else if (clippingAxis === "coronal") {
      normal = new THREE.Vector3(0, 0, 1);
    }

    return new THREE.Plane(normal, clippingOffset);
  }, [clippingEnabled, clippingAxis, clippingOffset]);

  // Realistic Anatomical Material
  const realisticMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#d4c3b9"),
      roughness: 0.38,
      metalness: 0.08,
      clearcoat: 0.45,
      clearcoatRoughness: 0.25,
      reflectivity: 0.5,
      side: THREE.DoubleSide,
      clippingPlanes: clippingPlane ? [clippingPlane] : [],
      clipShadows: true,
    });
  }, [clippingPlane]);

  // Hologram / X-Ray Material
  const hologramMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#8b5cf6"),
      emissive: new THREE.Color("#3b0764"),
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.1,
      transmission: 0.82,
      opacity: 0.7,
      transparent: true,
      side: THREE.DoubleSide,
      clippingPlanes: clippingPlane ? [clippingPlane] : [],
      clipShadows: true,
    });
  }, [clippingPlane]);

  // Hologram Wireframe Glow Material
  const wireframeMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color("#22d3ee"),
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      clippingPlanes: clippingPlane ? [clippingPlane] : [],
    });
  }, [clippingPlane]);

  // Clone scene so we can normalize & center
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    // Compute bounding box to normalize & center
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 2.5 / maxDim : 1;

    // Center geometry to (0, 0, 0)
    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    clone.scale.set(scale, scale, scale);

    return clone;
  }, [scene]);

  // Create dedicated wireframe clone once
  const wireframeScene = useMemo(() => {
    const clone = clonedScene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = wireframeMaterial;
        mesh.scale.set(1.002, 1.002, 1.002);
      }
    });
    return clone;
  }, [clonedScene, wireframeMaterial]);

  // Update wireframe scene material clipping planes
  useEffect(() => {
    wireframeScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = wireframeMaterial;
      }
    });
  }, [wireframeScene, wireframeMaterial]);

  // Switch base scene materials cleanly
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.material = hologramMode ? hologramMaterial : realisticMaterial;
      }
    });
  }, [clonedScene, hologramMode, realisticMaterial, hologramMaterial]);

  // Handle Coordinate Picker
  const handleMeshClick = (e: ThreeEvent<MouseEvent>) => {
    // Check if devPickerMode is active or Shift key held down
    if (devPickerMode || e.shiftKey) {
      e.stopPropagation();
      const pt = e.point;
      const coords: [number, number, number] = [
        Number(pt.x.toFixed(3)),
        Number(pt.y.toFixed(3)),
        Number(pt.z.toFixed(3)),
      ];

      setPickedCoords(coords);
      const str = `[${coords[0]}, ${coords[1]}, ${coords[2]}]`;
      navigator.clipboard?.writeText(str).catch(() => {});
      console.log(`📍 Picked 3D Coordinate: ${str} (copied to clipboard)`);
    }
  };

  return (
    <group ref={groupRef} onClick={handleMeshClick}>
      <primitive object={clonedScene} />
      {hologramMode && <primitive object={wireframeScene} />}
    </group>
  );
}
