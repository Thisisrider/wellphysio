"use client"

import { useLockBodyScroll } from "@/hooks/StopScroll";
import { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaSearch, FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Image from "next/image";

export default function Header() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    
    // Dynamic search and mobile menu states
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobilePagesOpen, setMobilePagesOpen] = useState(false);
    const [mobileDeptOpen, setMobileDeptOpen] = useState(false);
    const [mobileElementsOpen, setMobileElementsOpen] = useState(false);
    
    const searchInputRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    useLockBodyScroll(menuOpen)

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
                            placeholder="Search..." 
                            className="flex-1 bg-transparent border-none outline-none text-white px-4 text-lg placeholder-gray-300"
                        />
                        <button onClick={() => setSearchOpen(false)} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                            <FaTimes size={24} />
                        </button>
                    </div>

                    {/* Menu */}
                    <ul className={`hidden lg:flex items-center gap-8 font-semibold text-sm transition-opacity duration-300 ${searchOpen ? "opacity-0" : "opacity-100"}`}>

                        <li className="cursor-pointer hover:text-gray-200">HOME</li>

                        <li className="group relative cursor-pointer flex items-center h-full">
                            <span className="flex items-center gap-1 hover:text-gray-200">
                                PAGES <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform duration-300" />
                            </span>
                            {/* Bridge + Dropdown */}
                            <div className="absolute top-[100%] pt-4 left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 w-48 z-50">
                                <div className="bg-white text-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-100">
                                    <ul className="py-2 font-normal">
                                        <li className="px-6 py-2.5 hover:bg-violet-50 hover:text-violet-600 transition-colors">About Us</li>
                                        <li className="px-6 py-2.5 hover:bg-violet-50 hover:text-violet-600 transition-colors">Our Doctors</li>
                                        <li className="px-6 py-2.5 hover:bg-violet-50 hover:text-violet-600 transition-colors">Patient Stories</li>
                                        <li className="px-6 py-2.5 hover:bg-violet-50 hover:text-violet-600 transition-colors">Pricing</li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className="group relative cursor-pointer flex items-center h-full">
                            <span className="flex items-center gap-1 hover:text-gray-200">
                                DEPARTMENTS <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform duration-300" />
                            </span>
                            {/* Mega Menu Container */}
                            <div className="absolute top-[100%] pt-4 -left-[200px] w-[750px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                                <div className="bg-white text-gray-800 shadow-2xl rounded-2xl overflow-hidden border border-gray-100 flex">
                                    <div className="flex-1 p-8 grid grid-cols-2 gap-x-8 gap-y-6">
                                        <div>
                                            <h3 className="text-violet-800 font-bold mb-4 uppercase text-xs tracking-wider border-b pb-2">Medical</h3>
                                            <ul className="space-y-3 font-normal">
                                                <li className="hover:text-violet-600 hover:translate-x-1 transition-all flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span> Cardiology
                                                </li>
                                                <li className="hover:text-violet-600 hover:translate-x-1 transition-all flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span> Neurology
                                                </li>
                                                <li className="hover:text-violet-600 hover:translate-x-1 transition-all flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span> Orthopedics
                                                </li>
                                                <li className="hover:text-violet-600 hover:translate-x-1 transition-all flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span> Pediatrics
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-violet-800 font-bold mb-4 uppercase text-xs tracking-wider border-b pb-2">Surgical & Dental</h3>
                                            <ul className="space-y-3 font-normal">
                                                <li className="hover:text-violet-600 hover:translate-x-1 transition-all flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span> General Surgery
                                                </li>
                                                <li className="hover:text-violet-600 hover:translate-x-1 transition-all flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span> Dental Care
                                                </li>
                                                <li className="hover:text-violet-600 hover:translate-x-1 transition-all flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span> Eye Care
                                                </li>
                                                <li className="hover:text-violet-600 hover:translate-x-1 transition-all flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span> ENT Specialist
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="w-[280px] bg-violet-50 p-6 flex flex-col justify-center border-l border-violet-100">
                                        <div className="relative w-full h-32 rounded-xl overflow-hidden mb-4 shadow-inner">
                                            <Image src="/specialized-image.jpg" alt="Specialized Care" fill className="object-cover" />
                                        </div>
                                        <h4 className="font-bold text-violet-900 mb-2">Need Immediate Care?</h4>
                                        <p className="text-xs text-gray-600 mb-4 leading-relaxed font-normal">Our emergency department is open 24/7 with specialized doctors on standby.</p>
                                        <button className="text-sm bg-violet-600 text-white py-2.5 rounded-lg hover:bg-violet-700 transition-colors font-semibold shadow-md cursor-pointer">
                                            View All Departments
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="cursor-pointer hover:text-gray-200">
                            CONTACT
                        </li>

                        <li className="cursor-pointer hover:text-gray-200">
                            NEWS
                        </li>

                        <li className="group relative cursor-pointer flex items-center h-full">
                            <span className="flex items-center gap-1 hover:text-gray-200">
                                ELEMENTS <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform duration-300" />
                            </span>
                            <div className="absolute top-[100%] pt-4 -left-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 w-44 z-50">
                                <div className="bg-white text-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-100">
                                    <ul className="py-2 font-normal">
                                        <li className="px-6 py-2.5 hover:bg-violet-50 hover:text-violet-600 transition-colors">Typography</li>
                                        <li className="px-6 py-2.5 hover:bg-violet-50 hover:text-violet-600 transition-colors">Buttons</li>
                                        <li className="px-6 py-2.5 hover:bg-violet-50 hover:text-violet-600 transition-colors">Icons</li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className="cursor-pointer hover:text-gray-200">
                            BOOK AN APPOINTMENT
                        </li>

                    </ul>


                    {/* Icons */}
                    <div className={`flex items-center gap-6 text-lg transition-opacity duration-300 ${searchOpen ? "opacity-0" : "opacity-100"}`}>
                        <FaShoppingCart className="cursor-pointer hover:text-violet-300 transition-colors" />
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

                <ul className="flex flex-col font-semibold text-xl">
                    <li className="cursor-pointer border-b border-violet-500/50 p-4 px-6 hover:bg-violet-600 transition-colors" onClick={() => setMenuOpen(false)}>HOME</li>
                    
                    {/* PAGES Accordion */}
                    <li className="border-b border-violet-500/50">
                        <div 
                            className="flex justify-between items-center cursor-pointer hover:bg-violet-600 p-4 px-6 transition-colors" 
                            onClick={() => setMobilePagesOpen(!mobilePagesOpen)}
                        >
                            PAGES <FaChevronDown className={`transition-transform duration-300 ${mobilePagesOpen ? "rotate-180" : ""}`} size={16} />
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 bg-violet-800 ${mobilePagesOpen ? "max-h-60" : "max-h-0"}`}>
                            <ul className="flex flex-col text-lg font-normal py-2 px-8">
                                <li className="py-2 hover:text-violet-300 transition-colors cursor-pointer border-b border-violet-700/50 last:border-none">About Us</li>
                                <li className="py-2 hover:text-violet-300 transition-colors cursor-pointer border-b border-violet-700/50 last:border-none">Our Doctors</li>
                                <li className="py-2 hover:text-violet-300 transition-colors cursor-pointer border-b border-violet-700/50 last:border-none">Patient Stories</li>
                                <li className="py-2 hover:text-violet-300 transition-colors cursor-pointer border-b border-violet-700/50 last:border-none">Pricing</li>
                            </ul>
                        </div>
                    </li>

                    {/* DEPARTMENTS Accordion */}
                    <li className="border-b border-violet-500/50">
                        <div 
                            className="flex justify-between items-center cursor-pointer hover:bg-violet-600 p-4 px-6 transition-colors" 
                            onClick={() => setMobileDeptOpen(!mobileDeptOpen)}
                        >
                            DEPARTMENTS <FaChevronDown className={`transition-transform duration-300 ${mobileDeptOpen ? "rotate-180" : ""}`} size={16} />
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 bg-violet-800 ${mobileDeptOpen ? "max-h-[500px]" : "max-h-0"}`}>
                            <div className="py-4 px-8 text-base font-normal">
                                <h4 className="text-violet-300 font-bold mb-2 text-sm uppercase tracking-wider">Medical</h4>
                                <ul className="flex flex-col mb-4 space-y-2 pl-2">
                                    <li className="hover:text-white transition-colors cursor-pointer">Cardiology</li>
                                    <li className="hover:text-white transition-colors cursor-pointer">Neurology</li>
                                    <li className="hover:text-white transition-colors cursor-pointer">Orthopedics</li>
                                    <li className="hover:text-white transition-colors cursor-pointer">Pediatrics</li>
                                </ul>
                                <h4 className="text-violet-300 font-bold mb-2 text-sm uppercase tracking-wider">Surgical & Dental</h4>
                                <ul className="flex flex-col space-y-2 pl-2">
                                    <li className="hover:text-white transition-colors cursor-pointer">General Surgery</li>
                                    <li className="hover:text-white transition-colors cursor-pointer">Dental Care</li>
                                    <li className="hover:text-white transition-colors cursor-pointer">Eye Care</li>
                                    <li className="hover:text-white transition-colors cursor-pointer">ENT Specialist</li>
                                </ul>
                            </div>
                        </div>
                    </li>

                    <li className="cursor-pointer border-b border-violet-500/50 p-4 px-6 hover:bg-violet-600 transition-colors" onClick={() => setMenuOpen(false)}>CONTACT</li>
                    <li className="cursor-pointer border-b border-violet-500/50 p-4 px-6 hover:bg-violet-600 transition-colors" onClick={() => setMenuOpen(false)}>NEWS</li>
                    
                    {/* ELEMENTS Accordion */}
                    <li className="border-b border-violet-500/50">
                        <div 
                            className="flex justify-between items-center cursor-pointer hover:bg-violet-600 p-4 px-6 transition-colors" 
                            onClick={() => setMobileElementsOpen(!mobileElementsOpen)}
                        >
                            ELEMENTS <FaChevronDown className={`transition-transform duration-300 ${mobileElementsOpen ? "rotate-180" : ""}`} size={16} />
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 bg-violet-800 ${mobileElementsOpen ? "max-h-48" : "max-h-0"}`}>
                            <ul className="flex flex-col text-lg font-normal py-2 px-8">
                                <li className="py-2 hover:text-violet-300 transition-colors cursor-pointer border-b border-violet-700/50 last:border-none">Typography</li>
                                <li className="py-2 hover:text-violet-300 transition-colors cursor-pointer border-b border-violet-700/50 last:border-none">Buttons</li>
                                <li className="py-2 hover:text-violet-300 transition-colors cursor-pointer border-b border-violet-700/50 last:border-none">Icons</li>
                            </ul>
                        </div>
                    </li>

                    <li className="cursor-pointer p-4 px-6 text-violet-300 font-bold hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>BOOK AN APPOINTMENT</li>
                </ul>

            </div>

        </header>
    );
}