import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Shield, Zap, Eye } from 'lucide-react';

interface ProjectsProps {
  depth: number;
}

const projects = [
  {
    id: 1,
    title: "SecureVault",
    description: "Hệ thống quản lý mật khẩu enterprise với mã hóa AES-256",
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis"],
    icon: Shield,
    github: "#",
    demo: "#"
  },
  {
    id: 2,
    title: "ThreatHunter",
    description: "AI-powered threat detection system cho network monitoring",
    tech: ["Machine Learning", "Wireshark", "ELK Stack"],
    icon: Eye,
    github: "#",
    demo: "#"
  },
  {
    id: 3,
    title: "PenTest Framework",
    description: "Automated penetration testing toolkit cho web applications",
    tech: ["Python", "Burp Suite API", "Docker"],
    icon: Zap,
    github: "#",
    demo: "#"
  }
];

function isMobileDevice() {
  return typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
}

export default function Projects({ depth }: ProjectsProps) {
  const isMobile = isMobileDevice();
  const isVisible = isMobile ? true : (depth >= 1.8 && depth < 2.8);

  return (
    <motion.div
      className="relative z-30 text-center"
      style={{
        transform: isMobile ? undefined : `scale(${1 + (depth - 2) * 0.1}) translateZ(${(depth - 2) * 100}px)`,
        opacity: isMobile ? 1 : (isVisible ? Math.max(0, 1 - Math.abs(depth - 2.3) * 2) : 0)
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          className="text-3xl md:text-5xl font-mono font-bold text-cyan-400 mb-12"
        >
          [CLASSIFIED PROJECTS]
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateX: -30 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                y: isVisible ? 0 : 50,
                rotateX: isVisible ? 0 : -30
              }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.8,
                type: "spring"
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateX: 5,
                boxShadow: "0 20px 40px rgba(0, 217, 255, 0.3)"
              }}
              className="group bg-gray-800/60 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-6 hover:border-green-400/60 transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 15 }}
                className="mx-auto w-16 h-16 mb-6 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-lg flex items-center justify-center"
              >
                <project.icon className="w-8 h-8 text-cyan-400 group-hover:text-green-400 transition-colors duration-300" />
              </motion.div>

              <h3 className="font-mono text-xl text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                {project.title}
              </h3>

              <p className="font-mono text-sm text-gray-400 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-full text-xs font-mono text-gray-300 group-hover:text-cyan-400 group-hover:border-cyan-400/50 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex justify-center gap-4">
                <motion.a
                  href={project.github}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-cyan-400/20 border border-gray-600 hover:border-cyan-400 rounded-lg font-mono text-xs text-gray-300 hover:text-cyan-400 transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                  CODE
                </motion.a>
                <motion.a
                  href={project.demo}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-400/20 hover:bg-green-400/30 border border-green-400/50 hover:border-green-400 rounded-lg font-mono text-xs text-green-400 hover:text-green-300 transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  DEMO
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}