import React from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

// Simple 3D icon component with minimal complexity
const PortfolioIcon = () => {
  return (
    <Canvas 
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.5]} // Limit pixel ratio for better performance
      frameloop="demand" // Only render when needed
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Float
        speed={1.5}
        rotationIntensity={1}
        floatIntensity={0.5}
      >
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#1a6af9" />
        </mesh>
      </Float>
    </Canvas>
  );
};

export default PortfolioIcon; 