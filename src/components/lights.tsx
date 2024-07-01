import React from "react";

export function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 1, 0]} color={"white"} castShadow />
    </>
  );
}
