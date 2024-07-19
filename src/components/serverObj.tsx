import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props: any) {
  const group = useRef();
  const { nodes, materials }: any = useGLTF("./servermodel/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.defaultMaterial.geometry}
            material={materials.ServerMaterial}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./servermodel/scene.gltf");
