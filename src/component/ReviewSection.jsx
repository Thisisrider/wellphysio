'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaStarHalfAlt, FaRegStar, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaCheckCircle } from 'react-icons/fa';

// ─── Review Data ─────────────────────────────────────────────────
const reviews = [
  {
    id: 1,
    name: 'Charlotte Edwards',
    role: 'Patient – Physiotherapy',
    image: '/reviewprofile.jpg',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    title: 'Life-Changing Treatment',
    text: 'After months of chronic back pain, the physiotherapy team here gave me my life back. The personalized treatment plan was thorough, and the staff was incredibly supportive throughout my recovery journey.',
  },
  {
    id: 2,
    name: 'James Mitchell',
    role: 'Patient – Orthopedics',
    image: '/reviewprofile.jpg',
    rating: 5,
    date: '1 month ago',
    verified: true,
    title: 'Exceptional Surgical Care',
    text: 'My knee replacement surgery was handled with extraordinary precision. Dr. Patel and the entire orthopedic team made me feel safe and confident from the initial consultation through the entire recovery process.',
  },
  {
    id: 3,
    name: 'Sophia Williams',
    role: 'Patient – Cardiology',
    image: '/reviewprofile.jpg',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
    title: 'Thorough & Compassionate',
    text: 'The cardiac diagnostic tests were carried out meticulously, and the cardiologist explained every finding in detail. The follow-up care has been consistent and reassuring. Truly a world-class facility.',
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Patient – Neurology',
    image: '/reviewprofile.jpg',
    rating: 5,
    date: '1 week ago',
    verified: true,
    title: 'Outstanding Expertise',
    text: 'I was referred here for recurring migraines. The neurology department diagnosed the root cause quickly, and the treatment plan has reduced my episodes significantly. Highly recommended!',
  },
  {
    id: 5,
    name: 'Emily Chen',
    role: 'Patient – Dermatology',
    image: '/reviewprofile.jpg',
    rating: 5,
    date: '2 months ago',
    verified: false,
    title: 'Visible Results Fast',
    text: 'The dermatology team crafted a skincare regimen that cleared my persistent acne within weeks. The clinic environment is modern, hygienic, and incredibly welcoming. Thank you so much!',
  },
  {
    id: 6,
    name: 'Robert Garcia',
    role: 'Patient – General Medicine',
    image: '/reviewprofile.jpg',
    rating: 5,
    date: '5 days ago',
    verified: true,
    title: 'Best Healthcare Experience',
    text: 'From the front desk to the doctors, everyone was professional and courteous. The appointment system is seamless, wait times are minimal, and the facility is top-notch. Will definitely return.',
  },
];

// ─── Aggregate Stats ─────────────────────────────────────────────
const overallRating = 5;
const totalReviews = 2847;
const ratingBreakdown = [
  { stars: 5, percentage: 100 },
  { stars: 4, percentage: 0 },
  { stars: 3, percentage: 0 },
  { stars: 2, percentage: 0 },
  { stars: 1, percentage: 0 },
];

// ─── Star Renderer ───────────────────────────────────────────────
function RenderStars({ rating, size = 16 }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} size={size} className="text-amber-400" />);
  }
  if (hasHalf) {
    stars.push(<FaStarHalfAlt key="half" size={size} className="text-amber-400" />);
  }
  const remaining = 5 - fullStars - (hasHalf ? 1 : 0);
  for (let i = 0; i < remaining; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} size={size} className="text-amber-400/40" />);
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

