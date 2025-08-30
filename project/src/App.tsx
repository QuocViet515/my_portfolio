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

function App() {
  const { depth, setDepth, isUnlocked, setIsUnlocked } = useDepthScroll();

  // ====== Focus tuning ======
  // Khi depth ~ 2.7 -> panel tiếp theo (index 3) rõ nhất
  const FOCUS_SHIFT = 0.3;         // 3 - 2.7 = 0.3 (dịch tiêu điểm lên trước 0.3)
  const DIST_PER_STEP = 40;        // khoảng cách giữa các lớp

  const active = useMemo(() => Math.round(depth), [depth]);
  const clamp = (v: number) => Math.max(0, Math.min(3, v)); // 4 panels: 0..3

  // Tính translateZ dựa trên (depth + FOCUS_SHIFT - index)
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


          {/* Layers */}
          <div className="relative perspective-1000">
            {/* 0 - PersonalInfo */}
            <div className="absolute inset-0 transition-transform duration-500 ease-out"
                 style={panelStyle(0)}>
              <Section onNext={goNext} onPrev={goPrev} enabled={active === 0}>
                <div className="min-h-screen flex items-center justify-center">
                  <PersonalInfo depth={depth} />
                </div>
              </Section>
            </div>

            {/* 1 - Skills */}
            <div className="absolute inset-0 transition-transform duration-500 ease-out"
                 style={panelStyle(1)}>
              <Section onNext={goNext} onPrev={goPrev} enabled={active === 1}>
                <div className="min-h-screen flex items-center justify-center">
                  <Skills depth={depth} />
                </div>
              </Section>
            </div>

            {/* 2 - Projects */}
            <div className="absolute inset-0 transition-transform duration-500 ease-out"
                 style={panelStyle(2)}>
              <Section onNext={goNext} onPrev={goPrev} enabled={active === 2}>
                <div className="min-h-screen flex items-center justify-center">
                  <Projects depth={depth} />
                </div>
              </Section>
            </div>

            {/* 3 - Contact */}
            <div className="absolute inset-0 transition-transform duration-500 ease-out"
                 style={panelStyle(3)}>
              <Section onNext={goNext} onPrev={goPrev} enabled={active === 3}>
                <div className="min-h-screen flex items-center justify-center">
                  <Contact depth={depth} />
                </div>
              </Section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
