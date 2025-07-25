"use client"

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-[#FBFBFB] text-[#5E5E5E] py-3 relative z-20 border-t border-t-[#E5E5E5] mt-5">
      <div className="max-w-[1625px] mx-auto px-4 text-center">
        <p className="text-[#5E5E5E] text-xs">
          © {currentYear} CaPheHong. All rights reserved.
        </p>
      </div>
    </footer>
  )
} 