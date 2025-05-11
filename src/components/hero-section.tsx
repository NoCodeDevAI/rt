import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button, Image } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

// 3D background component with more elements
const FloatingShapes = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
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
      <Float
        speed={2.2}
        rotationIntensity={1.5}
        floatIntensity={1.5}
      >
        <mesh position={[0, -2, 0]}>
          <dodecahedronGeometry args={[1]} />
          <meshStandardMaterial color="#4f85b3" wireframe opacity={0.6} transparent />
        </mesh>
      </Float>
      
      {/* Additional 3D elements */}
      <Float
        speed={3}
        rotationIntensity={2}
        floatIntensity={2}
      >
        <mesh position={[-2, 2, -1]}>
          <tetrahedronGeometry args={[0.8]} />
          <meshStandardMaterial color="#E4405F" wireframe opacity={0.5} transparent />
        </mesh>
      </Float>
      
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
      
      {/* Animated sphere with distortion */}
      <Float
        speed={1.5}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <Sphere visible position={[0, 0, -5]} args={[1, 16, 16]}>
          <MeshDistortMaterial
            color="#EA4C89"
            attach="material"
            distort={0.5}
            speed={2}
            roughness={0.2}
            opacity={0.6}
            transparent
          />
        </Sphere>
      </Float>
    </>
  );
};

// Social links component
const SocialLinks = () => {
  return (
    <div className="flex gap-4 mt-6">
      <motion.a
        href="#"
        className="w-10 h-10 rounded-full bg-default-100 dark:bg-blue-900 flex items-center justify-center text-default-600 hover:text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon icon="lucide:linkedin" />
      </motion.a>
      <motion.a
        href="#"
        className="w-10 h-10 rounded-full bg-default-100 dark:bg-blue-900 flex items-center justify-center text-default-600 hover:text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
        whileHover={{ scale: 1.1, rotate: -10 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon icon="lucide:twitter" />
      </motion.a>
      <motion.a
        href="#"
        className="w-10 h-10 rounded-full bg-default-100 dark:bg-blue-900 flex items-center justify-center text-default-600 hover:text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon icon="lucide:dribbble" />
      </motion.a>
      <motion.a
        href="#"
        className="w-10 h-10 rounded-full bg-default-100 dark:bg-blue-900 flex items-center justify-center text-default-600 hover:text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
        whileHover={{ scale: 1.1, rotate: -10 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon icon="lucide:instagram" />
      </motion.a>
    </div>
  );
};

// Animated particles background
const ParticlesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary-200 dark:bg-primary-800"
          style={{
            width: Math.random() * 20 + 5,
            height: Math.random() * 20 + 5,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

export const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center pt-24 pb-20 px-4 relative overflow-hidden">
      {/* Particles background */}
      <ParticlesBackground />
      
      {/* 3D background */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          <FloatingShapes />
        </Canvas>
      </div>
      
      {/* Background gradient */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary-500/10 to-transparent dark:from-primary-900/20" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-accent-500/10 to-transparent dark:from-accent-900/20" />
      
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 max-w-xl relative"
          style={{ y, opacity }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Icon icon="lucide:sparkles" className="text-lg" />
            <span>Graphic Designer & UI/UX Expert</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent dark:from-primary-400 dark:to-accent-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Rahul Tiwari
          </motion.h1>
          
          <motion.p 
            className="text-xl text-default-600 max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            I craft beautiful digital experiences that connect brands with their audience through thoughtful design and creative solutions.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button
              color="primary"
              size="lg"
              endContent={<Icon icon="lucide:arrow-right" />}
              onPress={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              className="font-medium text-blue-900 bg-blue-100 dark:bg-transparent dark:text-blue-100"
            >
              View My Work
            </Button>
            <Button
              variant="bordered"
              size="lg"
              onPress={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="font-medium"
            >
              Get in Touch
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <SocialLinks />
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto lg:ml-auto"
          style={{ opacity }}
        >
          {/* Profile image with decorative elements */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
            {/* Main profile image */}
            <motion.div 
              className="absolute inset-0 rounded-full overflow-hidden border-4 border-white dark:border-default-800 shadow-xl"
              animate={{ 
                boxShadow: [
                  "0 10px 25px rgba(0, 0, 0, 0.1)",
                  "0 20px 35px rgba(0, 0, 0, 0.2)",
                  "0 10px 25px rgba(0, 0, 0, 0.1)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Image
                src="src/assets/hero.png"
                alt="Rahul Tiwari"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Decorative circle */}
            <motion.div 
              className="absolute inset-[-20px] border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Decorative elements */}
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: -10 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 2, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-accent-500 text-white p-4 rounded-full shadow-lg"
            >
              <Icon icon="lucide:palette" className="text-xl" />
            </motion.div>
            
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 10 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 2.5, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-primary-500 text-white p-4 rounded-full shadow-lg"
            >
              <Icon icon="lucide:code" className="text-xl" />
            </motion.div>
            
            {/* Additional floating elements */}
            <motion.div
              initial={{ x: 10 }}
              animate={{ x: -10 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 3, ease: "easeInOut" }}
              className="absolute -top-8 left-8 bg-blue-500 text-white p-3 rounded-full shadow-lg"
            >
              <Icon icon="lucide:figma" className="text-lg" />
            </motion.div>
            
            <motion.div
              initial={{ x: -10 }}
              animate={{ x: 10 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 3.5, ease: "easeInOut" }}
              className="absolute -bottom-8 right-8 bg-purple-500 text-white p-3 rounded-full shadow-lg"
            >
              <Icon icon="lucide:layers" className="text-lg" />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <p className="text-sm text-default-500 mb-2">Scroll to explore</p>
        <Icon icon="lucide:chevron-down" className="text-xl text-default-500" />
      </motion.div>
    </section>
  );
};