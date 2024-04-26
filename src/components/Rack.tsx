import { OrbitControls } from "@react-three/drei";
// import { useGLTF } from '@react-three/drei/core/useGLTF'
import React from "react";
import { Office } from "./Office";
import { IceCream } from "./IceCream";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export interface RackProps {}

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls />
      <IceCream />
      {/* <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
    </>
  );
};
