/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Pricey1600 (https://sketchfab.com/Pricey1600)
license: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
source: https://sketchfab.com/3d-models/cardboard-box-4e622ef1a09c43e28a49d9fa37f9eeee
title: Cardboard Box
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Rack(props: any) {
  const group = useRef();
  const { nodes, materials }: any = useGLTF("./model/scene-transformed.glb");
  return (
    <group ref={group} {...props} dispose={null}>
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
  );
}

useGLTF.preload("./model/scene-transformed.glb");