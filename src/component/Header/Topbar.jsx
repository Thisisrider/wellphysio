import React from 'react';
import { ImLocation2 } from "react-icons/im";
import { LuClock9 } from "react-icons/lu";

export default function Topbar() {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto flex items-center justify-center lg:justify-between px-4 py-3">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src="wp_logo.avif" alt="" className='w-25 h-25' />
                </div>

                {/* Info */}
                <div className="hidden lg:flex items-center text-sm/8">
                    <div className='border-r px-5'>
                        <p className="text-gray-500">Emergency Consult</p>
                        <p className="font-semibold text-lg text-violet-600">
                            +91 95715-33584
                        </p>
                    </div>

                    <div className='flex items-center px-5 border-r gap-3'>
                        <ImLocation2 size={"30"} style={{ color: "#7c3aed" }} />
                        <div>
                            <p className="font-medium">
                                D-111 Radhey Villa Apartment
                            </p>
                            <p className="text-gray-600">
                                Banipark Jaipur 302012
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center px-5 gap-3'>
                        <LuClock9 size={"30"} style={{ color: "#7c3aed" }} />
                        <div className=''>
                            <p>Monday – Saturday : 10:00AM - 08:00PM</p>
                            <p>Sunday : 10:00AM - 01:00PM</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
