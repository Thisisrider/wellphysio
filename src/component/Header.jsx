"use client"

import { useLockBodyScroll } from "@/hooks/StopScroll";
import { useState, useEffect, useRef, useMemo } from "react";
import {
    FaUser, FaSearch, FaBars, FaChevronDown, FaTimes, FaHome, FaInfoCircle, FaUserMd,
    FaCalendarAlt, FaPhoneAlt, FaHeartbeat, FaCheckCircle, FaLock,
    FaChevronRight, FaPlus, FaMinus, FaSignInAlt, FaSignOutAlt, FaFileDownload, FaRunning
} from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { teamMembers } from "@/data/staff";
import { CLINICAL_TREATMENTS } from "@/data/physiotherapy";


// Clinic resource pages
const CLINIC_PAGES = [
    { title: "Book Online Appointment", description: "Schedule a visit with a specialist therapist in seconds.", href: "/book-appointment" },
    { title: "Meet Our Physiotherapists", description: "View qualifications, specialties, and schedules of our team.", href: "/staff" },
    { title: "Patient Recovery Stories", description: "Read success stories from patients who restored their mobility.", href: "/#reviews" },
    { title: "Treatment Pricing & Insurance", description: "View our session pricing, rehabilitation packages, and partner networks.", href: "/#pricing" },
    { title: "About Our Clinic", description: "Learn about Well Physio's advanced equipment, standards, and care team.", href: "/about" },
    { title: "Contact & Location", description: "Get physical location maps, emergency consultation lines, and hours.", href: "/#contact" }
];

