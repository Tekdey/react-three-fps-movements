import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Character from "./Character";

export default function App() {
  return (
    <Canvas className="canvas1">
      <Suspense fallback={null}>
        <Character />
      </Suspense>
    </Canvas>
  );
}
