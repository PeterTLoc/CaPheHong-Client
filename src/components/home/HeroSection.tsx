"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export const HeroSection = () => {
  return (
    <div
      className="w-full overflow-hidden relative flex items-center"
      style={{
        height: "calc(100vh - 84px)",
      }}
    >
      <div className="max-w-[1625px] mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          <div className="flex justify-center p-9">
            <motion.main 
              className="text-white flex flex-col justify-center max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-[48px] leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              >
                Experience the Richness of{" "}
                <span className="text-[#6F4E37]">Perfect Coffee</span>
              </motion.h1>
              
              <motion.p 
                className="text-[15px] mt-[6px] text-[#BFBFBF] leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                Discover the finest coffee shops in your area. From artisanal
                brews to cozy atmospheres, find your perfect coffee
                experience.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-5 mt-[44px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                <Link
                  className="text-[13px] flex items-center justify-center gap-2 px-3 min-w-[130px] min-h-[32px] pt-[5px] pb-[3px] rounded-[5px] transition-all duration-300 group bg-[#6F4E37]/90 backdrop-blur-sm shadow-[0_0_20px_rgba(111,78,55,0.4)] hover:shadow-[0_0_25px_rgba(111,78,55,0.6)] hover:bg-[#6F4E37] text-white"
                  href="/shops"
                >
                  Browse Coffee Shops
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

                <Link
                  className="text-[13px] flex items-center justify-center gap-2 px-3 min-w-[130px] min-h-[32px] pt-[5px] pb-[3px] rounded-[5px] transition-all duration-300 bg-[#FEFEFE]/80 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:bg-[#FEFEFE] text-black"
                  href="/posts"
                >
                  Read Reviews
                </Link>
              </motion.div>
            </motion.main>
          </div>
        </div>
      </div>
    </div>
  )
} 