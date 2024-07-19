import React from "react";

export function Lights() {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[-2, 1, 0]} color={"white"} castShadow />
    </>
  );
}
