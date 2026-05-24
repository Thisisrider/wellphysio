'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaUserMd, FaAward, FaHospital } from 'react-icons/fa';

const stats = [
  { id: 1, icon: FaHeartbeat, value: 15000, suffix: '+', label: 'Patients Treated', color: 'text-rose-500' },
  { id: 2, icon: FaUserMd, value: 50, suffix: '+', label: 'Expert Doctors', color: 'text-violet-500' },
  { id: 3, icon: FaAward, value: 25, suffix: '+', label: 'Years Experience', color: 'text-amber-500' },
  { id: 4, icon: FaHospital, value: 8, suffix: '', label: 'Departments', color: 'text-emerald-500' },
];

/**
 * Animated counter — O(1) per frame via requestAnimationFrame.
 * Uses easeOutQuart for natural deceleration.
 */
function useAnimatedCounter(target, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!startCounting) return;
    let startTime = null;

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(easeOutQuart(progress) * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, startCounting]);

  return count;
}

function StatCard({ stat, index, inView }) {
  const count = useAnimatedCounter(stat.value, 2000, inView);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative text-center group"
    >
      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-5 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={28} />
      </div>

      {/* Number */}
      <div className="text-4xl md:text-5xl font-black text-white mb-2 tabular-nums">
        {count.toLocaleString()}{stat.suffix}
      </div>

      {/* Label */}
      <p className="text-violet-200 font-medium text-sm uppercase tracking-wider">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function StatsCounter() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Only count once — O(1)
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-800 via-violet-700 to-fuchsia-700" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-50" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {stats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
