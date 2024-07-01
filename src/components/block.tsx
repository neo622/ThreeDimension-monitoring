import { Edges } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";
import { useSpring, animated } from "@react-spring/three";
import React from "react";
import {
  Event,
  FrontSide,
  Intersection,
  Mesh,
  Object3D,
  DoubleSide,
  Side,
} from "three";

export interface BlockProps {
  name?: string;
  position?: Vector3;
  opacity?: number;
  color?: string;
  edgesColor?: string;
  onClick?: () => any;
  side?: Side;
}

export const Block = forwardRef<Mesh, BlockProps>(
  (
    {
      name,
      position,
      // color = "#39D353",
      color = "black",
      edgesColor,
      opacity,
      onClick,
      side = DoubleSide,
    },
    ref
  ) => {
    const meshRef = useRef<Mesh>(null);

    useImperativeHandle(ref, () => meshRef.current!);
    const { scale } = useSpring({
      from: {
        scale: 0,
      },
      to: {
        scale: 1,
      },
    });

    return (
      <animated.mesh
        scale={scale}
        ref={meshRef}
        name={name}
        position={position}
        onClick={onClick}
      >
        <boxGeometry name={name} args={[1, 1, 1]} />
        <meshStandardMaterial
          opacity={opacity}
          transparent={opacity ? true : false}
          side={side}
          color={color}
        />
        {edgesColor ? <Edges color={edgesColor} /> : <></>}
      </animated.mesh>
    );
  }
);

export interface HighlighBlockProps {
  name?: string;
  //@ts-ignore
  onIntersect?: (obj: Intersection<Object3D<Event>>) => any;
}

export const HighlighBlock = forwardRef(
  ({ name }: HighlighBlockProps, ref?: ForwardedRef<Mesh>) => {
    return (
      <Block
        side={FrontSide}
        ref={ref}
        name={name}
        position={[0, 0, 0]}
        opacity={0.1}
        edgesColor="green"
      />
    );
  }
);
