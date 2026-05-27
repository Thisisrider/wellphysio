import BestDoctorSection from '@/component/BestDoctorSection';
import FeatureSection from '@/component/FeatureBox';
import HeroSection from '@/component/Herosection';
import StatsCounter from '@/component/StatsCounter';
import OpdSection from '@/component/OpdSection';
import QueryForm from '@/component/QueryForm';
import VideoSection from '@/component/VideoSection';
import OurStaffSection from '@/component/OurStaffSection';
import ReviewSection from '@/component/ReviewSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <BestDoctorSection />
      <StatsCounter />
      <OpdSection />
      <QueryForm />
      <VideoSection />
      <OurStaffSection />
      <ReviewSection />
    </>
  );
}
