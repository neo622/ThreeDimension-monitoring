import React, { useState, useEffect } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { ServerView } from "./components/ServerView";
import { InfoLight } from "./components/infoLight";
import { RackTypeList } from "./components/RackTypeList";
import axios from "axios";
import { Vector3 } from "three";

// import { Experience } from "./components/Rack";

function App() {
  const [mode, setMode] = useState<any>("norm");
  const [lights, setLights] = useState<any>([]); // rack 정보에 추가로 light 정보 받을 예정
  const [rack_data, setRack_data] = useState<any>([]);

  const getLightsPosition = (position?: any) => {
    setLights(position);
  };

  const fetchRackData = async () => {
    const rackRes = await axios.get("http://127.0.0.1:5000/racks");
    let rackInfo: any = [];
    for (let i = 0; i < rackRes.data.length; i++) {
      let eachRack: any = {};
      eachRack["rack_id"] = rackRes.data[i].rack_id;
      eachRack["name"] = `block-${rackRes.data[i].rack_id}`;
      eachRack["position"] = new Vector3(
        rackRes.data[i].position.x,
        rackRes.data[i].position.y,
        rackRes.data[i].position.z
      );
      eachRack["onClick"] = () => {
        onClickRack(rackRes.data[i].rack_id);
      };
      rackInfo.push(eachRack);
    }
    setRack_data(rackInfo);
  };

  const clickMode = () => {
    if (mode === "norm") {
      setMode("edit");
      console.log(lights);
    } else {
      setMode("norm");
      console.log(lights);
    }
  };

  const onClickRack = (param: any) => {
    console.log("과연??", param);
  };

  const onClickRackType = (type: string) => {
    console.log(type);
  };

  useEffect(() => {
    fetchRackData();
  }, []);

  return (
    <div
      className="App"
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        marginRight: "auto",
      }}
    >
      <div>
        <button
          style={{ backgroundColor: "blue", marginLeft: "50px" }}
          onClick={() => clickMode()}
        >
          {mode} Mode
        </button>
      </div>
      <div
        style={{
          position: "absolute",
          left: "1vw",
          top: "1vh",
          color: "white",
        }}
      >
        Press esc key for cancel editing mode.
      </div>
      <Canvas>
        <ServerView
          rackData={rack_data}
          mode={mode}
          setLightsPos={getLightsPosition}
        />
      </Canvas>
      <div
        style={{
          position: "absolute",
          display: "flex",
          left: "1vw",
          bottom: "1vh",
          background: "black",
          width: "20vw",
          height: "20vh",
          gap: "5px",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7px",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontSize: "23px",
            fontWeight: "bold",
            background: "linear-gradient(to bottom, gray, #000000)",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            color: "white",
            borderRadius: "7px",
          }}
        >
          ADD
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
            gap: "5px",
          }}
        >
          {["Half_Rack", "Full_Rack"].map((type: any) => (
            <RackTypeList rackType={type} onClickRackType={onClickRackType} />
          ))}
        </div>
      </div>

      <div
        style={{
          backgroundColor: "grey",
          width: "200px",
          height: "80vh",
          marginRight: "50px",
        }}
      >
        Table
      </div>
      {/* map으로 render 필요 (main page에서) */}
      {/* <InfoLight positionX={lights[0]} positionY={lights[1]} warning={false} /> */}
    </div>
  );
}

export default App;
