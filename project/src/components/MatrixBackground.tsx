import React from 'react';
import { motion } from 'framer-motion';

export default function MatrixBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      
      {/* Matrix rain */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 font-mono text-sm"
            style={{ 
              left: `${(i * 3.33) % 100}%`,
              top: '-10vh'
            }}
            animate={{
              y: ['0vh', '110vh'],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear'
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j} className="block">
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Cybersec grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        />
      ))}
    </div>
  );
}