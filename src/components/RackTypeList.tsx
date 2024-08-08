import React from "react";

interface RackTypeListProps {
  rackType: string;
  onClickRackType: any;
}

export const RackTypeList = ({
  rackType,
  onClickRackType,
}: RackTypeListProps) => {
  return (
    <div
      onClick={() => onClickRackType(rackType)}
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        height: "90%",
        color: "#fff",
      }}
    >
      {rackType}
    </div>
  );
};
