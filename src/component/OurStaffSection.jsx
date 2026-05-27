'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaCalendarCheck, FaSearch, FaAngleRight } from 'react-icons/fa';
import { teamMembers } from '@/data/staff';
import { departments } from '@/data/departments';

export default function OurStaffSection() {
  const [activeDept, setActiveDept] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return teamMembers.filter((m) => {
      const matchesDept = activeDept === 'all' || m.departmentId === activeDept;
      const matchesSearch = !query || m.name.toLowerCase().includes(query) || m.specialty.toLowerCase().includes(query);
      return matchesDept && matchesSearch;
    });
  }, [activeDept, searchQuery]);

  const filterTabs = useMemo(() => {
    const counts = new Map();
    counts.set('all', teamMembers.length);
    for (const m of teamMembers) {
      counts.set(m.departmentId, (counts.get(m.departmentId) || 0) + 1);
    }
    const tabs = [{ id: 'all', name: 'All', count: counts.get('all') }];
    for (const dept of departments) {
      if (counts.has(dept.id)) tabs.push({ id: dept.id, name: dept.name, count: counts.get(dept.id) });
    }
    return tabs;
  }, []);

  return (
    <section id="our-staff" className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div className="text-center max-w-3xl mx-auto mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <div className="inline-block bg-violet-100 text-violet-800 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm">Our Dedicated Team</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">Specialists</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">Our team of highly skilled professionals is dedicated to providing you with the highest standard of care across a wide range of medical fields.</p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
          <div className="relative max-w-md mx-auto mb-8">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Search by name or specialty..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition-shadow duration-200 hover:shadow-md" id="staff-search" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {filterTabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveDept(tab.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${activeDept === tab.id ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-300/40' : 'bg-white text-gray-600 hover:bg-violet-50 hover:text-violet-700 border border-gray-200'}`}>
                {tab.name} <span className={`ml-1.5 text-xs ${activeDept === tab.id ? 'text-white/80' : 'text-gray-400'}`}>({tab.count})</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredMembers.length > 0 ? filteredMembers.map((member, idx) => (
              <motion.div key={member.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.35, delay: idx * 0.05 }} className="group relative bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100 hover:-translate-y-2 transition-all duration-300">
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700 ease-in-out" loading="lazy" />
                  {member.rating && (
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-md">
                      <FaStar className="w-3 h-3 text-amber-400" /><span className="text-xs font-bold text-gray-800">{member.rating}</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 z-20 bg-violet-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {member.departmentId?.charAt(0).toUpperCase() + member.departmentId?.slice(1)}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm font-semibold text-violet-600 mb-2">{member.specialty}</p>
                  {member.totalAppointments && (
                    <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 mb-4">
                      <FaCalendarCheck className="w-3 h-3" /><span>{member.totalAppointments.toLocaleString()}+ consultations</span>
                    </div>
                  )}
                  <Link href={`/staff/${member.id}`} className="inline-flex items-center justify-center text-sm font-bold text-gray-700 hover:text-violet-600 transition-colors duration-300 group/link">
                    View Profile <FaAngleRight className="w-3.5 h-3.5 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full flex flex-col items-center justify-center py-16 text-gray-400">
                <FaSearch className="w-10 h-10 mb-4 opacity-40" /><p className="text-lg font-medium">No specialists found</p>
                <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div className="mt-16 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Link href="/staff" className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full hover:shadow-xl hover:shadow-violet-300/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600">
            View All Specialists <FaAngleRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
