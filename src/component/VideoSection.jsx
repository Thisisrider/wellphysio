'use client';
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaTimes, FaHeadset, FaFileMedical, FaShieldAlt } from 'react-icons/fa';

// ─── Video highlights rendered in O(n) single pass ──────────
const highlights = [
  {
    id: 1,
    icon: FaHeadset,
    title: '24/7 Support',
    description: 'Round-the-clock medical assistance and emergency care.',
  },
  {
    id: 2,
    icon: FaFileMedical,
    title: 'Digital Records',
    description: 'Secure electronic health records accessible anytime.',
  },
  {
    id: 3,
    icon: FaShieldAlt,
    title: 'Certified Care',
    description: 'NABH accredited with internationally trained specialists.',
  },
];

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const openModal = useCallback(() => setIsPlaying(true), []);
  const closeModal = useCallback(() => setIsPlaying(false), []);

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
        <div className="absolute top-20 right-10 md:right-32 w-72 h-72 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute bottom-20 left-10 md:left-32 w-72 h-72 bg-fuchsia-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-800 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-600" />
            </span>
            Virtual Tour
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
            Experience{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
              Our Care
            </span>{' '}
            Firsthand
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Take a closer look at our state-of-the-art facilities, advanced
            treatments, and hear directly from our dedicated medical
            professionals.
          </p>
        </motion.div>

        {/* Video Thumbnail with Play Button */}
        <motion.div
          className="relative mx-auto max-w-5xl group cursor-pointer"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          onClick={openModal}
          role="button"
          tabIndex={0}
          aria-label="Play facility tour video"
          onKeyDown={(e) => e.key === 'Enter' && openModal()}
        >
          {/* Gradient glow behind */}
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-700 group-hover:duration-200" />

          {/* Thumbnail Container */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 aspect-video z-10 border border-gray-100">
            {/* Thumbnail Image */}
            <img
              src="/hero1.jpg"
              alt="Well Physio facility tour"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent transition-opacity duration-300 group-hover:opacity-80" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Pulsing ring */}
                <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '2s' }} />

                {/* Button */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-violet-500/30">
                  <FaPlay className="w-7 h-7 md:w-8 md:h-8 text-violet-600 ml-1.5" />
                </div>
              </motion.div>
            </div>

            {/* Bottom overlay text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/90 text-sm font-medium">
                  Watch our 3-minute facility tour
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Highlights Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          {highlights.map((item, idx) => (
            <motion.div
              key={item.id}
              className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg hover:shadow-violet-100/50 hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-md shadow-violet-200">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Fullscreen Video Modal ─────────────────────────────── */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50 cursor-pointer"
              aria-label="Close video"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Video Container */}
            <motion.div
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/bVNfEYoGGEo?si=IBYGUwi_SClbANK8&start=36&autoplay=1"
                title="Well Physio Facility Tour"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
