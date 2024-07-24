import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Lights } from "./lights";

export function Door(props: any) {
  const group: any = useRef();
  const { nodes, materials }: any = useGLTF("./doormodel/scene.gltf");
  // console.log("door position", props.position);
  return (
    <>
      <group ref={group} {...props} dispose={null} scale={0.005}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.defaultMaterial.geometry}
              material={nodes.defaultMaterial.material}
            />
            <mesh
              geometry={nodes.defaultMaterial_1.geometry}
              material={nodes.defaultMaterial_1.material}
            />
            <mesh
              geometry={nodes.defaultMaterial_2.geometry}
              material={nodes.defaultMaterial_2.material}
            />
            <mesh
              geometry={nodes.defaultMaterial_3.geometry}
              material={nodes.defaultMaterial_3.material}
            />
            <mesh
              geometry={nodes.defaultMaterial_4.geometry}
              material={nodes.defaultMaterial_4.material}
            />
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("./doormodel/scene.gltf");
