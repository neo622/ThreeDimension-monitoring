import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";

export function FixedCarmera() {
  const { camera } = useThree();
  camera.position.set(0, 20, 20);
  camera.lookAt(0, 0, 0);

  useFrame(() => {
    camera.position.set(15, 15, 15);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
