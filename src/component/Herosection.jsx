'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowCircleRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
    {
        id: 1,
        image: "/dentalbanner.jpg",
        title: "Expert Physiotherapy",
        subtitle: "Restore Your Mobility",
        description: "Experience advanced physiotherapy and personalized rehabilitation programs designed to help you live a pain-free, active life.",
        buttonText: "BOOK AN APPOINTMENT",
        link: "/book-appointment"
    },
    {
        id: 2,
        image: "/specialized-image.jpg",
        title: "Advanced Rehabilitation",
        subtitle: "For Better Results",
        description: "We utilize the latest in sports therapy and manual techniques to provide you with the most effective treatments.",
        buttonText: "BOOK AN APPOINTMENT",
        link: "/book-appointment"
    },
    {
        id: 3,
        image: "/dentalbanner.jpg",
        title: "Compassionate Care",
        subtitle: "For Every Patient",
        description: "Your health and recovery are our priority. We are committed to providing personalized and compassionate physical therapy.",
        buttonText: "BOOK AN APPOINTMENT",
        link: "/book-appointment"
    }
];

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="relative w-full h-150 bg-violet-800/90 overflow-hidden group">
            
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    {/* Background Image */}
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        sizes="100vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent"></div>

                    {/* Content */}
                    <div className="relative max-w-7xl mx-auto h-full flex items-center px-4">
                        <div className={`max-w-xl transition-all duration-1000 transform ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                            <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                                {slide.title} <br />
                                {slide.subtitle}
                            </h1>

                            <p className="mt-6 text-gray-600 text-lg">
                                {slide.description}
                            </p>

                            <Link href={slide.link} className="cursor-pointer group/btn mt-8 inline-flex items-center bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 overflow-hidden shadow-lg hover:shadow-violet-600/50">
                                <span className="whitespace-nowrap">
                                    {slide.buttonText}
                                </span>
                                <span className="w-0 opacity-0 group-hover/btn:w-6 group-hover/btn:opacity-100 group-hover/btn:ml-3 transition-all duration-300 delay-100 flex items-center justify-center">
                                    <FaArrowCircleRight />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 text-violet-900 hover:bg-white/50 transition-all opacity-0 group-hover:opacity-100 cursor-pointer backdrop-blur-md"
                aria-label="Previous slide"
            >
                <FaChevronLeft size={20} />
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 text-violet-900 hover:bg-white/50 transition-all opacity-0 group-hover:opacity-100 cursor-pointer backdrop-blur-md"
                aria-label="Next slide"
            >
                <FaChevronRight size={20} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                            index === currentSlide ? "bg-violet-600 w-8" : "bg-gray-400/60 hover:bg-violet-400"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
            
        </section>
    );
}