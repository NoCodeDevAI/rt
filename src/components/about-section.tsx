import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button, Card, Progress, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshWobbleMaterial, MeshDistortMaterial } from "@react-three/drei";

interface Skill {
  name: string;
  level: number;
  icon: string;
}

const skills: Skill[] = [
  { name: "Adobe Creative Suite", level: 95, icon: "simple-icons:adobe" },
  { name: "Figma", level: 90, icon: "simple-icons:figma" },
  { name: "UI/UX Design", level: 85, icon: "lucide:layout" },
  { name: "Brand Identity", level: 90, icon: "lucide:palette" },
  { name: "Typography", level: 80, icon: "lucide:type" },
  { name: "Motion Design", level: 75, icon: "lucide:video" },
  { name: "Web Design", level: 85, icon: "lucide:globe" },
  { name: "Print Design", level: 80, icon: "lucide:printer" }
];

const experiences = [
  {
    title: "Senior Designer",
    company: "Creative Studio",
    period: "2020 - Present",
    description: "Lead designer for major brand projects, managing client relationships and mentoring junior designers."
  },
  {
    title: "UI Designer",
    company: "Tech Corp",
    period: "2018 - 2020",
    description: "Designed user interfaces for web and mobile applications, collaborating with product and development teams."
  },
  {
    title: "Freelance Designer",
    company: "Self-employed",
    period: "2016 - 2018",
    description: "Provided design services for various clients, specializing in branding and digital design."
  }
];

const education = [
  {
    degree: "Master of Arts in Design",
    school: "Design Institute",
    period: "2014 - 2016"
  },
  {
    degree: "Bachelor of Fine Arts",
    school: "State University",
    period: "2010 - 2014"
  }
];

// Enhanced 3D icon component
const SkillIcon = ({ position, color, rotation = [0, 0, 0] }: { position: [number, number, number]; color: string; rotation?: [number, number, number] }) => {
  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={1}
    >
      <mesh position={position} rotation={rotation}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshWobbleMaterial color={color} factor={0.3} speed={2} opacity={0.8} transparent />
      </mesh>
    </Float>
  );
};

// 3D text component - simplified version that doesn't require font files
const FloatingText = ({ text, position, color }: { text: string; position: [number, number, number]; color: string }) => {
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh position={position}>
        <boxGeometry args={[4, 1, 0.2]} />
        <MeshDistortMaterial color={color} speed={2} distort={0.2} radius={1} />
      </mesh>
    </Float>
  );
};

