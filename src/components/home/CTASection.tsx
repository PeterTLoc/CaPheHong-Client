"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export const CTASection = () => {
  return (
    <section className="flex items-center text-white" style={{ height: "calc(100vh - 84px)" }}>
      <div className="max-w-[1625px] mx-auto px-4 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[42px] font-medium text-white mb-4">
            Ready to Discover Your Perfect Coffee?
          </h2>
          <p className="text-[15px] text-[#BFBFBF] mb-8 max-w-2xl mx-auto">
            Join thousands of coffee lovers who have found their favorite
            spots through CaPheHong
          </p>
          <Link
            className="text-[13px] inline-flex items-center justify-center gap-2 px-3 min-w-[130px] min-h-[32px] pt-[5px] pb-[3px] rounded-[5px] transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] hover:bg-white text-[#6F4E37] font-semibold"
            href="/shops"
          >
            Start Exploring
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 