// ─── Single Review Card ──────────────────────────────────────────
function ReviewCard({ review }) {
  return (
    <div className="relative h-full flex flex-col bg-white/80 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl shadow-violet-900/5 p-6 sm:p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-600/10 hover:-translate-y-1 group">
      {/* Quote watermark */}
      <FaQuoteLeft className="absolute top-5 right-6 text-violet-200/40 text-4xl pointer-events-none transition-colors duration-500 group-hover:text-violet-300/50" />

      {/* Header: Avatar + Info */}
      <div className="flex items-center gap-4 mb-5">
        <div className="relative shrink-0">
          <img
            src={review.image}
            alt={review.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-violet-200 ring-offset-2"
          />
          {review.verified && (
            <FaCheckCircle className="absolute -bottom-0.5 -right-0.5 text-emerald-500 bg-white rounded-full text-sm" title="Verified Patient" />
          )}
        </div>
        <div className="min-w-0">
          <h4 className="text-base font-bold text-gray-900 truncate">{review.name}</h4>
          <p className="text-xs text-gray-500 truncate">{review.role}</p>
        </div>
      </div>

      {/* Rating + Date */}
      <div className="flex items-center justify-between mb-4">
        <RenderStars rating={review.rating} size={15} />
        <span className="text-xs text-gray-400 font-medium whitespace-nowrap ml-3">{review.date}</span>
      </div>

      {/* Review Title */}
      <h5 className="text-sm font-bold text-gray-800 mb-2 line-clamp-1">{review.title}</h5>

      {/* Review Body */}
      <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-4">
        {review.text}
      </p>

      {/* Bottom accent line */}
      <div className="mt-6 h-0.5 w-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-700 group-hover:w-full" />
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────
export default function ReviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const intervalRef = useRef(null);

  // Responsive cards-per-view
  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w < 640) setCardsPerView(1);
      else if (w < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - cardsPerView);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(next, 4500);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, next]);

  const totalDots = maxIndex + 1;

  return (
    <section
      className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-fuchsia-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* ─── Section Header ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block bg-violet-100 text-violet-800 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm">
            Patient Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
            What Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
              Patients Say
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Real stories from real patients. Discover why thousands trust us with their health and well-being.
          </p>
        </motion.div>

        {/* ─── Aggregate Stats Bar ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-16 bg-white/70 backdrop-blur-lg rounded-3xl border border-white/60 shadow-lg shadow-violet-900/5 p-8 sm:p-10"
        >
          {/* Left: Big number */}
          <div className="flex flex-col items-center shrink-0">
            <span className="text-6xl font-black text-gray-900 leading-none">{overallRating}</span>
            <RenderStars rating={overallRating} size={22} />
            <p className="text-sm text-gray-500 mt-2 font-medium">{totalReviews.toLocaleString()} reviews</p>
          </div>

          {/* Right: Breakdown bars */}
          <div className="flex-1 w-full space-y-2.5">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-600 w-5 text-right">{item.stars}</span>
                <FaStar size={13} className="text-amber-400 shrink-0" />
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + (5 - item.stars) * 0.1, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-400 w-10 text-right">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── Carousel ───────────────────────────────────── */}
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={prev}
            aria-label="Previous reviews"
            className="hidden sm:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg items-center justify-center text-gray-700 hover:text-violet-600 hover:border-violet-300 hover:shadow-violet-200/50 transition-all duration-300 cursor-pointer"
          >
            <FaChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            aria-label="Next reviews"
            className="hidden sm:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg items-center justify-center text-gray-700 hover:text-violet-600 hover:border-violet-300 hover:shadow-violet-200/50 transition-all duration-300 cursor-pointer"
          >
            <FaChevronRight size={16} />
          </button>

          {/* Cards track */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * (100 / cardsPerView)}%` }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              style={{ gap: '1.5rem' }}
            >
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  className="shrink-0"
                  style={{ width: `calc((100% - ${(cardsPerView - 1) * 1.5}rem) / ${cardsPerView})` }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {Array.from({ length: totalDots }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 cursor-pointer ${i === currentIndex
                    ? 'w-8 h-2.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-md shadow-violet-400/30'
                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-violet-300'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* ─── CTA ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-violet-700 transition-all duration-300 bg-violet-100 rounded-full hover:bg-violet-200 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
          >
            Read All Reviews
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
