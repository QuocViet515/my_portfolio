import React from 'react';
import { AnimatePresence } from 'framer-motion';
import LockScreen from './components/LockScreen';
import PersonalInfo from './components/PersonalInfo';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import MatrixBackground from './components/MatrixBackground';
import { useDepthScroll } from './hooks/useDepthScroll';

function App() {
  const { depth, isUnlocked, setIsUnlocked } = useDepthScroll();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <MatrixBackground />
      
      <AnimatePresence>
        {!isUnlocked && (
          <LockScreen 
            isUnlocked={isUnlocked} 
            onUnlock={() => setIsUnlocked(true)} 
          />
        )}
      </AnimatePresence>

      {isUnlocked && (
        <div className="relative">
          {/* Depth indicator */}
          <div className="fixed top-4 right-4 z-50 bg-gray-800/80 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-3">
            <div className="font-mono text-xs text-cyan-400">
              DEPTH: {depth.toFixed(1)}
            </div>
            <div className="w-32 bg-gray-700 rounded-full h-1 mt-2">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-green-400 h-1 rounded-full transition-all duration-300"
                style={{ width: `${(depth / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Navigation hints */}
          <div className="fixed bottom-4 left-4 z-50 bg-gray-800/80 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-3">
            <div className="font-mono text-xs text-gray-400">
              Scroll: Dive deeper | ↑↓: Navigate
            </div>
          </div>

          {/* Content layers */}
          <div className="relative perspective-1000">
            <div 
              className="absolute inset-0 transition-transform duration-500 ease-out"
              style={{ transform: `translateZ(${-depth * 40}px)` }}
            >
              <div className="min-h-screen flex items-center justify-center">
                <PersonalInfo depth={depth} />
              </div>
            </div>

            <div 
              className="absolute inset-0 transition-transform duration-500 ease-out"
              style={{ transform: `translateZ(${-(depth - 1) * 40}px)` }}
            >
              <div className="min-h-screen flex items-center justify-center">
                <Skills depth={depth} />
              </div>
            </div>

            <div 
              className="absolute inset-0 transition-transform duration-500 ease-out"
              style={{ transform: `translateZ(${-(depth - 2) * 40}px)` }}
            >
              <div className="min-h-screen flex items-center justify-center">
                <Projects depth={depth} />
              </div>
            </div>

            <div 
              className="absolute inset-0 transition-transform duration-500 ease-out"
              style={{ transform: `translateZ(${-(depth - 3) * 40}px)` }}
            >
              <Contact depth={depth} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;