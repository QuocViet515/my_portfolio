import React, { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import LockScreen from './components/LockScreen';
import PersonalInfo from './components/PersonalInfo';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import MatrixBackground from './components/MatrixBackground';
import { useDepthScroll } from './hooks/useDepthScroll';
import Section from './components/Section';

function isTouchDevice() {
  return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
}

function App() {
  const { depth, setDepth, isUnlocked, setIsUnlocked } = useDepthScroll();
  const isTouch = isTouchDevice();

  const panels = [
    <PersonalInfo depth={depth} key="personal" />,
    <Skills depth={depth} key="skills" />,
    <Projects depth={depth} key="projects" />,
    <Contact depth={depth} key="contact" />,
  ];

  const active = useMemo(() => Math.round(depth), [depth]);
  const clamp = (v: number) => Math.max(0, Math.min(3, v)); // 4 panels: 0..3

  // Desktop: hiệu ứng depth
  const FOCUS_SHIFT = 0.3;
  const DIST_PER_STEP = 40;
  const panelStyle = (index: number) => ({
    transform: `translateZ(${-(depth + FOCUS_SHIFT - index) * DIST_PER_STEP}px)`,
    pointerEvents: active === index ? 'auto' : 'none',
  });

  const goNext = () => setDepth(d => Math.min(3, Math.round(d) + 1));
  const goPrev = () => setDepth(d => Math.max(0, Math.round(d) - 1));

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <MatrixBackground />
      <AnimatePresence>
        {!isUnlocked && (
          <LockScreen isUnlocked={isUnlocked} onUnlock={() => setIsUnlocked(true)} />
        )}
      </AnimatePresence>

      {isUnlocked && (
        <div className="relative">
          {/* Depth indicator */}
          <div className="fixed top-4 right-4 z-50 bg-gray-800/80 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-3">
            <div className="font-mono text-xs text-cyan-400">DEPTH: {depth.toFixed(1)}</div>
            <div className="w-32 bg-gray-700 rounded-full h-1 mt-2">
              <div
                className="bg-gradient-to-r from-cyan-400 to-green-400 h-1 rounded-full transition-all duration-300"
                style={{ width: `${(clamp(Math.round(depth)) / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Mobile: chỉ render panel hiện tại, không hiệu ứng depth */}
          {isTouch ? (
            <Section onNext={goNext} onPrev={goPrev} enabled={true} isMobile>
              <div className="min-h-screen flex items-center justify-center">
                {panels[active]}
              </div>
            </Section>
          ) : (
            // Desktop: hiệu ứng depth như cũ
            <div className="relative perspective-1000">
              {panels.map((Panel, idx) => (
                <div
                  key={idx}
                  className="absolute inset-0 transition-transform duration-500 ease-out"
                  style={panelStyle(idx)}
                >
                  <Section onNext={goNext} onPrev={goPrev} enabled={active === idx}>
                    <div className="min-h-screen flex items-center justify-center">
                      {Panel}
                    </div>
                  </Section>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
