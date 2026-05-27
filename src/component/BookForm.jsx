'use client';
import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaClock, FaUserMd, FaHospital, FaCheckCircle, FaChevronRight, FaChevronLeft, FaNotesMedical } from 'react-icons/fa';
import { departments } from '@/data/departments';
import { teamMembers, staffMap } from '@/data/staff';

const STEPS = ['Personal Info', 'Select Department & Doctor', 'Date & Time', 'Confirm'];

export default function BookForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', notes: '',
    departmentId: '', doctorId: '',
    date: '', time: '',
  });

  const update = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  // O(n) single pass — filter doctors by selected department
  const filteredDoctors = useMemo(() => {
    if (!form.departmentId) return [];
    return teamMembers.filter((m) => m.departmentId === form.departmentId);
  }, [form.departmentId]);

  // O(1) lookup for selected doctor's available slots
  const selectedDoctor = form.doctorId ? staffMap.get(Number(form.doctorId)) : null;
  const timeSlots = selectedDoctor?.availableSlots || ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];

  const canProceed = () => {
    if (step === 0) return form.name.trim() && form.email.trim() && form.phone.trim();
    if (step === 1) return form.departmentId && form.doctorId;
    if (step === 2) return form.date && form.time;
    return true;
  };

  const handleSubmit = () => {
    // Backend-ready: POST /api/appointments
    const payload = {
      patientName: form.name,
      patientEmail: form.email,
      patientPhone: form.phone,
      patientNotes: form.notes,
      departmentId: form.departmentId,
      doctorId: Number(form.doctorId),
      appointmentDate: form.date,
      appointmentTime: form.time,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    console.log('Appointment payload:', payload);
    setSubmitted(true);
  };

  const next = () => { if (step < 3 && canProceed()) setStep((s) => s + 1); };
  const prev = () => { if (step > 0) setStep((s) => s - 1); };

  const slideVariants = {
    enter: { x: 40, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -40, opacity: 0 },
  };

  if (submitted) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div className="text-center max-w-md" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl shadow-green-200/50">
            <FaCheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Appointment Booked!</h2>
          <p className="text-gray-600 mb-2">Your appointment with <strong>{selectedDoctor?.name}</strong> has been scheduled.</p>
          <p className="text-sm text-gray-500 mb-8">{form.date} at {form.time}</p>
          <p className="text-xs text-gray-400">A confirmation email will be sent to <strong>{form.email}</strong></p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-50 via-white to-white pointer-events-none z-0" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-violet-100 rounded-full filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-fuchsia-100 rounded-full filter blur-3xl opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-800 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm">
            <FaCalendarAlt className="w-3.5 h-3.5" /> Online Booking
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
            Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">Appointment</span>
          </h1>
          <p className="text-lg text-gray-600">Schedule your visit in just a few simple steps.</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${i <= step ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-300/40' : 'bg-gray-200 text-gray-500'}`}>
                  {i < step ? <FaCheckCircle className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`text-xs mt-2 font-medium hidden sm:block ${i <= step ? 'text-violet-700' : 'text-gray-400'}`}>{label}</span>
              </div>
            ))}
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full" animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }} transition={{ duration: 0.5, ease: 'easeInOut' }} />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 md:p-10">
          <AnimatePresence mode="wait">
            {/* Step 0: Personal Info */}
            {step === 0 && (
              <motion.div key="step0" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"><FaUser className="text-violet-500 w-3.5 h-3.5" /> Full Name</label>
                  <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors" placeholder="John Doe" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"><FaEnvelope className="text-violet-500 w-3.5 h-3.5" /> Email</label>
                    <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"><FaPhone className="text-violet-500 w-3.5 h-3.5" /> Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors" placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"><FaNotesMedical className="text-violet-500 w-3.5 h-3.5" /> Notes (Optional)</label>
                  <textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors resize-none" placeholder="Any specific concerns or symptoms..." />
                </div>
              </motion.div>
            )}

            {/* Step 1: Department & Doctor */}
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"><FaHospital className="text-violet-500 w-3.5 h-3.5" /> Select Department</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {departments.map((dept) => (
                      <button key={dept.id} type="button" onClick={() => { update('departmentId', dept.id); update('doctorId', ''); }} className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 cursor-pointer ${form.departmentId === dept.id ? 'border-violet-500 bg-violet-50 shadow-md shadow-violet-200/50' : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50/50'}`}>
                        <span className="text-2xl block mb-1">{dept.icon}</span>
                        <span className="text-xs font-semibold text-gray-700">{dept.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                {form.departmentId && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"><FaUserMd className="text-violet-500 w-3.5 h-3.5" /> Select Doctor</label>
                    <div className="space-y-3">
                      {filteredDoctors.map((doc) => (
                        <button key={doc.id} type="button" onClick={() => update('doctorId', String(doc.id))} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-left ${form.doctorId === String(doc.id) ? 'border-violet-500 bg-violet-50 shadow-md shadow-violet-200/50' : 'border-gray-200 hover:border-violet-300'}`}>
                          <img src={doc.image} alt={doc.name} className="w-14 h-14 rounded-xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 text-sm">{doc.name}</p>
                            <p className="text-xs text-violet-600">{doc.specialty}</p>
                          </div>
                          {doc.rating && <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">★ {doc.rating}</span>}
                        </button>
                      ))}
                      {filteredDoctors.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No doctors available in this department.</p>}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"><FaCalendarAlt className="text-violet-500 w-3.5 h-3.5" /> Select Date</label>
                  <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors" />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"><FaClock className="text-violet-500 w-3.5 h-3.5" /> Select Time Slot</label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {timeSlots.map((slot) => (
                      <button key={slot} type="button" onClick={() => update('time', slot)} className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${form.time === slot ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-300/40' : 'bg-gray-100 text-gray-700 hover:bg-violet-100 hover:text-violet-700'}`}>
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Review Your Appointment</h3>
                <div className="space-y-4 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Patient</span><span className="font-semibold text-gray-900">{form.name}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Email</span><span className="font-semibold text-gray-900">{form.email}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Phone</span><span className="font-semibold text-gray-900">{form.phone}</span></div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Department</span><span className="font-semibold text-gray-900">{departments.find(d => d.id === form.departmentId)?.name}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Doctor</span><span className="font-semibold text-gray-900">{selectedDoctor?.name}</span></div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Date</span><span className="font-semibold text-gray-900">{form.date}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Time</span><span className="font-semibold text-gray-900">{form.time}</span></div>
                  {form.notes && <><hr className="border-gray-200" /><div className="text-sm"><span className="text-gray-500">Notes: </span><span className="text-gray-700">{form.notes}</span></div></>}
                </div>
                <p className="text-xs text-gray-400 mt-4 text-center">By confirming, you agree to our Terms of Service and Privacy Policy.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button type="button" onClick={prev} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${step === 0 ? 'invisible' : 'text-gray-600 hover:text-violet-700 hover:bg-violet-50'}`}>
              <FaChevronLeft className="w-3 h-3" /> Back
            </button>
            {step < 3 ? (
              <button type="button" onClick={next} disabled={!canProceed()} className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${canProceed() ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-300/40 hover:shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                Next <FaChevronRight className="w-3 h-3" />
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md shadow-green-300/40 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <FaCheckCircle className="w-4 h-4" /> Confirm Appointment
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
