import React from 'react';

export default function VideoSection() {
    return (
        <section className="relative py-24 bg-white overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
                <div className="absolute top-20 right-10 md:right-32 w-72 h-72 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
                <div className="absolute bottom-20 left-10 md:left-32 w-72 h-72 bg-fuchsia-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-800 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-600"></span>
                        </span>
                        Watch Now
                    </div>

                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
                        Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">Our Care</span> Firsthand
                    </h2>

                    <p className="text-lg text-gray-600 leading-relaxed">
                        Take a closer look at our state-of-the-art facilities, advanced treatments, and hear directly from our dedicated medical professionals.
                    </p>
                </div>

                {/* Video Container */}
                <div className="relative mx-auto max-w-5xl group">
                    {/* Decorative glow behind video */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                    {/* 16:9 Responsive Video Wrapper */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 aspect-video z-10 border border-gray-100">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/bVNfEYoGGEo?si=IBYGUwi_SClbANK8&amp;start=36"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

            </div>
        </section>
    );
}
