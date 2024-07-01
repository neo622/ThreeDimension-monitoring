import { MeshProps } from "@react-three/fiber";
import React from "react";
import { DoubleSide, Vector3 } from "three";

export interface FloorProps extends MeshProps {
  name?: string;
  onClickAtPosition?: (positions: Vector3) => any;
}

export function Floor({ name = "floor", ...rest }: FloorProps) {
  const size = 20;
  const wallHeight = 2;
  const wallThickness = 0.1;

  return (
    <>
      <mesh name={name} rotation={[Math.PI / 2, 0, 0]} {...rest}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial side={DoubleSide} color={"#ffffff"} />
      </mesh>
      <gridHelper
        position={[0, 0, 0]}
        args={[size, size, "#ffffff", "#ffffff"]}
      />
      {/* Walls */}
      <mesh position={[0, wallHeight / 2, size / 2]}>
        <boxGeometry args={[size, wallHeight, wallThickness]} />
        <meshStandardMaterial color={"#ffffff"} />
      </mesh>
      <mesh position={[0, wallHeight / 2, -size / 2]}>
        <boxGeometry args={[size, wallHeight, wallThickness]} />
        <meshStandardMaterial color={"#ffffff"} />
      </mesh>
      <mesh position={[size / 2, wallHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, wallHeight, size]} />
        <meshStandardMaterial color={"#ffffff"} />
      </mesh>
      <mesh position={[-size / 2, wallHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, wallHeight, size]} />
        <meshStandardMaterial color={"#ffffff"} />
      </mesh>
    </>
  );
}
