"use client"

import { FaChevronRight } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="relative text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-r from-violet-800 to-violet-600 opacity-95"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Column 1 */}
        <div>
          <div className="mb-6">
            <img src="/wp_logo.avif" alt="logo" className="h-10" />
          </div>

          <p className="mb-6 text-sm leading-relaxed">
            On the other hand we denounce with righteous indignation and
            dislike men who.
          </p>

          <p className="text-sm">
            Charms of pleasure of the moment so blinded by desire.
          </p>
        </div>

        {/* Departments */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Departments</h3>

          <ul className="space-y-4 text-sm">

            <li className="flex items-center gap-3 hover:translate-x-1 transition">
              <FaChevronRight className="text-xs" />
              Family Health Solutions
            </li>

            <li className="flex items-center gap-3 hover:translate-x-1 transition">
              <FaChevronRight className="text-xs" />
              Eye Care Solutions
            </li>

            <li className="flex items-center gap-3 hover:translate-x-1 transition">
              <FaChevronRight className="text-xs" />
              Dental Surgery
            </li>

            <li className="flex items-center gap-3 hover:translate-x-1 transition">
              <FaChevronRight className="text-xs" />
              Children’s Health
            </li>

            <li className="flex items-center gap-3 hover:translate-x-1 transition">
              <FaChevronRight className="text-xs" />
              Nuclear Magnetic
            </li>

            <li className="flex items-center gap-3 hover:translate-x-1 transition">
              <FaChevronRight className="text-xs" />
              Outpatient Rehabilitation
            </li>

          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Quick Links</h3>

          <ul className="space-y-4 text-sm">

            <li className="flex items-center gap-3 hover:translate-x-1 transition">
              <FaChevronRight className="text-xs" />
              About Us
            </li>

            <li className="flex items-center gap-3 hover:translate-x-1 transition">
              <FaChevronRight className="text-xs" />
              Departments
            </li>

            <li className="flex items-center gap-3 hover:translate-x-1 transition">
              <FaChevronRight className="text-xs" />
              Find A Doctor
            </li>

            <li className="flex items-center gap-3 hover:translate-x-1 transition">
              <FaChevronRight className="text-xs" />
              FAQ
            </li>

            <li className="flex items-center gap-3 hover:translate-x-1 transition">
              <FaChevronRight className="text-xs" />
              Timetable
            </li>

            <li className="flex items-center gap-3 hover:translate-x-1 transition">
              <FaChevronRight className="text-xs" />
              News
            </li>

          </ul>
        </div>

        {/* Head Office */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Head Office</h3>

          <p className="mb-6 text-sm leading-relaxed">
            D-111 Radhey Villa Apartment
            <br />
            Bani Park Jaipur 302012
          </p>

          <div className="text-sm space-y-2">

            <p>Mon–Sat: 10:00AM – 08:00PM</p>
            <p>Sun: 10:00AM – 01:00PM</p>

          </div>
        </div>

      </div>


      {/* Bottom Footer */}
      <div className="border-t border-white/30 relative">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between text-sm">

          <p>Well Physio 2016-2026 All rights reserved</p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <p className="cursor-pointer hover:underline">Terms & Conditions</p>
            <p className="cursor-pointer hover:underline">Privacy Policy</p>
          </div>

        </div>

      </div>

    </footer>
  )
}