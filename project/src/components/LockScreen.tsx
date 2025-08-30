import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, ChevronDown } from 'lucide-react';

interface LockScreenProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export default function LockScreen({ isUnlocked, onUnlock }: LockScreenProps) {
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlock = () => {
    if (isUnlocking) return; // tránh double-click
    setIsUnlocking(true);
    setTimeout(() => {
      onUnlock(); // parent sẽ set isUnlocked = true -> chuyển sang overlay "ACCESS GRANTED"
    }, 1500);
  };

  if (isUnlocked) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
        style={{ pointerEvents: 'none' }}
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-cyan-400 font-mono text-lg mb-4"
          >
            ACCESS GRANTED
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-green-400 font-mono text-sm mb-8"
          >
            Scroll để đi sâu vào bên trong
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown className="text-cyan-400 w-8 h-8 mx-auto" />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />

      {/* Matrix rain effect */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 font-mono text-xs"
            style={{ left: `${Math.random() * 100}%` }}
            animate={{ y: ['-10vh', '110vh'], opacity: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {Math.random().toString(36).substring(2, 15)}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <motion.div
          whileHover={!isUnlocking ? { scale: 1.1 } : undefined}
          whileTap={!isUnlocking ? { scale: 0.9 } : undefined}
          onClick={handleUnlock}
          className={`cursor-pointer group ${isUnlocking ? 'cursor-wait' : ''}`}
        >
          <motion.div
            className="relative rounded-full p-6"
            animate={
              isUnlocking
                ? {
                    boxShadow: [
                      '0 0 20px #22c55e',
                      '0 0 40px #22c55e',
                      '0 0 20px #22c55e',
                    ],
                  }
                : {
                    boxShadow: ['0 0 20px #00D9FF', '0 0 40px #00D9FF', '0 0 20px #00D9FF'],
                  }
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div
              className={`relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-2 
              ${isUnlocking ? 'border-green-400 shadow-2xl shadow-green-500/40' : 'border-slate-600'}`}
            >
              <div className="p-8">
                {isUnlocking ? (
                  <Unlock className="w-24 h-24 text-green-400 animate-pulse" />
                ) : (
                  <Lock className="w-24 h-24 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Text under button */}
        {!isUnlocking ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <div className="text-cyan-400 font-mono text-xl mb-2">SECURITY SYSTEM</div>
            <div className="text-gray-400 font-mono text-sm">Click to authenticate</div>
          </motion.div>
        ) : (
          <div className="mt-8 space-y-3">
            <div className="w-64 bg-slate-700 rounded-full h-2 mx-auto overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full"
                style={{ width: '100%', animation: 'loadProgress 1.5s ease-out forwards' }}
              />
            </div>
            <p className="text-blue-300 text-sm font-mono animate-pulse">Đang xác thực...</p>
          </div>
        )}
      </motion.div>

      <style>{`
        @keyframes loadProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
