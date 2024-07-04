import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Block, BlockProps, HighlighBlock } from "./block";
import { Floor } from "./floor";
import { Intersection, Mesh, Object3D, Vector3 } from "three";
import { Lights } from "./lights";
import { FixedCarmera } from "./camera";
import { FullRack } from "./Rack";
import React from "react";

export interface ServerViewProps {
  mode: string;
}
type NewBlock = Omit<BlockProps, "position"> & { position: Vector3 };
export function ServerView({ mode }: ServerViewProps) {
  const [blocks, setBlocks] = useState<NewBlock[]>([]);

  const highlightBlockRef = useRef<Mesh>(null);
  const { raycaster, scene, camera, mouse } = useThree();
  //@ts-ignore
  const intersectsRef = useRef<Intersection<Object3D<Event>>[]>();

  function placeBlock(position: Vector3) {
    setBlocks((prevBlocks) => {
      const positionAlreadyTaken = prevBlocks?.some(
        (block) => block.position === position
      );

      if (positionAlreadyTaken) {
        console.info("this positon alreay taken");
        return [...prevBlocks];
      }

      const newBlock: NewBlock = {
        name: `block-${prevBlocks.length + 1}`,
        position,
      };
      // console.log(position);
      return [...prevBlocks, newBlock];
    });
  }

  function handlePointDown() {
    if (highlightBlockRef.current) {
      if (highlightBlockRef.current.visible === true) {
        //highlightBlockRef의 현재 position을 복사하고 바닥 좌표로 변환 후 0.5를 더한 값을 구해서 position에 저장
        const position = new Vector3()
          .copy(highlightBlockRef.current.position)
          .floor()
          .addScalar(0.5);
        placeBlock(position);
      }
    }
  }

  useFrame(() => {
    raycaster.setFromCamera(mouse, camera);
    //@ts-ignore
    intersectsRef.current = raycaster.intersectObjects(scene.children);

    const intersect = intersectsRef?.current?.filter(
      (intersect) =>
        intersect.object.name && intersect.object.name !== "highlight"
    )?.[0];

    if (intersect) {
      if (!highlightBlockRef.current && mode === "edit") {
        return console.warn("hihgtlightBlockRef not found");
      }

      const position = new Vector3()
        .copy(intersect.point)
        .floor()
        .addScalar(0.5);

      if (intersect.face && intersect.object.name.includes("block")) {
        position.copy(intersect.object.position);
        position.add(intersect.face.normal);
      }

      position.y = Math.max(0.5, position.y);

      highlightBlockRef.current?.position.copy(position);
      if (highlightBlockRef.current) {
        highlightBlockRef.current.visible = true;
      }
    } else {
      // floor out
      if (highlightBlockRef.current) {
        highlightBlockRef.current.visible = false;
      }
    }
  });

  useEffect(function eventMouseClickToWorkingWithPlaceBlockRaycast() {
    window.addEventListener("click", handlePointDown);
    return () => {
      window.removeEventListener("click", handlePointDown);
    };
  }, []);

  return (
    <>
      <FixedCarmera />
      <Lights />
      {mode === "edit" && (
        <HighlighBlock name="highlight" ref={highlightBlockRef} />
      )}

      {blocks?.map((blockProps, index) => (
        <FullRack key={index} {...blockProps} />
      ))}
      <Floor name="floor" />
      <OrbitControls
        enableRotate={false}
        enableZoom={false}
        enablePan={false}
      />
    </>
  );
}
