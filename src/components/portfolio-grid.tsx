import React, { useState, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Card, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Chip, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

// Lazy load 3D components
const PortfolioIcon = lazy(() => import("./PortfolioIcon"));

interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Eco Fashion Brand Identity",
    category: "Branding",
    imageUrl: "https://img.heroui.chat/image/ai?w=600&h=400&u=2",
    description: "Complete brand identity design for a sustainable fashion company, including logo design, color palette development, typography selection, and comprehensive brand guidelines to ensure consistent application across all touchpoints.",
    tags: ["Logo Design", "Brand Guidelines", "Sustainability"]
  },
  {
    id: 2,
    title: "Wellness App UI Design",
    category: "UI Design",
    imageUrl: "https://img.heroui.chat/image/ai?w=600&h=400&u=3",
    description: "User interface design for a wellness tracking mobile application with a focus on accessibility and user experience. The project included user research, wireframing, prototyping, and final UI design with a comprehensive component library.",
    tags: ["Mobile App", "UI/UX", "Prototyping"]
  },
  {
    id: 3,
    title: "Summer Collection Campaign",
    category: "Marketing",
    imageUrl: "https://img.heroui.chat/image/ai?w=600&h=400&u=4",
    description: "Digital marketing campaign assets including social media graphics, email templates, and landing page design for a fashion brand's summer collection launch, resulting in a 40% increase in online engagement.",
    tags: ["Social Media", "Email Design", "Campaign"]
  },
  {
    id: 4,
    title: "Tech Startup Website Redesign",
    category: "Web Design",
    imageUrl: "https://img.heroui.chat/image/ai?w=600&h=400&u=5",
    description: "Complete website redesign for a tech startup, focusing on modern aesthetics and improved user flow. The project included information architecture, wireframing, visual design, and collaboration with developers for implementation.",
    tags: ["Web Design", "UX Design", "Responsive"]
  },
  {
    id: 5,
    title: "Organic Skincare Packaging",
    category: "Packaging",
    imageUrl: "https://img.heroui.chat/image/ai?w=600&h=400&u=6",
    description: "Sustainable packaging design for an organic skincare line, incorporating eco-friendly materials and elegant typography. The design focused on communicating the brand's natural ingredients and environmental commitment.",
    tags: ["Packaging", "Sustainability", "Print Design"]
  },
  {
    id: 6,
    title: "Fashion Magazine Layout",
    category: "Print",
    imageUrl: "https://img.heroui.chat/image/ai?w=600&h=400&u=7",
    description: "Magazine layout and editorial design for a quarterly fashion publication, featuring custom typography and photo editing. The project included cover design, feature spreads, and establishing a cohesive visual language throughout.",
    tags: ["Editorial", "Typography", "Layout"]
  }
];

const categories = ["All", "Branding", "UI Design", "Marketing", "Web Design", "Packaging", "Print"];

// Simplified background with fewer elements
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <div className="absolute w-full h-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary-300 dark:border-primary-700"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const PortfolioGrid = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    onOpen();
  };

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Optimized animation variants with reduced complexity
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "tween",
        duration: 0.4
      }
    }
  };

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className="py-24 px-4 bg-gradient-to-b from-background to-default-50 dark:from-background dark:to-default-900/20 relative overflow-hidden"
    >
      {/* Simplified background pattern */}
      <AnimatedBackground />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 relative"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <div className="relative w-5 h-5">
              <Icon icon="lucide:briefcase" className="text-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" />
              <div className="absolute inset-0 bg-primary-200 dark:bg-primary-800 rounded-full animate-ping opacity-75"></div>
            </div>
            <span>Portfolio</span>
          </div>
          <motion.h2 
            className="text-4xl font-bold font-heading mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-xl text-default-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore a selection of my recent work across various design disciplines
          </motion.p>
        </motion.div>

        {/* Category Filter - simplified animations */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "solid" : "flat"}
              color={activeCategory === category ? "primary" : "default"}
              radius="full"
              size="sm"
              className="font-medium"
              onPress={() => setActiveCategory(category)}
              startContent={activeCategory === category ? <Icon icon="lucide:check" /> : null}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid - with optimized rendering */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.9 }}
                className="h-full"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card
                  isPressable
                  onPress={() => handleProjectClick(project)}
                  className="overflow-hidden h-full transform-gpu transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary-500/10"
                >
                  <div className="relative overflow-hidden aspect-[4/3] group">
                    <Image
                      removeWrapper
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={project.imageUrl}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white font-medium">{project.title}</p>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Chip
                        size="sm"
                        color="primary"
                        variant="flat"
                        className="font-medium"
                        aria-label={`Category: ${project.category}`}
                      >
                        {project.category}
                      </Chip>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-default-500 line-clamp-2 mb-4">
                      {project.description.substring(0, 100)}...
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag, index) => (
                        <Chip key={index} size="sm" variant="flat" className="text-xs" aria-label={`Tag: ${tag}`}>
                          {tag}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal - simplified animations */}
      <Modal 
        size="3xl" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.2 }
            },
            exit: {
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.1 }
            }
          }
        }}
      >
        <ModalContent>
          {(onClose) => selectedProject && (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                <p className="text-default-500 text-sm">{selectedProject.category}</p>
              </ModalHeader>
              <ModalBody>
                <Image
                  removeWrapper
                  alt={selectedProject.title}
                  className="w-full aspect-[16/9] object-cover rounded-lg mb-4"
                  src={selectedProject.imageUrl}
                />
                <div className="flex flex-wrap gap-1 mb-4">
                  {selectedProject.tags.map((tag, index) => (
                    <Chip key={index} color="primary" variant="flat" className="text-xs" aria-label={`Tag: ${tag}`}>
                      {tag}
                    </Chip>
                  ))}
                </div>
                <Divider className="my-4" />
                <div>
                  <h4 className="text-lg font-semibold mb-2">Project Overview</h4>
                  <p className="text-default-600">
                    {selectedProject.description}
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => console.log("View case study")}>
                  View Case Study
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};