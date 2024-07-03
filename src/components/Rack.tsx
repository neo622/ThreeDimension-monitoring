import { OrbitControls, useGLTF } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import React, { forwardRef, useRef } from "react";

export interface RackProps {
  name?: string;
  position?: Vector3;
  onClick?: () => any;
}

export const FullRack = forwardRef<RackProps>(
  ({ name, position, onClick }: RackProps) => {
    const group: any = useRef();
    const { nodes, materials }: any = useGLTF("./model/scene-transformed.glb");
    console.log("name", name);
    console.log("position", position);
    return (
      <>
        {/* <ambientLight intensity={1} /> */}
        <OrbitControls />
        <group ref={group} dispose={null} position={position} scale={1}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <group rotation={[Math.PI / 2, 0, 0]}>
              <group scale={0.01}>
                <mesh
                  geometry={nodes.CardboardBox_LP_lambert1_0.geometry}
                  material={materials.lambert1}
                />
              </group>
            </group>
          </group>
        </group>
      </>
    );
  }
);

useGLTF.preload("./model/scene-transformed.glb");
