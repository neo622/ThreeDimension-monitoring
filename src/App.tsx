import React, { useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { ServerView } from "./components/ServerView";
import { InfoLight } from "./components/infoLight";
// import { Experience } from "./components/Rack";

function App() {
  const [mode, setMode] = useState<any>("norm");
  const [lights, setLights] = useState<any>([]); // rack 정보에 추가로 light 정보 받을 예정

  const getLightsPosition = (position?: any) => {
    setLights(position);
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
      <Canvas>
        <ServerView mode={mode} setLightsPos={getLightsPosition} />
      </Canvas>

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
      <InfoLight positionX={lights[0]} positionY={lights[1]} warning={false} />
    </div>
  );
}

export default App;
