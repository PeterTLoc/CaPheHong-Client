"use client"

import { HeroSection } from "@/components/home/HeroSection"
import { FeaturesSection } from "@/components/home/FeaturesSection"
import { CTASection } from "@/components/home/CTASection"

export default function Home() {
  return (
    <div className="relative">
      {/* Parallax Background */}
      <div 
        className="fixed top-[84px] inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          height: "calc(100vh - 84px)",
          backgroundImage: "url('/images/cover.jpeg')",
          transform: "translateZ(0)",
        }}
      />
      
      {/* Overlay for better readability */}
      <div className="fixed inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </div>
    </div>
  )
}