// Animated background
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary-100 dark:bg-primary-900/20"
          style={{
            width: Math.random() * 100 + 20,
            height: Math.random() * 100 + 20,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.2,
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            scale: [1, Math.random() * 0.3 + 0.8, 1],
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

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 px-4 bg-default-50 dark:bg-default-900/20 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <AnimatedBackground />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 w-40 h-40 opacity-20">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
          <SkillIcon position={[0, 0, 0]} color="#1a6af9" />
        </Canvas>
      </div>
      
      <div className="absolute left-0 bottom-0 w-40 h-40 opacity-20">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
          <SkillIcon position={[0, 0, 0]} color="#25a085" rotation={[0.5, 0.5, 0]} />
        </Canvas>
      </div>
      
      {/* 3D text in background */}
      <div className="absolute right-10 top-1/2 w-60 h-60 opacity-10 hidden lg:block">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
          <FloatingText text="About" position={[-1.5, 0, 0]} color="#4f85b3" />
        </Canvas>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="relative">
              <Icon icon="lucide:user" className="text-lg z-10 relative" />
              <motion.div 
                className="absolute inset-0 bg-primary-200 dark:bg-primary-800 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 0, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span>About Me</span>
          </motion.div>
          <motion.h2 
            className="text-4xl font-bold font-heading mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            My Background
          </motion.h2>
          <motion.p 
            className="text-xl text-default-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            I'm a passionate graphic designer with over 5 years of experience creating meaningful digital experiences that connect brands with their audience.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* About me text and image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
          >
            <Card className="p-6 overflow-hidden relative">
              <motion.div 
                className="absolute top-0 right-0 w-32 h-32 bg-primary-100 dark:bg-primary-900/20 rounded-bl-full -mt-8 -mr-8"
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />
              <h3 className="text-2xl font-semibold mb-4 relative z-10">My Approach</h3>
              <p className="text-default-600 mb-4">
                I believe that great design is about solving problems and creating meaningful connections. My approach combines aesthetic excellence with strategic thinking to deliver impactful solutions that resonate with audiences and achieve business goals.
              </p>
              <p className="text-default-600">
                Whether I'm designing a brand identity, a user interface, or marketing materials, I focus on creating work that is not only visually compelling but also purposeful and effective.
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <motion.div 
                  className="flex flex-col items-center p-4 bg-content2 rounded-lg"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.span 
                    className="text-3xl font-bold text-primary-600 dark:text-primary-400"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    5+
                  </motion.span>
                  <span className="text-default-600">Years Experience</span>
                </motion.div>
                <motion.div 
                  className="flex flex-col items-center p-4 bg-content2 rounded-lg"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.span 
                    className="text-3xl font-bold text-primary-600 dark:text-primary-400"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    50+
                  </motion.span>
                  <span className="text-default-600">Projects Completed</span>
                </motion.div>
              </div>
            </Card>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                color="primary"
                variant="flat"
                startContent={<Icon icon="lucide:download" />}
                onPress={() => console.log("Download resume")}
                className="w-full"
              >
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Tabs for Skills, Experience, Education */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            variants={containerVariants}
          >
            <Card className="p-6 shadow-lg">
              <Tabs aria-label="About me tabs" color="primary" variant="underlined" classNames={{
                tabList: "gap-6",
                cursor: "bg-primary-500",
                tab: "max-w-fit px-0 h-12"
              }}>
                <Tab 
                  key="skills" 
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:code" />
                      <span>Skills</span>
                    </div>
                  }
                >
                  <motion.div 
                    className="mt-4 space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {skills.map((skill, index) => (
                      <motion.div 
                        key={skill.name} 
                        className="space-y-2"
                        variants={itemVariants}
                        custom={index}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <Icon icon={skill.icon} className="text-primary-500" />
                            </motion.div>
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <span className="text-sm text-default-500">{skill.level}%</span>
                        </div>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                        >
                          <Progress 
                            value={skill.level} 
                            color="primary"
                            size="sm"
                            className="max-w-full"
                            showValueLabel={false}
                            aria-label={`${skill.name} skill level: ${skill.level}%`}
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </Tab>
                <Tab 
                  key="experience" 
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:briefcase" />
                      <span>Experience</span>
                    </div>
                  }
                >
                  <motion.div 
                    className="mt-4 space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {experiences.map((exp, index) => (
                      <motion.div 
                        key={index} 
                        className="relative pl-6 pb-6 border-l border-default-200 dark:border-default-700 last:border-0 last:pb-0"
                        variants={itemVariants}
                        custom={index}
                      >
                        <motion.div 
                          className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary-500"
                          whileHover={{ scale: 1.5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        />
                        <h4 className="text-lg font-semibold">{exp.title}</h4>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">{exp.company}</p>
                        <p className="text-default-500 text-sm mb-2">{exp.period}</p>
                        <p className="text-default-600">{exp.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </Tab>
                <Tab 
                  key="education" 
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:graduation-cap" />
                      <span>Education</span>
                    </div>
                  }
                >
                  <motion.div 
                    className="mt-4 space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {education.map((edu, index) => (
                      <motion.div 
                        key={index} 
                        className="relative pl-6 pb-6 border-l border-default-200 dark:border-default-700 last:border-0 last:pb-0"
                        variants={itemVariants}
                        custom={index}
                      >
                        <motion.div 
                          className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary-500"
                          whileHover={{ scale: 1.5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        />
                        <h4 className="text-lg font-semibold">{edu.degree}</h4>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">{edu.school}</p>
                        <p className="text-default-500 text-sm">{edu.period}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </Tab>
              </Tabs>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};