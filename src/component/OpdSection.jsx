'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaCheckCircle } from 'react-icons/fa';
import { services } from '@/data/services';
import { departmentMap } from '@/data/departments';

/**
 * Modern tabbed OPD section.
 * - Services rendered in O(n) single pass
 * - Tab switching is O(1) via index
 * - Department lookup is O(1) via Map
 */
export default function OpdSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];
  const dept = departmentMap.get(activeService.departmentId);

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-violet-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-fuchsia-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block bg-violet-100 text-violet-800 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm">
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
            OPD, Medical &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
              Surgical Services
            </span>{' '}
            We Offer
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            From routine checkups to complex surgical procedures, our comprehensive services are designed to provide world-class healthcare with compassion and precision.
          </p>
        </motion.div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tab List — O(n) single render pass */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-[380px] shrink-0"
          >
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left px-6 py-5 flex items-center gap-4 transition-all duration-300 cursor-pointer border-b border-gray-50 last:border-none ${
                    index === activeIndex
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-inner'
                      : 'bg-white text-gray-700 hover:bg-violet-50'
                  }`}
                >
                  <span className="text-2xl">{service.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm truncate">{service.title}</h4>
                    {dept && index === activeIndex && (
                      <p className="text-xs mt-0.5 opacity-80 truncate">{dept.name}</p>
                    )}
                  </div>
                  <FaChevronRight
                    size={12}
                    className={`shrink-0 transition-transform duration-300 ${
                      index === activeIndex ? 'translate-x-1' : ''
                    }`}
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Active Service Detail */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden h-full"
              >
                {/* Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-4xl mb-2 block">{activeService.icon}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {activeService.title}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-8">
                  <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                    {activeService.description}
                  </p>

                  {/* Department features — O(n) via .map */}
                  {dept && (
                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                        Key Specialties
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {dept.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2.5">
                            <FaCheckCircle className="text-emerald-500 shrink-0" size={14} />
                            <span className="text-sm text-gray-600 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button className="cursor-pointer group/btn inline-flex items-center bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 overflow-hidden shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5">
                    <span className="whitespace-nowrap">Learn More</span>
                    <span className="w-0 opacity-0 group-hover/btn:w-6 group-hover/btn:opacity-100 group-hover/btn:ml-3 transition-all duration-300 delay-100 flex items-center justify-center">
                      <FaChevronRight />
                    </span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