// Pre-grouped clinical treatments to completely avoid O(n) array filtering inside the render function on every update.
// Grouping runs once at module initialization with O(n) time and space complexity, reducing subsequent render times to O(1).
const REHAB_SPECIALTIES = CLINICAL_TREATMENTS.filter(t => t.category === "Rehab Specialties");
const CLINICAL_MODALITIES_ALL = CLINICAL_TREATMENTS.filter(t => t.category === "Therapeutic Techniques");
const CLINICAL_MODALITIES_LIMIT = CLINICAL_MODALITIES_ALL.slice(0, 5);
const WELLNESS_PROGRAMS_ALL = CLINICAL_TREATMENTS.filter(t => t.category === "Wellness Programs");
const WELLNESS_PROGRAMS_LIMIT = WELLNESS_PROGRAMS_ALL.slice(0, 5);

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    // Search states
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // User portal states
    const [userPortalOpen, setUserPortalOpen] = useState(false);
    const [userSession, setUserSession] = useState(null);
    const [loginEmail, setLoginEmail] = useState("patient@wellphysio.com");
    const [loginPassword, setLoginPassword] = useState("password123");

    // Mobile menu accordions
    const [mobileRehabOpen, setMobileRehabOpen] = useState(false);
    const [mobileClinicOpen, setMobileClinicOpen] = useState(false);
    const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
    const [mobilePortalOpen, setMobilePortalOpen] = useState(false);

    const searchInputRef = useRef(null);
    const portalRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    // Close user portal dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (portalRef.current && !portalRef.current.contains(event.target)) {
                setUserPortalOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useLockBodyScroll(menuOpen);

    // Live search filters memoized to avoid redundant calculations.
    // Pre-calculating the lowercase search term outside the loop keeps it extremely fast (O(1) on re-renders, O(n) only when searchTerm changes).
    const { filteredTreatments, filteredDoctors, filteredPages } = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) {
            return { filteredTreatments: [], filteredDoctors: [], filteredPages: [] };
        }

        const treatments = CLINICAL_TREATMENTS.filter(t =>
            (t.title && t.title.toLowerCase().includes(query)) ||
            (t.description && t.description.toLowerCase().includes(query)) ||
            (t.keywords && t.keywords.some(k => k.toLowerCase().includes(query)))
        );

        const doctors = teamMembers.filter(doc =>
            (doc.name && doc.name.toLowerCase().includes(query)) ||
            (doc.specialty && doc.specialty.toLowerCase().includes(query)) ||
            (doc.education && doc.education.toLowerCase().includes(query))
        );

        const pages = CLINIC_PAGES.filter(p =>
            (p.title && p.title.toLowerCase().includes(query)) ||
            (p.description && p.description.toLowerCase().includes(query))
        );

        return {
            filteredTreatments: treatments,
            filteredDoctors: doctors,
            filteredPages: pages
        };
    }, [searchTerm]);

    // Trigger demo login
    const handleDemoLogin = (e) => {
        e.preventDefault();
        setUserSession({
            id: "WP-8942",
            name: "John Doe",
            email: loginEmail,
            phone: "+91 98765 43210",
            avatar: "",
            rehabPlan: {
                name: "Knee Joint Strengthening Plan",
                progress: 75,
                stretches: "4 / 6 exercises completed today"
            },
            nextAppointment: {
                doctor: "Dr. Sarah Jenkins",
                specialty: "Lead Physiotherapist",
                date: "June 2, 2026",
                time: "10:00 AM"
            },
            pendingInvoice: 80.00
        });
    };

    return (
        <header className={`sticky top-0 left-0 w-full z-50 transition-all duration-300`}>

            {/* TOP BAR */}


            {/* NAVBAR */}
            <nav className={`transition-scale antialiased delay-200 duration-600 ${isSticky
                ? "inset-0 bg-violet-800/90 text-white shadow-md w-full"
                : "bg-violet-800 text-white md:scale-x-90 mx-auto rounded-2xl"
                }`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 relative">

                    {/* Search Overlay */}
                    <div className={`absolute inset-0 bg-violet-900 rounded-2xl z-20 flex items-center px-6 transition-all duration-300 ${searchOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                        <FaSearch className="text-gray-300 text-xl" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search treatments, specialists, or pages..."
                            className="flex-1 bg-transparent border-none outline-none text-white px-4 text-lg placeholder-gray-300"
                        />
                        <button onClick={() => { setSearchOpen(false); setSearchTerm(""); }} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                            <FaTimes size={24} />
                        </button>

                        {/* Live Search Results Dropdown inside the search overlay */}
                        {searchOpen && (
                            <div className="absolute left-0 right-0 top-[100%] mt-2 bg-white text-gray-800 shadow-2xl rounded-2xl border border-gray-100 overflow-hidden max-h-[480px] overflow-y-auto z-[60] w-full p-6 font-normal">
                                {searchTerm.trim() === "" ? (
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Popular Searches</h4>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {["Back Pain", "Sports Injury", "Dry Needling", "Dr. Sarah Jenkins", "Pricing", "Book Online"].map(item => (
                                                <button
                                                    key={item}
                                                    onClick={() => setSearchTerm(item)}
                                                    className="text-xs font-semibold bg-violet-50 text-violet-700 px-3 py-1.5 rounded-full hover:bg-violet-100 cursor-pointer transition-colors"
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="bg-violet-50/40 p-3 rounded-xl border border-violet-100 flex items-start gap-3">
                                            <div className="p-2 bg-violet-100 text-violet-600 rounded-lg">
                                                <FaHeartbeat size={16} />
                                            </div>
                                            <div>
                                                <h5 className="text-xs font-bold text-violet-800">Advanced Physical Rehabilitation</h5>
                                                <p className="text-[11px] text-gray-500 leading-normal mt-0.5">
                                                    Search our specialized programs (e.g. "manual therapy"), practitioner schedules, or use booking tags to jump to a page instantly.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {/* Treatments Matches */}
                                        {filteredTreatments.length > 0 && (
                                            <div>
                                                <h4 className="text-xs font-bold text-violet-800 uppercase tracking-wider border-b pb-1.5 mb-2.5">
                                                    Physiotherapy Treatments ({filteredTreatments.length})
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {filteredTreatments.map(item => (
                                                        <Link
                                                            key={item.slug}
                                                            href={item.slug}
                                                            onClick={() => { setSearchOpen(false); setSearchTerm(""); }}
                                                            className="p-2.5 hover:bg-violet-50 rounded-xl flex items-start gap-2.5 transition-all group"
                                                        >
                                                            <div className="p-2 bg-violet-100 text-violet-600 rounded-lg font-bold">
                                                                🏃
                                                            </div>
                                                            <div className="min-w-0">
                                                                <h5 className="text-xs font-bold text-gray-800 group-hover:text-violet-700 transition-colors">{item.title}</h5>
                                                                <p className="text-[10px] text-gray-500 leading-snug mt-0.5">{item.description}</p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Specialists Matches */}
                                        {filteredDoctors.length > 0 && (
                                            <div>
                                                <h4 className="text-xs font-bold text-violet-800 uppercase tracking-wider border-b pb-1.5 mb-2.5">
                                                    Meet Our Specialists ({filteredDoctors.length})
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {filteredDoctors.map(doc => (
                                                        <Link
                                                            key={doc.id}
                                                            href={`/staff/${doc.id}`}
                                                            onClick={() => { setSearchOpen(false); setSearchTerm(""); }}
                                                            className="p-2.5 hover:bg-violet-50 rounded-xl flex items-center gap-3 transition-all group"
                                                        >
                                                            <img src={doc.image} alt={doc.name} className="w-10 h-10 rounded-full object-cover border border-violet-100" />
                                                            <div>
                                                                <h5 className="text-xs font-bold text-gray-800 group-hover:text-violet-700 transition-colors">{doc.name}</h5>
                                                                <p className="text-[10px] text-violet-600 font-semibold">{doc.specialty}</p>
                                                                <p className="text-[9px] text-gray-400">Experience: {doc.experience} • Rating: ★ {doc.rating}</p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Page Matches */}
                                        {filteredPages.length > 0 && (
                                            <div>
                                                <h4 className="text-xs font-bold text-violet-800 uppercase tracking-wider border-b pb-1.5 mb-2.5">
                                                    Site Pages & Help ({filteredPages.length})
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {filteredPages.map(page => (
                                                        <Link
                                                            key={page.title}
                                                            href={page.href}
                                                            onClick={() => { setSearchOpen(false); setSearchTerm(""); }}
                                                            className="p-2.5 hover:bg-violet-50 rounded-xl flex items-start gap-2.5 transition-all group"
                                                        >
                                                            <div className="p-2 bg-violet-100 text-violet-600 rounded-lg mt-0.5">
                                                                <FaInfoCircle size={12} />
                                                            </div>
                                                            <div>
                                                                <h5 className="text-xs font-bold text-gray-800 group-hover:text-violet-700 transition-colors">{page.title}</h5>
                                                                <p className="text-[10px] text-gray-500 leading-snug mt-0.5">{page.description}</p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Zero results state */}
                                        {filteredTreatments.length === 0 && filteredDoctors.length === 0 && filteredPages.length === 0 && (
                                            <div className="text-center py-8">
                                                <p className="text-sm font-bold text-gray-600">No matches found for "{searchTerm}"</p>
                                                <p className="text-xs text-gray-400 mt-1">Try searching for keywords like "knee", "spine", "Sarah" or "pricing".</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Menu */}
                    <ul className={`hidden lg:flex items-center gap-8 font-semibold text-sm transition-opacity duration-300 ${searchOpen ? "opacity-0" : "opacity-100"}`}>

                        <li>
                            <Link href="/" className="cursor-pointer hover:text-gray-200 uppercase">HOME</Link>
                        </li>

                        {/* Dropdown: OUR CLINIC */}
                        <li className="group relative cursor-pointer flex items-center h-full">
                            <span className="flex items-center gap-1 hover:text-gray-200 uppercase">
                                OUR CLINIC <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform duration-300" />
                            </span>
                            {/* Dropdown menu */}
                            <div className="absolute top-[100%] pt-4 left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 w-60 z-50">
                                <div className="bg-white text-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-100">
                                    <ul className="py-2 font-normal text-xs font-semibold">
                                        <li className="px-6 py-2.5 hover:bg-violet-50 hover:text-violet-600 transition-colors">
                                            <Link href="/about" className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span> About Well Physio
                                            </Link>
                                        </li>
                                        <li className="px-6 py-2.5 hover:bg-violet-50 hover:text-violet-600 transition-colors">
                                            <Link href="/staff" className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span> Meet Our Specialists
                                            </Link>
                                        </li>
                                        <li className="px-6 py-2.5 hover:bg-violet-50 hover:text-violet-600 transition-colors">
                                            <Link href="/#reviews" className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span> Patient Stories
                                            </Link>
                                        </li>
                                        <li className="px-6 py-2.5 hover:bg-violet-50 hover:text-violet-600 transition-colors">
                                            <Link href="/#pricing" className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span> Pricing & Session Fees
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        {/* Mega Menu: TREATMENTS */}
                        <li className="group relative cursor-pointer flex items-center h-full">
                            <span className="flex items-center gap-1 hover:text-gray-200 uppercase">
                                PHYSIOTHERAPY <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform duration-300" />
                            </span>
                            {/* Mega Menu container */}
                            <div className="absolute top-[100%] pt-4 -left-[200px] w-5xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                                <div className="bg-white text-gray-800 shadow-2xl rounded-2xl overflow-hidden border border-gray-100 flex">
                                    {/* Mega Menu Grid Links */}
                                    <div className="flex-1 p-8 grid grid-cols-3 gap-x-8 gap-y-6">
                                        <div>
                                            <h3 className="text-violet-800 font-bold mb-4 uppercase text-xs tracking-wider border-b pb-2 flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-violet-600"></span> Rehab Specialties
                                            </h3>
                                            <ul className="space-y-4 font-normal text-xs leading-tight">
                                                {
                                                    REHAB_SPECIALTIES.map(
                                                        (treatment) => {
                                                            return (
                                                                <li key={treatment.slug} className="hover:text-violet-600 hover:translate-x-1 transition-all">
                                                                    <Link href={`/treatments/${treatment.slug}`} className="block">
                                                                        <p className="font-bold text-gray-800">{treatment.title}</p>
                                                                        <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">
                                                                            {treatment.description}
                                                                        </p>
                                                                    </Link>
                                                                </li>
                                                            )
                                                        }
                                                    )
                                                }
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-violet-800 font-bold mb-4 uppercase text-xs tracking-wider border-b pb-2 flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-violet-600"></span> Clinical Modalities
                                            </h3>
                                            <ul className="space-y-4 font-normal text-xs leading-tight">
                                                {
                                                    CLINICAL_MODALITIES_LIMIT.map((treatment) => {
                                                        return (
                                                            <li key={treatment.slug} className="hover:text-violet-600 hover:translate-x-1 transition-all">
                                                                <Link href={`/treatments/${treatment.slug}`} className="block">
                                                                    <p className="font-bold text-gray-800">
                                                                        {treatment.title}
                                                                    </p>
                                                                    <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">
                                                                        {treatment.description}
                                                                    </p>
                                                                </Link>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-violet-800 font-bold mb-4 uppercase text-xs tracking-wider border-b pb-2 flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-violet-600"></span> Wellness Program
                                            </h3>
                                            <ul className="space-y-4 font-normal text-xs leading-tight">
                                                {
                                                    WELLNESS_PROGRAMS_LIMIT.map((treatment) => {
                                                        return (
                                                            <li key={treatment.slug} className="hover:text-violet-600 hover:translate-x-1 transition-all">
                                                                <Link href={`/treatments/${treatment.slug}`} className="block">
                                                                    <p className="font-bold text-gray-800">
                                                                        {treatment.title}
                                                                    </p>
                                                                    <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">
                                                                        {treatment.description}
                                                                    </p>
                                                                </Link>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Mega Menu side panel */}
                                    <div className="w-[280px] bg-violet-50 p-6 flex flex-col justify-center border-l border-violet-100">
                                        <div className="relative w-full h-32 rounded-xl overflow-hidden mb-4 shadow-inner">
                                            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=300&auto=format&fit=crop" alt="Specialized Care" className="object-cover w-full h-full" />
                                        </div>
                                        <h4 className="font-bold text-violet-900 mb-2">Free Posture Checkup</h4>
                                        <p className="text-xs text-gray-600 mb-4 leading-relaxed font-normal">Take a quick 2-minute online assessment before booking a clinical session.</p>
                                        <Link href="/book-appointment" className="text-center text-sm bg-violet-600 text-white py-2.5 rounded-lg hover:bg-violet-700 transition-colors font-semibold shadow-md cursor-pointer">
                                            Start Free checkup
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>

                        {/* Dropdown: PATIENT RESOURCES */}
                        <li className="group relative cursor-pointer flex items-center h-full">
                            <span className="flex items-center gap-1 hover:text-gray-200 uppercase">
                                RESOURCES <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform duration-300" />
                            </span>
                            <div className="absolute top-[100%] pt-4 -left-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 w-52 z-50">
                                <div className="bg-white text-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-100">
                                    <ul className="py-2 font-normal text-xs font-semibold">
                                        <li className="px-6 py-2.5 hover:bg-violet-50 hover:text-violet-600 transition-colors">
                                            <Link href="/book-appointment" className="flex items-center gap-2">
                                                <FaRunning className="text-violet-500" /> Symmetry Check Tool
                                            </Link>
                                        </li>
                                        <li className="px-6 py-2.5 hover:bg-violet-50 hover:text-violet-600 transition-colors">
                                            <Link href="/book-appointment" className="flex items-center gap-2">
                                                <FaUserMd className="text-violet-500" /> BMI & Health Calculator
                                            </Link>
                                        </li>
                                        <li className="px-6 py-2.5 hover:bg-violet-50 hover:text-violet-600 transition-colors">
                                            <Link href="/book-appointment" className="flex items-center gap-2">
                                                <FaFileDownload className="text-violet-500" /> Exercise Sheets (PDF)
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li>
                            <Link href="/#contact" className="cursor-pointer hover:text-gray-200 uppercase">CONTACT</Link>
                        </li>

                        <li>
                            <Link href="/book-appointment" className="cursor-pointer hover:text-gray-200 uppercase">BOOK AN APPOINTMENT</Link>
                        </li>

                    </ul>


                    {/* Icons */}
                    <div ref={portalRef} className={`flex items-center gap-6 text-lg transition-opacity duration-300 ${searchOpen ? "opacity-0" : "opacity-100"}`}>

                        {/* secure user portal icon replaces cart icon */}
                        <div className="relative flex items-center justify-center">
                            <button
                                onMouseEnter={() => setUserPortalOpen(true)}
                                onClick={() => setUserPortalOpen(!userPortalOpen)}
                                className="cursor-pointer hover:text-violet-300 transition-colors flex items-center justify-center relative text-white"
                                aria-label="Patient Portal"
                            >
                                <FaUser />
                                {userSession && (
                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 border border-violet-850 rounded-full animate-pulse" />
                                )}
                            </button>

                            {/* Portal Dropdown Menu */}
                            {userPortalOpen && (
                                <div className="absolute -right-75 lg:right-0 top-full pt-4 w-80 z-50" onMouseLeave={() => setUserPortalOpen(false)}>
                                    <div className="bg-white text-gray-800 shadow-2xl rounded-2xl border border-gray-100 overflow-hidden font-normal text-sm leading-normal">
                                        {userSession ? (
                                            /* Logged In Portal Panel */
                                            <div>
                                                {/* Patient banner details */}
                                                <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-base">
                                                            {userSession.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-xs leading-none mb-1">{userSession.name}</h4>
                                                            <p className="text-[10px] text-violet-100">ID: {userSession.id} • Active Rehab</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Patient Health metrics */}
                                                <div className="p-4 space-y-4">
                                                    <div className="bg-violet-50/70 p-3 rounded-xl border border-violet-100">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-[10px] font-bold text-violet-800 uppercase tracking-wide">My Recovery Goal</span>
                                                            <span className="text-xs font-extrabold text-violet-600">{userSession.rehabPlan.progress}%</span>
                                                        </div>
                                                        <p className="text-xs font-bold text-gray-800 mb-1.5">{userSession.rehabPlan.name}</p>
                                                        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                                            <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full" style={{ width: `${userSession.rehabPlan.progress}%` }} />
                                                        </div>
                                                        <p className="text-[9px] text-gray-500 mt-1 font-medium">{userSession.rehabPlan.stretches}</p>
                                                    </div>

                                                    {/* Next rehab consult */}
                                                    <div>
                                                        <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Next Guided Consultation</h5>
                                                        <div className="flex items-start gap-2.5 p-2 bg-gray-50 rounded-xl border border-gray-100">
                                                            <div className="p-2 bg-violet-100 rounded-lg text-violet-600 mt-0.5">
                                                                <FaCalendarAlt size={12} />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-xs font-bold text-gray-800 truncate">{userSession.nextAppointment.doctor}</p>
                                                                <p className="text-[10px] text-gray-400">{userSession.nextAppointment.specialty}</p>
                                                                <p className="text-xs font-bold text-violet-700 mt-1">
                                                                    {userSession.nextAppointment.date} @ {userSession.nextAppointment.time}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Invoices list */}
                                                    <ul className="text-xs font-semibold text-gray-600 border-t pt-3 space-y-2">
                                                        <li className="flex justify-between items-center hover:text-violet-600 cursor-pointer transition-colors">
                                                            <span>Home stretching guide</span>
                                                            <span className="text-[9px] bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded-full">PDF ready</span>
                                                        </li>
                                                        <li className="flex justify-between items-center hover:text-violet-600 cursor-pointer transition-colors">
                                                            <span>Unpaid session invoice</span>
                                                            <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">Pending: ${userSession.pendingInvoice}</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                {/* Patient action footer */}
                                                <div className="bg-gray-50 p-3 border-t flex justify-between items-center text-xs">
                                                    <Link href="/book-appointment" onClick={() => setUserPortalOpen(false)} className="font-bold text-violet-600 hover:text-violet-700">
                                                        Book Consult
                                                    </Link>
                                                    <button
                                                        onClick={() => setUserSession(null)}
                                                        className="font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <FaSignOutAlt size={10} /> Sign Out
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            /* Login interface */
                                            <div className="p-5">
                                                <div className="text-center mb-4">
                                                    <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mx-auto mb-2">
                                                        <FaLock size={15} />
                                                    </div>
                                                    <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wide">Patient Portal Log In</h4>
                                                    <p className="text-[10px] text-gray-500 mt-1">Review active exercises, diagnostic notes & appointment slots.</p>
                                                </div>

                                                <form onSubmit={handleDemoLogin} className="space-y-3">
                                                    <div>
                                                        <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Patient ID / Email</label>
                                                        <input
                                                            type="email"
                                                            required
                                                            value={loginEmail}
                                                            onChange={(e) => setLoginEmail(e.target.value)}
                                                            className="w-full px-3 py-2 border rounded-lg text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Secure Password</label>
                                                        <input
                                                            type="password"
                                                            required
                                                            value={loginPassword}
                                                            onChange={(e) => setLoginPassword(e.target.value)}
                                                            className="w-full px-3 py-2 border rounded-lg text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none"
                                                        />
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        className="w-full py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg text-xs font-bold hover:shadow-lg transition-all duration-300 cursor-pointer"
                                                    >
                                                        Access Demo Portal
                                                    </button>
                                                </form>

                                                <p className="text-[9px] text-gray-400 text-center mt-3.5 leading-normal">
                                                    Accounts are generated during your clinic admission. Contact support for recovery details.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <FaSearch className="cursor-pointer hover:text-violet-300 transition-colors" onClick={() => setSearchOpen(true)} />
                        <FaBars
                            className="lg:hidden cursor-pointer hover:text-violet-300 transition-colors"
                            onClick={() => setMenuOpen(true)}
                        />
                    </div>

                </div>

            </nav>
            {/* MOBILE MENU */}
            <div className={`lg:hidden bg-violet-700 fixed -right-1 top-0 transition-all duration-500 ${menuOpen ? "right-0 w-full h-full" : "w-0 h-0 opacity-0"} text-white flex flex-col gap-5 z-[60] overflow-y-auto pb-8`}>

                <div className="flex justify-end p-4 border-b border-violet-500">
                    <button onClick={() => setMenuOpen(false)} className="text-3xl cursor-pointer hover:text-gray-300 transition-colors">
                        <IoMdCloseCircleOutline />
                    </button>
                </div>

                {/* Mobile Search input inside drawer */}
                <div className="p-4 border-b border-violet-500/50 relative">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search treatments, specialists..."
                            className="w-full bg-violet-850/60 border border-violet-500 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-violet-300 focus:outline-none"
                        />
                        <FaSearch className="absolute left-3.5 top-2.5 text-violet-300 text-xs" />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm("")} className="absolute right-3 top-2.5 text-violet-300 hover:text-white">
                                <FaTimes size={12} />
                            </button>
                        )}
                    </div>

                    {/* Mobile Dynamic search results popup */}
                    {searchTerm.trim() !== "" && (
                        <div className="absolute left-4 right-4 top-full mt-1 bg-white text-gray-800 shadow-xl rounded-xl p-4 max-h-[250px] overflow-y-auto z-[70] border border-gray-100">
                            {filteredTreatments.length === 0 && filteredDoctors.length === 0 && filteredPages.length === 0 ? (
                                <p className="text-[10px] text-center text-gray-400 py-2">No items match "{searchTerm}"</p>
                            ) : (
                                <div className="space-y-3 text-left">
                                    {filteredTreatments.slice(0, 3).map(item => (
                                        <Link key={item.slug} href={item.slug} onClick={() => { setMenuOpen(false); setSearchTerm(""); }} className="block p-1.5 hover:bg-violet-50 rounded-lg">
                                            <p className="text-[11px] font-bold text-gray-800">{item.title}</p>
                                            <p className="text-[9px] text-gray-400 truncate">{item.description}</p>
                                        </Link>
                                    ))}
                                    {filteredDoctors.slice(0, 3).map(doc => (
                                        <Link key={doc.id} href={`/staff/${doc.id}`} onClick={() => { setMenuOpen(false); setSearchTerm(""); }} className="block p-1.5 hover:bg-violet-50 rounded-lg flex items-center gap-2">
                                            <img src={doc.image} alt={doc.name} className="w-6 h-6 rounded-full object-cover" />
                                            <div>
                                                <p className="text-[11px] font-bold text-gray-800">{doc.name}</p>
                                                <p className="text-[9px] text-violet-600">{doc.specialty}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <ul className="flex flex-col font-semibold text-xl">
                    <li className="cursor-pointer border-b border-violet-500/50 p-4 px-6 hover:bg-violet-600 transition-colors" onClick={() => setMenuOpen(false)}>
                        <Link href="/">HOME</Link>
                    </li>

                    {/* PAGES Accordion (OUR CLINIC) */}
                    <li className="border-b border-violet-500/50">
                        <div
                            className="flex justify-between items-center cursor-pointer hover:bg-violet-600 p-4 px-6 transition-colors"
                            onClick={() => setMobileClinicOpen(!mobileClinicOpen)}
                        >
                            OUR CLINIC {mobileClinicOpen ? <FaMinus size={12} className="text-violet-300" /> : <FaPlus size={12} className="text-violet-300" />}
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 bg-violet-800 ${mobileClinicOpen ? "max-h-60" : "max-h-0"}`}>
                            <ul className="flex flex-col text-lg font-normal py-2 px-8">
                                <li className="py-2 hover:text-violet-300 transition-colors cursor-pointer border-b border-violet-700/50 last:border-none">
                                    <Link href="/about" onClick={() => setMenuOpen(false)}>About Well Physio</Link>
                                </li>
                                <li className="py-2 hover:text-violet-300 transition-colors cursor-pointer border-b border-violet-700/50 last:border-none">
                                    <Link href="/staff" onClick={() => setMenuOpen(false)}>Our Specialists</Link>
                                </li>
                                <li className="py-2 hover:text-violet-300 transition-colors cursor-pointer border-b border-violet-700/50 last:border-none">
                                    <Link href="/#reviews" onClick={() => setMenuOpen(false)}>Patient Stories</Link>
                                </li>
                                <li className="py-2 hover:text-violet-300 transition-colors cursor-pointer border-b border-violet-700/50 last:border-none">
                                    <Link href="/#pricing" onClick={() => setMenuOpen(false)}>Pricing Plans</Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    {/* DEPARTMENTS Accordion (TREATMENTS) */}
                    <li className="border-b border-violet-500/50">
                        <div
                            className="flex justify-between items-center cursor-pointer hover:bg-violet-600 p-4 px-6 transition-colors"
                            onClick={() => setMobileRehabOpen(!mobileRehabOpen)}
                        >
                            PHYSIOTHERAPY {mobileRehabOpen ? <FaMinus size={12} className="text-violet-300" /> : <FaPlus size={12} className="text-violet-300" />}
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 bg-violet-800 ${mobileRehabOpen ? "max-h-[500px]" : "max-h-0"}`}>
                            <div className="py-4 px-8 text-base font-normal">
                                <h4 className="text-violet-300 font-bold mb-2 text-sm uppercase tracking-wider">Rehab Specialties</h4>
                                <ul className="flex flex-col mb-4 space-y-2 pl-2">
                                    {
                                        REHAB_SPECIALTIES.map(
                                            (treatment) => {
                                                return (
                                                    <li key={treatment.slug} className="hover:text-white transition-colors cursor-pointer">
                                                        <Link href={`/treatments/${treatment.slug}`} onClick={() => setMenuOpen(false)}>{treatment.title}</Link>
                                                    </li>
                                                )
                                            }
                                        )
                                    }
                                </ul>
                                <h4 className="text-violet-300 font-bold mb-2 text-sm uppercase tracking-wider">Clinical Modalities</h4>
                                <ul className="flex flex-col mb-4 space-y-2 pl-2">
                                    {
                                        CLINICAL_MODALITIES_ALL.map(
                                            (treatment) => {
                                                return (
                                                    <li key={treatment.slug} className="hover:text-white transition-colors cursor-pointer">
                                                        <Link href={`/treatments/${treatment.slug}`} onClick={() => setMenuOpen(false)}>{treatment.title}</Link>
                                                    </li>
                                                )
                                            }
                                        )
                                    }
                                </ul>
                                <h4 className="text-violet-300 font-bold mb-2 text-sm uppercase tracking-wider">Wellness Programs</h4>
                                <ul className="flex flex-col space-y-2 pl-2">
                                    {
                                        WELLNESS_PROGRAMS_ALL.map(
                                            (treatment) => {
                                                return (
                                                    <li key={treatment.slug} className="hover:text-white transition-colors cursor-pointer">
                                                        <Link href={`/treatments/${treatment.slug}`} onClick={() => setMenuOpen(false)}>{treatment.title}</Link>
                                                    </li>
                                                )
                                            }
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </li>

                    <li className="cursor-pointer border-b border-violet-500/50 p-4 px-6 hover:bg-violet-600 transition-colors" onClick={() => setMenuOpen(false)}>
                        <Link href="/#contact">CONTACT</Link>
                    </li>

                    {/* ELEMENTS Accordion (PATIENT RESOURCES) */}
                    <li className="border-b border-violet-500/50">
                        <div
                            className="flex justify-between items-center cursor-pointer hover:bg-violet-600 p-4 px-6 transition-colors"
                            onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                        >
                            RESOURCES {mobileResourcesOpen ? <FaMinus size={12} className="text-violet-300" /> : <FaPlus size={12} className="text-violet-300" />}
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 bg-violet-800 ${mobileResourcesOpen ? "max-h-48" : "max-h-0"}`}>
                            <ul className="flex flex-col text-lg font-normal py-2 px-8">
                                <li className="py-2 hover:text-violet-300 transition-colors cursor-pointer border-b border-violet-700/50 last:border-none">
                                    <Link href="/book-appointment" onClick={() => setMenuOpen(false)}>Symmetry Check Tool</Link>
                                </li>
                                <li className="py-2 hover:text-violet-300 transition-colors cursor-pointer border-b border-violet-700/50 last:border-none">
                                    <Link href="/book-appointment" onClick={() => setMenuOpen(false)}>BMI Calculator</Link>
                                </li>
                                <li className="py-2 hover:text-violet-300 transition-colors cursor-pointer border-b border-violet-700/50 last:border-none">
                                    <Link href="/book-appointment" onClick={() => setMenuOpen(false)}>Download Exercise PDF</Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    {/* Patient Portal mobile accordion */}
                    <li className="border-b border-violet-500/50">
                        <div
                            className="flex justify-between items-center cursor-pointer hover:bg-violet-600 p-4 px-6 transition-colors"
                            onClick={() => setMobilePortalOpen(!mobilePortalOpen)}
                        >
                            PATIENT PORTAL {mobilePortalOpen ? <FaMinus size={12} className="text-violet-300" /> : <FaPlus size={12} className="text-violet-300" />}
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 bg-violet-800 ${mobilePortalOpen ? "max-h-[380px]" : "max-h-0"}`}>
                            {userSession ? (
                                <div className="p-5 text-left text-base font-normal space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-violet-500/30 flex items-center justify-center font-bold text-sm">
                                            {userSession.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xs">{userSession.name}</h4>
                                            <p className="text-[10px] text-violet-300">Patient ID: {userSession.id}</p>
                                        </div>
                                    </div>
                                    <div className="bg-violet-900/60 p-3 rounded-lg border border-violet-500/30">
                                        <p className="text-[10px] uppercase font-bold text-violet-300 mb-1">Weekly Rehab Plan</p>
                                        <p className="font-bold text-[11px] mb-1">{userSession.rehabPlan.name}</p>
                                        <div className="w-full bg-violet-950 h-1.5 rounded-full overflow-hidden mb-1">
                                            <div className="bg-gradient-to-r from-fuchsia-400 to-violet-500 h-full" style={{ width: `${userSession.rehabPlan.progress}%` }} />
                                        </div>
                                        <p className="text-[9px] text-violet-300">{userSession.rehabPlan.stretches}</p>
                                    </div>
                                    <button
                                        onClick={() => setUserSession(null)}
                                        className="w-full py-2 bg-rose-600 hover:bg-rose-700 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                                    >
                                        <FaSignOutAlt size={11} /> Log Out Account
                                    </button>
                                </div>
                            ) : (
                                <div className="p-5 text-left text-xs font-normal space-y-3.5">
                                    <p className="text-[10px] text-violet-200 leading-normal">
                                        Access exercise lists, pain progress charts, and medical notes assigned by your therapist.
                                    </p>
                                    <button
                                        onClick={() => setUserSession({
                                            id: "WP-8942",
                                            name: "John Doe",
                                            email: "patient@wellphysio.com",
                                            phone: "+91 98765 43210",
                                            avatar: "",
                                            rehabPlan: {
                                                name: "Knee Joint Strengthening",
                                                progress: 75,
                                                stretches: "4 / 6 stretches completed today"
                                            },
                                            nextAppointment: {
                                                doctor: "Dr. Sarah Jenkins",
                                                specialty: "Lead Physiotherapist",
                                                date: "June 2, 2026",
                                                time: "10:00 AM"
                                            },
                                            pendingInvoice: 80.00
                                        })}
                                        className="w-full py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-lg rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1 cursor-pointer text-white"
                                    >
                                        <FaSignInAlt size={11} /> Log In (Quick Demo)
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>

                    <li className="cursor-pointer p-4 px-6 text-violet-300 font-bold hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
                        <Link href="/book-appointment">BOOK AN APPOINTMENT</Link>
                    </li>
                </ul>

            </div>

        </header>
    );
}