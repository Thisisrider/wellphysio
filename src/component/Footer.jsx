'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaChevronRight, FaMapMarkerAlt, FaClock, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaPaperPlane, FaHeartbeat } from 'react-icons/fa';
import { departments } from '@/data/departments';

const quickLinks = [
  { label: 'About Us', href: '/' },
  { label: 'Our Specialists', href: '/staff' },
  { label: 'Book Appointment', href: '/book-appointment' },
  { label: 'Departments', href: '/' },
  { label: 'FAQ', href: '/' },
  { label: 'Contact Us', href: '/' },
];

const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Backend-ready: POST /api/newsletter { email }
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-violet-950 to-gray-900" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-600/10 rounded-full filter blur-3xl" />

      {/* Newsletter Banner */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <FaHeartbeat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Stay Updated</h3>
              <p className="text-sm text-gray-400">Get health tips and appointment reminders directly in your inbox.</p>
            </div>
          </div>
          <form onSubmit={handleNewsletter} className="flex w-full md:w-auto max-w-md gap-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors backdrop-blur-sm" required />
            <button type="submit" className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300 flex items-center gap-2 cursor-pointer whitespace-nowrap">
              {subscribed ? '✓ Subscribed!' : <><FaPaperPlane className="w-3.5 h-3.5" /> Subscribe</>}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1 — Brand */}
        <div>
          <div className="mb-6">
            <img src="/wp_logo.avif" alt="Well Physio logo" className="h-10" />
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Well Physio is a premier healthcare institution providing advanced physiotherapy, rehabilitation, and specialized medical care with a patient-first approach.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} aria-label={social.label} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-violet-600 hover:text-white hover:border-violet-500 hover:-translate-y-1 transition-all duration-300">
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Departments (data-driven) */}
        <div>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
            Departments
          </h3>
          <ul className="space-y-3">
            {departments.slice(0, 6).map((dept) => (
              <li key={dept.id}>
                <Link href="/" className="group flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors duration-300">
                  <FaChevronRight className="w-2.5 h-2.5 text-violet-400 group-hover:translate-x-1 transition-transform duration-300" />
                  {dept.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
            Quick Links
          </h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="group flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors duration-300">
                  <FaChevronRight className="w-2.5 h-2.5 text-violet-400 group-hover:translate-x-1 transition-transform duration-300" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact */}
        <div>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
            Head Office
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <FaMapMarkerAlt className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
              <span>D-111 Radhey Villa Apartment,<br />Bani Park, Jaipur 302012</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-400">
              <FaPhoneAlt className="w-4 h-4 text-violet-400 flex-shrink-0" />
              <a href="tel:+911234567890" className="hover:text-white transition-colors">+91 123 456 7890</a>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-400">
              <FaEnvelope className="w-4 h-4 text-violet-400 flex-shrink-0" />
              <a href="mailto:info@wellphysio.com" className="hover:text-white transition-colors">info@wellphysio.com</a>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <FaClock className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
              <div>
                <p>Mon – Sat: 10:00 AM – 08:00 PM</p>
                <p>Sun: 10:00 AM – 01:00 PM</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>© 2016 – 2026 Well Physio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}