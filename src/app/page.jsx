import React from 'react';
import { getTeamMembers } from '@/app/actions/team';
import Hero from '@/components/Hero';
import About from '@/components/About';
import TickerSlider from '@/components/Slider';
import ExploreSection from '@/components/Explore';
import ServicesSection from '@/components/Services';
import ShowcaseSection from '@/components/Showcase';
import TeamSection from '@/components/Members';
import ReviewSection from '@/components/Review';
import BlogSection from '@/components/Blog';

const BACKGROUND_VIDEO_URL =
    "https://res.cloudinary.com/gd78bssj/video/upload/v1788228588/0_Fun_Geometry_3840x2160.mp4";

export default async function HomePage() {
    const teamMembers = await getTeamMembers();

    return (
        <>
            <div className="relative min-h-fit lg:min-h-screen bg-[#a0b8c8] overflow-hidden">

                {/* Background Video */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ overflow: 'clip' }}
                >

                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover scale-105"
                    >
                        <source
                            src={BACKGROUND_VIDEO_URL}
                            type="video/mp4"
                        />
                    </video>

                    <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[0.5px]" />

                </div>

                {/* Hero Content */}
                <div className="relative z-10">
                    <Hero />
                </div>

            </div>

            <About />
            <TickerSlider />
            <ExploreSection />
            <ServicesSection />
            <ShowcaseSection />
            <TeamSection members={teamMembers} />
            <ReviewSection />
            <BlogSection />
        </>
    );
}