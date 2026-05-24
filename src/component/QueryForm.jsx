'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaClock, FaUserMd, FaHospital, FaCheckCircle, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { departments } from '@/data/departments';
import { teamMembers } from '@/data/staff';

/**
 * Multi-step appointment booking form.
 * 
 * Backend-ready payload shape:
 *   POST /api/appointments
 *   {
 *     patientName, email, phone,
 *     departmentId, doctorId,
 *     preferredDate, preferredTime,
 *     notes
 *   }
 * 
 * Complexity:
 *   - Department filtering of doctors: O(n) single pass via useMemo
 *   - Step transitions: O(1)
 */

const STEPS = [
  { id: 1, label: 'Personal Info', icon: FaUser },
  { id: 2, label: 'Department & Doctor', icon: FaHospital },
  { id: 3, label: 'Date & Time', icon: FaCalendarAlt },
];

export default function QueryForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form state structured for direct API payload
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    departmentId: '',
    doctorId: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  // Filter doctors by selected department — O(n) with memoization
  const filteredDoctors = useMemo(() => {
    if (!formData.departmentId) return [];
    return teamMembers.filter((doc) => doc.departmentId === formData.departmentId);
  }, [formData.departmentId]);

  // Get available time slots from selected doctor — O(1) via find
  const selectedDoctor = useMemo(() => {
    if (!formData.doctorId) return null;
    return teamMembers.find((d) => d.id === parseInt(formData.doctorId, 10));
  }, [formData.doctorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      // Reset dependent fields
      if (name === 'departmentId') {
        next.doctorId = '';
        next.preferredTime = '';
      }
      if (name === 'doctorId') {
        next.preferredTime = '';
      }
      return next;
    });
  };

  const canProceed = () => {
    if (currentStep === 1) return formData.patientName && formData.email && formData.phone;
    if (currentStep === 2) return formData.departmentId && formData.doctorId;
    if (currentStep === 3) return formData.preferredDate && formData.preferredTime;
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In future: POST formData to /api/appointments
    console.log('Appointment payload:', formData);
    setSubmitted(true);
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const inputClasses = "w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 text-sm";
  const labelClasses = "text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2";

  if (submitted) {
    return (
      <section className="relative bg-white overflow-hidden py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-emerald-500" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Appointment Requested!</h2>
            <p className="text-gray-600 mb-2">Thank you, <span className="font-semibold">{formData.patientName}</span>.</p>
            <p className="text-gray-500 mb-8">We&apos;ll confirm your appointment with <span className="font-semibold">{selectedDoctor?.name}</span> on <span className="font-semibold">{formData.preferredDate}</span> at <span className="font-semibold">{formData.preferredTime}</span> shortly via email.</p>
            <button
              onClick={() => { setSubmitted(false); setCurrentStep(1); setFormData({ patientName: '', email: '', phone: '', departmentId: '', doctorId: '', preferredDate: '', preferredTime: '', notes: '' }); }}
              className="cursor-pointer inline-flex items-center bg-violet-600 hover:bg-violet-700 text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-violet-600/30"
            >
              Book Another Appointment
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="book-appointment" className="relative bg-white overflow-hidden py-24">
      {/* Background embellishments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-fuchsia-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-start gap-16">
        {/* Left Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full lg:w-5/12 flex justify-center lg:justify-start relative lg:sticky lg:top-32"
        >
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-200 to-fuchsia-100 rounded-3xl transform rotate-3 scale-105 -z-10 transition-transform duration-500 hover:rotate-6" />
            <img
              src="/doctor-image.png"
              alt="Doctor Specialist"
              className="w-full h-auto object-cover rounded-3xl shadow-xl border-4 border-white z-10 relative"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Right Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full lg:w-7/12"
        >
          <div className="inline-block bg-violet-100 text-violet-800 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm">
            Book Online
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
            Schedule Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
              Appointment
            </span>
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Book an appointment with our specialists in just three simple steps. Choose your department, select a doctor, and pick a convenient time.
          </p>

          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-10 max-w-md">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isActive
                          ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-400/30'
                          : 'bg-gray-100 text-gray-400'
                    }`}>
                      {isCompleted ? <FaCheckCircle size={18} /> : <Icon size={16} />}
                    </div>
                    <span className={`text-xs font-semibold hidden sm:block ${isActive ? 'text-violet-600' : 'text-gray-400'}`}>
                      {step.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 rounded-full transition-colors duration-300 ${
                      currentStep > step.id ? 'bg-emerald-500' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl shadow-violet-900/5 p-6 sm:p-8 border border-gray-100">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div>
                    <label htmlFor="patientName" className={labelClasses}><FaUser size={12} className="text-violet-500" />Full Name</label>
                    <input type="text" id="patientName" name="patientName" value={formData.patientName} onChange={handleChange} placeholder="John Doe" className={inputClasses} required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className={labelClasses}><FaEnvelope size={12} className="text-violet-500" />Email</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={inputClasses} required />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClasses}><FaPhone size={12} className="text-violet-500" />Phone</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765-43210" className={inputClasses} required />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Department & Doctor */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div>
                    <label htmlFor="departmentId" className={labelClasses}><FaHospital size={12} className="text-violet-500" />Department</label>
                    <select id="departmentId" name="departmentId" value={formData.departmentId} onChange={handleChange} className={inputClasses} required>
                      <option value="">Select a department</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>{dept.icon} {dept.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="doctorId" className={labelClasses}><FaUserMd size={12} className="text-violet-500" />Doctor</label>
                    <select id="doctorId" name="doctorId" value={formData.doctorId} onChange={handleChange} className={inputClasses} required disabled={!formData.departmentId}>
                      <option value="">{formData.departmentId ? 'Select a doctor' : 'Select department first'}</option>
                      {filteredDoctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>{doc.name} — {doc.specialty}</option>
                      ))}
                    </select>
                  </div>
                  {selectedDoctor && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-violet-50 rounded-xl p-4 border border-violet-100"
                    >
                      <div className="flex items-center gap-3">
                        <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-violet-200" />
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{selectedDoctor.name}</p>
                          <p className="text-xs text-gray-500">{selectedDoctor.schedule}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Date & Time */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div>
                    <label htmlFor="preferredDate" className={labelClasses}><FaCalendarAlt size={12} className="text-violet-500" />Preferred Date</label>
                    <input type="date" id="preferredDate" name="preferredDate" value={formData.preferredDate} onChange={handleChange} className={inputClasses} required min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div>
                    <label className={labelClasses}><FaClock size={12} className="text-violet-500" />Available Time Slots</label>
                    {selectedDoctor?.availableSlots ? (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {selectedDoctor.availableSlots.map((slot) => (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => setFormData((p) => ({ ...p, preferredTime: slot }))}
                            className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                              formData.preferredTime === slot
                                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-400/20'
                                : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-violet-300 hover:bg-violet-50'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">Select a doctor to see available slots</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="notes" className={labelClasses}>Additional Notes (Optional)</label>
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="Describe your symptoms or any special requirements..." rows={3} className={inputClasses} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              {currentStep > 1 ? (
                <button type="button" onClick={prevStep} className="cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-violet-600 transition-colors">
                  <FaChevronLeft size={12} />Back
                </button>
              ) : (
                <p className="text-xs text-gray-500 max-w-[60%]">
                  By submitting, you agree to our <a href="#" className="text-violet-600 hover:underline">Privacy Policy</a>.
                </p>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
                >
                  Next <FaChevronRight size={12} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canProceed()}
                  className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
                >
                  <FaCheckCircle size={14} /> Confirm Appointment
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}