import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { ServerView } from "./components/ServerView";
// import { Experience } from "./components/Rack";

function App() {
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
      <Canvas>
        {/* <Experience /> */}
        <ServerView />
      </Canvas>
    </div>
  );
}

export default App;
