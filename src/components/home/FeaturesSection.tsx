"use client"

import { motion } from "framer-motion"
import { MapPin, Star, Coffee } from "lucide-react"

const features = [
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Local Discovery",
    description: "Find hidden gems and popular spots near you",
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Curated Reviews",
    description: "Read authentic reviews from coffee enthusiasts",
  },
  {
    icon: <Coffee className="w-8 h-8" />,
    title: "Premium Experience",
    description: "Discover shops that prioritize quality and atmosphere",
  },
]

export const FeaturesSection = () => {
  return (
    <section className="flex items-center" style={{ height: "calc(100vh - 84px)" }}>
      <div className="max-w-[1625px] mx-auto px-4 w-full">
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[42px] font-medium text-white mb-4">Why Choose CaPheHong?</h2>
          <p className="text-[15px] text-[#BFBFBF] max-w-2xl mx-auto">
            Your gateway to discovering the best coffee experiences in your
            area
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-[#6F4E37] mb-6 flex justify-center">
                <div className="p-4 rounded-full bg-white/80 backdrop-blur-sm">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-[20px] font-medium text-white mb-3">{feature.title}</h3>
              <p className="text-[14px] text-[#BFBFBF] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 