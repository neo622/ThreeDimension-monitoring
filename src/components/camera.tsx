import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";

export function FixedCarmera() {
  const { camera } = useThree();
  camera.position.set(0, 20, 20);
  camera.lookAt(0, 0, 0);

  useFrame(() => {
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    // camera.zoom = 10;
  });

  return null;
}
