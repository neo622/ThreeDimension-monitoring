import { OrbitControls, useGLTF } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import React, { forwardRef, useRef } from "react";
import { useSpring, animated } from "@react-spring/three";

export interface RackProps {
  name?: string;
  position?: Vector3;
  onClick?: () => any;
}

export const FullRack = forwardRef<RackProps>(
  ({ name, position, onClick }: RackProps) => {
    const group: any = useRef();
    const { nodes, materials }: any = useGLTF("./servermodel/scene.gltf");
    // console.log("name", name);
    // console.log("position", position);
    return (
      <>
        {/* <ambientLight intensity={1} /> */}
        <OrbitControls />
        <group
          ref={group}
          dispose={null}
          position={position}
          scale={1}
          onClick={onClick}
        >
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <group rotation={[Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes.defaultMaterial.geometry}
                material={materials.ServerMaterial}
              />
            </group>
          </group>
        </group>
      </>
    );
  }
);

useGLTF.preload("./servermodel/scene.gltf");
