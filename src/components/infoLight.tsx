import React from "react";

interface infoLightProps {
  positionX: string;
  positionY: string;
  warning: boolean;
}

export function InfoLight({ positionX, positionY, warning }: infoLightProps) {
  console.log(positionX, positionY);
  return (
    <>
      {positionX && (
        <div
          style={{
            position: "absolute",
            left: positionX,
            top: positionY,
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        >
          Warn!
        </div>
      )}
    </>
  );
}
