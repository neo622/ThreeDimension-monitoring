import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { ServerView } from "./components/ServerView";
// import { Experience } from "./components/Rack";

function App() {
  const [mode, setMode] = useState<any>("norm");
  const clickMode = () => {
    if (mode === "norm") {
      setMode("edit");
    } else {
      setMode("norm");
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
        {/* <Experience /> */}
        <ServerView mode={mode} />
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
    </div>
  );
}

export default App;
