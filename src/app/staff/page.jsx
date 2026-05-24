import React from 'react';
import Link from 'next/link';
import { teamMembers } from '../../data/staff';
import Header from '../../component/Header'; // Assuming Header exists and can be imported

export default function StaffDirectoryPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* If the header is fixed or needs to be included on pages, we can include it here. 
                Assuming Header is global, we might not need it if layout.js handles it, 
                but just in case, we will focus on the main content area. */}
                
            <div className="pt-32 pb-24">
                {/* Background embellishments */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    
                    {/* Breadcrumb & Navigation */}
                    <div className="mb-8">
                        <Link href="/" className="inline-flex items-center text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Back to Home
                        </Link>
                    </div>

                    {/* Header Section */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-block bg-violet-100 text-violet-800 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm">
                            Medical Directory
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
                            Our Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">Medical Staff</span>
                        </h1>
                        
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Browse our extensive directory of highly qualified medical professionals. From specialized surgeons to dedicated pediatricians, our entire team is here for you.
                        </p>
                    </div>

                    {/* Full Team Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="group relative bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100 hover:-translate-y-2 transition-all duration-300">
                                {/* Image Container with Hover Overlay */}
                                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                                    <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                    
                                    {/* Hover Social Links */}
                                    <div className="absolute bottom-0 left-0 w-full p-6 z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="flex items-center justify-center gap-4">
                                            <a href="#" className="w-10 h-10 rounded-full bg-white text-violet-600 flex items-center justify-center hover:bg-violet-600 hover:text-white transition-colors duration-300 shadow-lg" aria-label="Twitter">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                                            </a>
                                            <a href="#" className="w-10 h-10 rounded-full bg-white text-violet-600 flex items-center justify-center hover:bg-violet-600 hover:text-white transition-colors duration-300 shadow-lg" aria-label="LinkedIn">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Card Content Area */}
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                    <p className="text-sm font-semibold text-violet-600 mb-4">{member.specialty}</p>
                                    <Link href={`/staff/${member.id}`} className="inline-flex items-center justify-center text-sm font-bold text-gray-700 hover:text-violet-600 transition-colors duration-300">
                                        View Profile 
                                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
