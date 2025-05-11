import React from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

interface AboutBackgroundProps {
  position: "left" | "right";
}

// Simple 3D background component with minimal complexity
const AboutBackground = ({ position = "right" }: AboutBackgroundProps) => {
  return (
    <Canvas 
      dpr={[1, 1.5]} // Limit pixel ratio for better performance
      frameloop="demand" // Only render when needed
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Float
        speed={1.5}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <mesh position={position === "right" ? [0, 0, 0] : [0, 0, 0]} rotation={position === "right" ? [0, 0, 0] : [0.5, 0.5, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={position === "right" ? "#1a6af9" : "#25a085"} opacity={0.8} transparent />
        </mesh>
      </Float>
    </Canvas>
  );
};

export default AboutBackground; 