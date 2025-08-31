import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send, Phone } from 'lucide-react';

interface ContactProps {
  depth: number;
}

function isMobileDevice() {
  return typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
}

export default function Contact({ depth }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', hp: '' });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');

  const isMobile = isMobileDevice();
  const isVisible = isMobile ? true : depth >= 2.8;
  const GAS_URL = import.meta.env.VITE_GAS_CONTACT_URL as string;

  const contactLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/QuocViet515', color: 'hover:text-purple-400' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/plquocviet/', color: 'hover:text-blue-400' },
    { icon: Mail, label: 'Email', href: 'mailto:vietpham05012005@gmail.com', color: 'hover:text-green-400' },
    { icon: Phone, label: 'Phone', href: 'tel:0373902374', color: 'hover:text-yellow-400' },
  ];

  const stopSpaceBubble = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === ' ' || e.code === 'Space') e.stopPropagation();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('err');
      return;
    }
    try {
      setIsSending(true);
      setStatus('idle');
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      fd.append('message', formData.message);
      fd.append('hp', formData.hp);
      const res = await fetch(GAS_URL, { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Request failed');
      setStatus('ok');
      setFormData({ name: '', email: '', message: '', hp: '' });
    } catch (err) {
      console.error(err);
      setStatus('err');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div
      className="relative z-40 text-center min-h-screen flex items-center"
      style={{
        transform: isMobile
          ? undefined
          : `scale(${1 + (depth - 3) * 0.1}) translateZ(${(depth - 3) * 100}px)`,
        opacity: isMobile
          ? 1
          : (isVisible ? Math.max(0, 1 - Math.abs(depth - 3.3) * 1) : 0),
      }}
    >
      <div className="max-w-4xl mx-auto px-6 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: isMobile ? 1 : (isVisible ? 1 : 0),
            y: isMobile ? 0 : (isVisible ? 0 : 30)
          }}
          className="text-3xl md:text-5xl font-mono font-bold text-cyan-400 mb-12"
        >
          [ESTABLISH CONNECTION]
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Links */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: isMobile ? 1 : (isVisible ? 1 : 0),
              x: isMobile ? 0 : (isVisible ? 0 : -50)
            }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-mono text-green-400 mb-8">Direct Channels</h3>
            <div className="space-y-4">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isMobile ? 1 : (isVisible ? 1 : 0),
                    x: isMobile ? 0 : (isVisible ? 0 : -20)
                  }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className={`flex items-center gap-4 p-4 bg-gray-800/40 border border-gray-600 rounded-lg hover:border-cyan-400/60 transition-all duration-300 ${link.color}`}
                >
                  <link.icon className="w-6 h-6 text-gray-400" />
                  <span className="font-mono text-gray-300">{link.label}</span>
                  <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: isMobile ? 1 : (isVisible ? 1 : 0),
              x: isMobile ? 0 : (isVisible ? 0 : 50)
            }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-mono text-green-400 mb-8">Secure Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot (hidden) */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.hp}
                onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
                className="hidden"
              />

              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onKeyDown={stopSpaceBubble}
                className="w-full p-4 bg-gray-800/60 border border-gray-600 rounded-lg font-mono text-gray-300 placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
              />

              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onKeyDown={stopSpaceBubble}
                className="w-full p-4 bg-gray-800/60 border border-gray-600 rounded-lg font-mono text-gray-300 placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
              />

              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onKeyDown={stopSpaceBubble}
                rows={4}
                className="w-full p-4 bg-gray-800/60 border border-gray-600 rounded-lg font-mono text-gray-300 placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors duration-300 resize-none"
              />

              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={!isSending ? { scale: 1.02 } : undefined}
                whileTap={!isSending ? { scale: 0.98 } : undefined}
                className={`w-full flex items-center justify-center gap-3 p-4 rounded-lg font-mono transition-all duration-300
                  ${isSending
                    ? 'bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 cursor-wait'
                    : 'bg-gradient-to-r from-cyan-400/20 to-green-400/20 hover:from-cyan-400/30 hover:to-green-400/30 border border-cyan-400/50 hover:border-green-400/70 text-cyan-400 hover:text-green-400'
                  }`}
              >
                <Send className={`w-5 h-5 ${isSending ? 'animate-pulse' : ''}`} />
                {isSending ? 'SENDING…' : 'TRANSMIT MESSAGE'}
              </motion.button>

              {status === 'ok' && (
                <div className="text-green-400 font-mono text-sm text-center">
                  Message sent successfully!
                </div>
              )}
              {status === 'err' && (
                <div className="text-red-400 font-mono text-sm text-center">
                  Failed to send. Please try again.
                </div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isMobile ? 1 : (isVisible ? 1 : 0),
            y: isMobile ? 0 : (isVisible ? 0 : 20)
          }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-gray-700"
        >
          <p className="font-mono text-gray-400 text-sm">
            &copy; 2025 PHAM LE QUOC VIET | CYBERSECURITY STUDENT
          </p>
          <p className="font-mono text-gray-500 text-xs mt-2">
            "Trust is good, but cryptography is better"
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
