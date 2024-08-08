import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree, Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Block, BlockProps, HighlighBlock } from "./block";
import { Floor } from "./floor";
import {
  Intersection,
  Mesh,
  Object3D,
  Vector3,
  PerspectiveCamera,
  WebGLRenderer,
} from "three";
import { Lights } from "./lights";
import { FixedCarmera } from "./camera";
import { FullRack } from "./Rack";
import Aircon from "./aircon";
import React from "react";

export interface ServerViewProps {
  rackData: any;
  mode: string;
  setLightsPos: any;
}
type NewBlock = Omit<BlockProps, "position"> & { position: Vector3 };
//Omit -> 특정 속성을 제외한 새로운 타입을 만들고 새로운 position: Vector3 속성 추가

export function ServerView({ rackData, mode, setLightsPos }: ServerViewProps) {
  const [blocks, setBlocks] = useState<NewBlock[]>(rackData);
  const [aircon, setAircon] = useState<any>([]);

  const airconPos: any = [
    {
      x: -4.5,
      y: 0.5,
      z: 3.5,
    },
    {
      x: -4.5,
      y: 0.5,
      z: 2.5,
    },
    {
      x: -4.5,
      y: 0.5,
      z: 1.5,
    },
    {
      x: -4.5,
      y: 0.5,
      z: 0.5,
    },
  ];

  const airconPos2: any = [];

  useEffect(() => {
    let tmp_pos: any = [];
    for (let i = 0; i < airconPos.length; i++) {
      tmp_pos.push(new Vector3(airconPos[i].x, airconPos[i].y, airconPos[i].z));
    }
    console.log("에어컨!!!!!", tmp_pos);
    setAircon(tmp_pos);
  }, []);

  const highlightBlockRef = useRef<Mesh>(null);
  const { raycaster, scene, camera, gl, mouse } = useThree();
  //@ts-ignore
  const intersectsRef = useRef<Intersection<Object3D<Event>>[]>();

  function calcScreenPosition(position: Vector3, camera: any, canvas: any) {
    const vector = position.clone().project(camera);
    const x = (vector.x * 0.5 + 0.5) * canvas.clientWidth;
    const y = (1 - (vector.y * 0.5 + 0.5)) * canvas.clientHeight;
    // console.log("window position:", x, y);
    const lightPos: any = [JSON.stringify(x) + "px", JSON.stringify(y) + "px"];
    setLightsPos(lightPos);
    return { x, y };
  }

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
      console.log(newBlock);
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
        calcScreenPosition(position, camera, gl.domElement);
      }
    }
  }

  // for highlight block
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

  useEffect(() => {
    console.log("@@@", blocks);
  }, [blocks]);

  useEffect(() => {
    setBlocks(rackData);
  }, [rackData]);

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
      {aircon?.map((item: any) => (
        <Aircon position={item} />
      ))}
      <Floor name="floor" />
      <OrbitControls enableRotate={true} enableZoom={true} enablePan={true} />
    </>
  );
}
