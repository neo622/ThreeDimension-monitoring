import { MeshProps } from "@react-three/fiber";
import React from "react";
import { DoubleSide, Vector3 } from "three";

export interface FloorProps extends MeshProps {
  name?: string;
  onClickAtPosition?: (positions: Vector3) => any;
}

export function Floor({ name = "floor", ...rest }: FloorProps) {
  const size = 20;

  return (
    <>
      <mesh name={name} rotation={[Math.PI / 2, 0, 0]} {...rest}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial side={DoubleSide} color={"#202020"} />
      </mesh>
      <gridHelper
        position={[0, 0, 0]}
        args={[size, size, "#ffffff", "#ffffff"]}
      />
    </>
  );
}
