'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaAngleRight, FaCheckCircle } from "react-icons/fa";

const trustBadges = [
  'Board-Certified Specialists',
  '20+ Years of Experience',
  'Personalized Treatment Plans',
  '98% Patient Satisfaction',
];

/**
 * BestDoctorSection with animated trust badges and image parallax.
 * trustBadges are rendered in a single O(n) pass.
 */
export default function BestDoctorSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-violet-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-fuchsia-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-200 to-fuchsia-100 rounded-3xl transform -rotate-3 scale-105 -z-10 transition-transform duration-500 group-hover:-rotate-6" />
            <img
              src="/specialized-image.jpg"
              alt="Physiotherapy Session"
              className="w-full h-[500px] object-cover rounded-3xl shadow-2xl border-4 border-white"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-violet-900/10 rounded-3xl group-hover:bg-transparent transition-colors duration-500" />

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl shadow-violet-200/50 p-5 border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                  98%
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Patient Satisfaction</p>
                  <p className="text-xs text-gray-500">Based on 2,800+ reviews</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="w-full lg:w-1/2 flex flex-col items-start text-left"
          >
            <div className="inline-block bg-violet-100 text-violet-800 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm">
              Expert Care
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              The Best{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                Physiotherapists
              </span>{' '}
              for A Healing Touch
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Our team of dedicated physiotherapists specializes in treating sports injuries, chronic pain, and post-surgical rehabilitation. We combine hands-on manual therapy with advanced exercise science to get you moving freely again.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Whether you&apos;re recovering from an injury or looking to improve your overall mobility, our tailored physical therapy programs are designed around your unique needs.
            </p>

            {/* Trust Badges — single pass O(n) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 w-full">
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2.5"
                >
                  <FaCheckCircle className="text-emerald-500 shrink-0" size={16} />
                  <span className="text-sm font-semibold text-gray-700">{badge}</span>
                </motion.div>
              ))}
            </div>

            <Link
              href="/book-appointment"
              className="cursor-pointer group inline-flex items-center bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 overflow-hidden shadow-lg hover:shadow-violet-600/50"
            >
              <span className="whitespace-nowrap">BOOK APPOINTMENT</span>
              <span className="w-0 opacity-0 group-hover:w-6 group-hover:opacity-100 group-hover:ml-3 transition-all duration-300 delay-100 flex items-center justify-center ease-out-in">
                <FaAngleRight />
              </span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
