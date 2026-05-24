import React from 'react';
import Link from 'next/link';
import { teamMembers } from '../../../data/staff';

export default async function StaffProfilePage({ params }) {
    // Await params for Next.js 15 compatibility, works fine in 14 too if async
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    const doctor = teamMembers.find(member => member.id === id);

    if (!doctor) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Doctor Not Found</h1>
                <p className="text-gray-600 mb-8">The specialist you are looking for does not exist in our directory.</p>
                <Link href="/staff" className="px-6 py-3 bg-violet-600 text-white rounded-full font-semibold hover:bg-violet-700 transition">
                    Back to Directory
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
                <div className="absolute top-1/2 -left-40 w-96 h-96 bg-fuchsia-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Breadcrumb Navigation */}
                <div className="mb-10">
                    <Link href="/staff" className="inline-flex items-center text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Back to All Specialists
                    </Link>
                </div>

                {/* Profile Container */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        
                        {/* Left: Image */}
                        <div className="md:w-2/5 relative">
                            <div className="aspect-[3/4] md:h-full relative overflow-hidden">
                                <img 
                                    src={doctor.image} 
                                    alt={doctor.name} 
                                    className="w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <h1 className="text-3xl font-bold mb-1">{doctor.name}</h1>
                                    <p className="text-violet-300 font-semibold">{doctor.specialty}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Details */}
                        <div className="md:w-3/5 p-8 md:p-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-4">Professional Overview</h2>
                            
                            <p className="text-gray-600 leading-relaxed mb-8">
                                {doctor.bio}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Education & Credentials</h3>
                                    <p className="text-gray-600">{doctor.education}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Experience</h3>
                                    <p className="text-gray-600">{doctor.experience}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-5 h-5 text-violet-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    Working Schedule
                                </h3>
                                <p className="text-gray-600 font-medium">{doctor.schedule}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 bg-violet-600 text-white font-bold py-4 px-6 rounded-full hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/30 text-center">
                                    Book Appointment
                                </button>
                                <a href={`mailto:${doctor.contact}`} className="flex-1 bg-white text-gray-900 font-bold py-4 px-6 rounded-full border border-gray-200 hover:border-violet-600 hover:text-violet-600 transition-colors text-center flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    Send Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
