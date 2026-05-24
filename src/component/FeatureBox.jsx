'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaUserMd, FaCalendarCheck, FaAngleRight } from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: FaMapMarkerAlt,
    title: "Maps, Directions & Locations",
    description: "Find the nearest Well Physio clinic to start your recovery journey today.",
    buttonText: "Get Direction",
    href: "/contact",
    gradient: "from-violet-500 to-violet-700",
  },
  {
    id: 2,
    icon: FaUserMd,
    title: "Meet Our Therapists",
    description: "Discover our team of specialized physical therapists dedicated to your health.",
    buttonText: "Find a Therapist",
    href: "/staff",
    gradient: "from-fuchsia-500 to-fuchsia-700",
  },
  {
    id: 3,
    icon: FaCalendarCheck,
    title: "Book an Appointment",
    description: "Schedule a consultation with our experts at a time that works for you.",
    buttonText: "Appointments",
    href: "/book-appointment",
    gradient: "from-violet-600 to-fuchsia-600",
  },
];

/**
 * Feature cards rendered via single .map() pass — O(n).
 * Data-driven design makes it trivial to add/remove features.
 */
export default function FeatureSection() {
  return (
    <section className="relative -mt-16 z-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-6 shadow-lg group-hover:bg-white/20 group-hover:shadow-none transition-all duration-500`}>
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors duration-500">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 mb-6 group-hover:text-white/80 transition-colors duration-500 leading-relaxed">
                    {feature.description}
                  </p>

                  <Link
                    href={feature.href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 group-hover:text-white transition-colors duration-500"
                  >
                    {feature.buttonText}
                    <FaAngleRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}