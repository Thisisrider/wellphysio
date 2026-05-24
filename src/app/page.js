import BestDoctorSection from '@/component/BestDoctorSection'
import FeatureSection from '@/component/FeatureBox'
import HeroSection from '@/component/Herosection'
import OpdSection from '@/component/OpdSection'
import OurStaffSection from '@/component/OurStaffSection'
import QueryForm from '@/component/QueryForm'
import ReviewSection from '@/component/ReviewSection'
import VideoSection from '@/component/VideoSection'
import React from 'react'

export default function page() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <BestDoctorSection />
      <OpdSection />
      <QueryForm />
      <VideoSection />
      <OurStaffSection />
      <ReviewSection/>
    </div>
  )
}
