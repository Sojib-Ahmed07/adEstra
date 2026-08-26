// import About from '@/components/About';
// import Hero from '../components/Hero';
// import TickerSlider from '@/components/Slider';
// import ExploreSection from '@/components/Explore';
// import ServicesSection from '@/components/Services';
// import ShowcaseSection from '@/components/Showcase';
// import TeamSection from '@/components/Members';
// import ReviewSection from '@/components/Review';
// import BlogSection from '@/components/Blog';
// import Footer from '@/components/Footer';

// export default function Home() {
//   return (
//     <main>
//       <Hero />
//       <About/>
//       <TickerSlider/>
//       <ExploreSection/>
//       <ServicesSection/>
//       <ShowcaseSection/>
//       <TeamSection/>
//       <ReviewSection/>
//       <BlogSection/>
//       <Footer/>
//     </main>
//   );
// }

'use client';

import React from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import TickerSlider from '@/components/Slider';
import ExploreSection from '@/components/Explore';
import ServicesSection from '@/components/Services';
import ShowcaseSection from '@/components/Showcase';
import TeamSection from '@/components/Members';
import ReviewSection from '@/components/Review';
import BlogSection from '@/components/Blog';


const BACKGROUND_VIDEO_URL = "https://res.cloudinary.com/dlefye5fi/video/upload/v1787184455/hero_bg_plixha.mp4";

export default function HomePage() {
  return (
    <>
      {/* Homepage Video Background */}
      <div className="relative min-h-[calc(100vh-80px)] bg-[#a0b8c8]">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover scale-105"
          >
            <source src={BACKGROUND_VIDEO_URL} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-slate-950/25 backdrop-blur-[0.5px]" />
        </div>

        {/* Hero Section Overlay */}
        <div className="relative z-10">
          <Hero />
        </div>
      </div>

      {/* Rest of Homepage Content */}
      <About />
      <TickerSlider />
      <ExploreSection />
      <ServicesSection />
      <ShowcaseSection />
      <TeamSection />
      <ReviewSection />
      <BlogSection />
    </>
  );
}