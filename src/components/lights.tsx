import React from "react";

export function Lights() {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 1]} color={"white"} castShadow />
    </>
  );
}
