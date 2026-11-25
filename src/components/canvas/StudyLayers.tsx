"use client";

import { PATHWAYS, type Point3, SECTION_PLANES, VESSELS } from "@/data/studyData";
import { useBrainStore } from "@/store/useBrainStore";
import { useStudyStore } from "@/store/useStudyStore";
import { Html } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

function SchematicCurve({
  points,
  color,
  active,
  onSelect,
}: { points: Point3[]; color: string; active: boolean; onSelect: () => void }) {
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))),
    [points]
  );
  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <tubeGeometry args={[curve, 64, active ? 0.027 : 0.013, 8, false]} />
      <meshBasicMaterial color={color} transparent opacity={active ? 1 : 0.2} depthTest={false} />
    </mesh>
  );
}

export function StudyLayers({ portal }: { portal: React.RefObject<HTMLElement> }) {
  const mode = useStudyStore((s) => s.mode);
  const selectedPathway = useStudyStore((s) => s.selectedPathway);
  const selectedVessel = useStudyStore((s) => s.selectedVessel);
  const setPathway = useStudyStore((s) => s.setPathway);
  const setVessel = useStudyStore((s) => s.setVessel);
  const axis = useBrainStore((s) => s.clippingAxis);
  const offset = useBrainStore((s) => s.clippingOffset);
  const language = useBrainStore((s) => s.language);
  if (mode === "sections") {
    const plane = SECTION_PLANES.find((p) => p.id === axis) ?? SECTION_PLANES[0];
    const position: Point3 =
      axis === "sagittal" ? [-offset, 0, 0] : axis === "axial" ? [0, -offset, 0] : [0, 0, -offset];
    return (
      <group position={position} rotation={plane.rotation}>
        <mesh>
          <planeGeometry args={[2.7, 2.7]} />
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.13}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        <mesh>
          <planeGeometry args={[2.7, 2.7]} />
          <meshBasicMaterial
            color="#22d3ee"
            wireframe
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
        {(
          [
            [0, 1.42, 0],
            [0, -1.42, 0],
            [-1.42, 0, 0],
            [1.42, 0, 0],
          ] as Point3[]
        ).map((p, i) => (
          <Html portal={portal} zIndexRange={[10, 0]} position={p} center key={plane.labels[i]}>
            <span className="study-orientation">{plane.labels[i]}</span>
          </Html>
        ))}
      </group>
    );
  }
  if (mode !== "pathways" && mode !== "vascular") return null;
  const structures = mode === "pathways" ? PATHWAYS : VESSELS;
  const selected = mode === "pathways" ? selectedPathway : selectedVessel;
  return (
    <group renderOrder={10}>
      {structures.map((structure) => (
        <group key={structure.id}>
          {structure.curves.map((points, i) => (
            <SchematicCurve
              key={`${structure.id}-${i}`}
              points={points}
              color={structure.color}
              active={selected === structure.id}
              onSelect={() =>
                mode === "pathways" ? setPathway(structure.id) : setVessel(structure.id)
              }
            />
          ))}
          {selected === structure.id && (
            <Html portal={portal} zIndexRange={[10, 0]} position={structure.curves[0][0]} center>
              <span className="study-model-label" style={{ borderColor: structure.color }}>
                {structure.name[language]}
              </span>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
}
