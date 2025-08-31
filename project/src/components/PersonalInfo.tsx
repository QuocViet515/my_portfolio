import React from "react";
import { motion } from "framer-motion";
import { User, MapPin, Mail, Calendar, Shield } from "lucide-react";

interface PersonalInfoProps
{
  depth: number; // 0 (near) -> 1+ (far)
}

export default function PersonalInfo({ depth }: PersonalInfoProps)
{
  // ---------- helpers ----------
  const clamp = (n: number, min: number, max: number) =>
    Math.min(Math.max(n, min), max);

  // Foreground transform (layer piercing)
  const fgScale = 1 + depth * 0.1;
  const fgTranslateZ = depth * 100;
  const fgOpacity = clamp(1 - depth * 2, 0, 1);

  // Parallax pieces
  const bgTranslateY = depth * 100;
  const bgScale = 1 + depth * 0.1;

  const avatarTranslateY = -depth * 50;
  const avatarScale = clamp(1 - depth * 0.1, 0.7, 1);
  const avatarOpacity = clamp(1 - depth * 0.3, 0, 1);

  const contentTranslateY = -depth * 30;
  const contentOpacity = clamp(1 - depth * 0.4, 0, 1);

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-3 sm:px-6 py-12"
    >
      {/* Parallax glow background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translateY(${bgTranslateY}px) scale(${bgScale})`,
          background: `radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
        }}
      />

      {/* Foreground container with scale + translateZ + fade */}
      <motion.div
        className="relative z-10 w-full"
        style={{
          transform: `scale(${fgScale}) translateZ(${fgTranslateZ}px)`,
          opacity: fgOpacity,
        }}
      >
        <div className="mx-auto w-full max-w-xl sm:max-w-2xl md:max-w-4xl text-center">
          {/* Avatar block with depth-based transform */}
          <motion.div
            className="mb-6 sm:mb-8"
            style={{
              transform: `translateY(${avatarTranslateY}px) scale(${avatarScale})`,
              opacity: avatarOpacity,
            }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-5 sm:mb-6"
              whileHover={{ scale: 1.03 }}
            >
              {/* Gradient ring */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full animate-pulse" />
              {/* Inner circle with icon */}
              <div className="absolute inset-2 bg-slate-800 rounded-full flex items-center justify-center overflow-hidden">
                {/* Thêm avatar thật của bạn ở đây */}
                <img
                  src="/img/profile.jpg"
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
                {/* Nếu muốn giữ icon User làm fallback: */}
                {/* <User className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-blue-400 absolute inset-0 m-auto" /> */}
              </div>
              {/* Rotating subtle outline */}
              <motion.div
                className="absolute -inset-2 rounded-full border-2 border-cyan-400/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>

          {/* Main info content with depth-based parallax */}
          <motion.div
            className="space-y-5 sm:space-y-6"
            style={{
              transform: `translateY(${contentTranslateY}px)`,
              opacity: contentOpacity,
            }}
            transition={{ duration: 0.8 }}
          >
            {/* Name + Title + Bio */}
            <div className="[text-wrap:balance]">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
                Phạm Lê Quốc Việt
              </h1>

              <div className="text-lg sm:text-xl md:text-2xl text-blue-300 mb-2 flex items-center justify-center gap-1.5 sm:gap-2">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Sinh viên An toàn Thông tin</span>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-md sm:max-w-2xl mx-auto leading-6 sm:leading-7 md:leading-relaxed">
                Chào mừng bạn đến với không gian số của tôi! <br />
                Tôi hiện là sinh viên năm 3 ngành An toàn thông tin. <br />
                Hãy cùng tôi bước vào hành trình khám phá kiến thức, trải nghiệm
                và niềm đam mê trong lĩnh vực an ninh mạng.
              </p>
            </div>

            {/* Quick info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12 max-w-lg sm:max-w-3xl mx-auto">
              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                className="bg-slate-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-slate-700 hover:border-blue-500 transition-all duration-300"
              >
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mb-1.5 sm:mb-2" />
                <p className="text-white font-medium text-sm sm:text-base">Năm 3</p>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Trường đại học CNTT - ĐHQG TPHCM
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                className="bg-slate-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-slate-700 hover:border-blue-500 transition-all duration-300"
              >
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mb-1.5 sm:mb-2" />
                <p className="text-white font-medium text-sm sm:text-base">Thủ Đức, TP. Hồ Chí Minh</p>
                <p className="text-slate-400 text-xs sm:text-sm">Việt Nam</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                className="bg-slate-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-slate-700 hover:border-blue-500 transition-all duration-300"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mb-1.5 sm:mb-2" />
                <p className="text-white font-medium text-sm sm:text-base">GPA: 8.45/10</p>
                <p className="text-slate-400 text-xs sm:text-sm">Giỏi</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
