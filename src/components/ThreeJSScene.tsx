import React from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";

// Simplified 3D background component with fewer elements
const FloatingShapes = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Reduced number of shapes for better performance */}
      <Float
        speed={2.5}
        rotationIntensity={1}
        floatIntensity={2}
      >
        <mesh position={[-3, 0, -2]}>
          <octahedronGeometry args={[1.2]} />
          <meshStandardMaterial color="#1a6af9" wireframe opacity={0.6} transparent />
        </mesh>
      </Float>
      
      <Float
        speed={1.8}
        rotationIntensity={2}
        floatIntensity={1}
      >
        <mesh position={[3, 1, -3]}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <meshStandardMaterial color="#25a085" wireframe opacity={0.6} transparent />
        </mesh>
      </Float>
      
      {/* Only keep one additional shape for performance */}
      <Float
        speed={2}
        rotationIntensity={1}
        floatIntensity={1}
      >
        <mesh position={[2, -1, -2]}>
          <icosahedronGeometry args={[0.7]} />
          <meshStandardMaterial color="#1DA1F2" wireframe opacity={0.5} transparent />
        </mesh>
      </Float>
    </>
  );
};

// Optimized ThreeJS scene with reduced complexity
const ThreeJSScene = () => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 8] }}
      dpr={[1, 2]} // Limit pixel ratio for better performance
      frameloop="demand" // Only render when needed
      performance={{ min: 0.5 }} // Allow performance scaling
    >
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5}
        enableDamping={false} // Disable damping for better performance
      />
      <FloatingShapes />
    </Canvas>
  );
};

export default ThreeJSScene; 