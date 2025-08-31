import React from "react";
import { motion } from "framer-motion";
import { Code2, Database, Shield, Network } from "lucide-react";

interface SkillsProps {
  depth: number; // khoảng lớp thứ 2 ~ depth ~ 1.x
}

const techCategories = [
  {
    icon: Shield,
    title: "Security Tools",
    techs: ["Nmap", "Wireshark", "Metasploit", "Burp Suite", "Kali Linux"],
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Code2,
    title: "Programming",
    techs: ["Python", "JavaScript", "C++", "Java", "React", "Node"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Database,
    title: "Databases",
    techs: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Network,
    title: "Network Security",
    techs: ["Firewall Config", "VPN Setup", "IDS/IPS", "Network Analysis"],
    color: "from-purple-500 to-indigo-500",
  },
];

function isMobileDevice() {
  return typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
}

export default function Skills({ depth }: SkillsProps) {
  const isMobile = isMobileDevice();

  // Nếu là mobile, luôn hiển thị rõ, không hiệu ứng động theo depth
  const isVisible = isMobile ? true : depth >= 0.8 && depth < 1.8;

  const fgScale = isMobile ? 1 : 1 + (depth - 1) * 0.1;
  const fgTranslateZ = isMobile ? 0 : (depth - 1) * 100;
  const fgOpacity = isMobile ? 1 : isVisible ? Math.max(0, 1 - Math.abs(depth - 1.3) * 2) : 0;

  const bgTransform = isMobile ? undefined : `translateY(${depth * 150}px) rotateX(${depth * 5}deg)`;
  const bgConic = isMobile
    ? `conic-gradient(from 0deg, rgba(59,130,246,0.3), rgba(16,185,129,0.3), rgba(239,68,68,0.3))`
    : `conic-gradient(from ${depth * 180}deg, rgba(59,130,246,0.3), rgba(16,185,129,0.3), rgba(239,68,68,0.3))`;

  const headerOpacity = isMobile ? 1 : Math.max(0, 1 - depth * 0.2);
  const headerRotateX = isMobile ? 0 : depth * 10;
  const headerY = isMobile ? 0 : -depth * 40;

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center relative px-4"
      style={{
        // giữ hiệu ứng xuyên lớp như Skills cũ
        scale: fgScale,
        // Framer không có translateZ trực tiếp -> dùng transform string riêng, không animate trên phần tử này
        transform: `translateZ(${fgTranslateZ}px)`,
        opacity: fgOpacity,
      }}
    >
      {/* Deep parallax background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          transform: bgTransform,
          background: bgConic,
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? headerOpacity : 0 }}
          transition={{ duration: 0.8 }}
          style={{
            y: headerY,
            rotateX: headerRotateX,
            transformPerspective: 1000,
          }}
        >
          <Code2 className="w-16 h-16 mx-auto mb-6 text-cyan-400" />
          <h2 className="text-4xl font-bold text-white mb-4">Công nghệ &amp; Kỹ năng</h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Chuyên sâu về các công cụ và ngôn ngữ lập trình trong lĩnh vực an toàn thông tin
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.title}
              // Entrance animation: giống style của Skills cũ (rotateY + slide)
              initial={{ opacity: 0, rotateY: -45 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                rotateY: isVisible ? 0 : -45,
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -4, scale: 1.03, rotateY: 6 }}
              className="group bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-slate-500 transition-all duration-500"
              style={{
                // Parallax theo từng card (so le trái/phải, tiến sát theo độ sâu)
                y: isMobile ? 0 : -depth * (20 + index * 10),
                x: isMobile ? 0 : depth * (index % 2 === 0 ? -20 : 20),
                scale: isMobile ? 1 : 1 - depth * 0.05,
                opacity: isMobile ? 1 : Math.max(0, 1 - depth * 0.3),
              }}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color} mr-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm border border-slate-600 hover:border-blue-500 hover:text-blue-300 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
