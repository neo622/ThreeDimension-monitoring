import React from "react";

export function Lights() {
  return (
    <>
      <ambientLight intensity={1.0} color={"0xffffff"} />
      <directionalLight position={[0, 0, 1]} color={"white"} />
    </>
  );
}
