import { MeshProps } from "@react-three/fiber";
import React from "react";
import { DoubleSide, Vector3 } from "three";

import { Door } from "./door";

export interface FloorProps extends MeshProps {
  name?: string;
  onClickAtPosition?: (positions: Vector3) => any;
}

export function Floor({ name = "floor", ...rest }: FloorProps) {
  const size = 10; //20
  const wallHeight = 2.1; //2
  const wallThickness = 0.01;

  return (
    <>
      <mesh name={name} rotation={[Math.PI / 2, 0, 0]} {...rest}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial
          side={DoubleSide}
          color={"#cad3d3"}
          metalness={0.01}
          roughness={0.5}
          transparent={true}
        />
      </mesh>
      {/* <gridHelper
        position={[0, 0, 0]}
        args={[size, size, "#ffffff", "#ffffff"]}
      /> */}

      {/* Walls */}
      <mesh position={[0, wallHeight / 2, size / 2]}>
        <boxGeometry args={[size, wallHeight, wallThickness]} />
        <meshStandardMaterial
          color={"#ffffff"}
          opacity={0.5}
          transparent={true}
        />
      </mesh>
      <mesh position={[0, wallHeight / 2, -size / 2]}>
        <boxGeometry args={[size, wallHeight, wallThickness]} />
        <meshStandardMaterial color={"#ffffff"} />
      </mesh>
      <mesh position={[size / 2, wallHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, wallHeight, size]} />
        <meshStandardMaterial
          color={"#ffffff"}
          opacity={0.5}
          transparent={true}
        />
      </mesh>
      <mesh position={[-size / 2, wallHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, wallHeight, size]} />
        <meshStandardMaterial color={"#ffffff"} />
      </mesh>
      <Door
        position={[4, 0, size / 2 + wallThickness * 7]}
        rotation={[0, Math.PI, 0]}
      />
    </>
  );
}
