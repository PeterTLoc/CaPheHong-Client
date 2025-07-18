"user client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { CircleUserRound, Crown, LogOut, Menu, Search } from "lucide-react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export const Navbar = () => {
  const pathname = usePathname()
  const { user, loading, logout } = useAuth()
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const links = [
    { href: "/", label: "Home" },
    { href: "/shops", label: "Shops" },
    { href: "/posts", label: "Posts" },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node

      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(target)
      ) {
        setProfileDropdownOpen(false)
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMobileMenuOpen(false)
      }
    }

    if (isProfileDropdownOpen || isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isProfileDropdownOpen, isMobileMenuOpen])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-[84px] bg-[#FBFBFB] border-b border-b-[#E5E5E5]">
      <div className="flex justify-between items-center h-full px-4 sm:px-8 lg:px-9">
        <div className="flex gap-4 items-center">
          <div className="relative lg:hidden">
            <button
              className="flex items-center"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              <Menu />
            </button>

            <div
              ref={mobileMenuRef}
              className={`text-[13px] fixed bottom-0 left-0 h-full  p-1 bg-[#FBFBFB] border border-t-[#FBFBFB] border-l-[#FBFBFB] border-b-[#FBFBFB] border-r-[#E5E5E5] z-50 transition-transform duration-300 ease-in-out transform ${
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
              style={{ height: "calc(100vh - 5.25rem)" }}
            >
              <div className="flex flex-col">
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`rounded-[5px] w-[280px] h-9 flex gap-[14px] px-[10px] items-center hover:bg-[#EAEAEA] ${
                      pathname === href
                        ? "text-[#6F4E37] font-semibold underline"
                        : ""
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pr-7">
            <Link href="/" className="flex items-center">
              <img
                src="/images/logoCaPhe.png"
                alt="Ca Phe Hong Logo"
                className="h-10 w-auto"
              />
              <div className="flex items-end gap-2.5">
                <span className="text-xl font-bold">CaPheHong</span>
                <span className="text-lg text-[#8C8C8C]">|</span>
                <span>Site</span>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex pt-[9px] text-xs scale-x-115 flex-wrap">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className="px-5">
                <span
                  className={` inline-block border-b-2 pb-[5px] ${
                    pathname === href
                      ? "border-[#6F4E37] text-[#6F4E37] font-medium"
                      : "border-transparent text-[#5E5E5E]"
                  }`}
                >
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="lg:hidden">
            <Search strokeWidth={1} />
          </button>

          <div className="hidden lg:block">
            <div className="relative">
              <input placeholder="Enter a shop" className="input" />
              <Search
                size={14}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              />
            </div>
          </div>

          {!loading && user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className="flex items-center"
              >
                {/* Replace with <Image /> or actual image URL */}
                <CircleUserRound strokeWidth={0.75} size={32} />
              </button>

              {isProfileDropdownOpen && (
                <div
                  ref={profileDropdownRef}
                  className="text-[13px] absolute right-0 mt-2 p-1 bg-[#FBFBFB] border border-[#E5E5E5] rounded-[5px] shadow-lg z-50"
                >
                  <Link
                    href={user?.role === "guest" ? "/profile" : "/dashboard"}
                    onClick={() => setProfileDropdownOpen(false)}
                    className="rounded-[5px] w-[280px] h-9 flex gap-[14px] px-[10px] items-center hover:bg-[#EAEAEA]"
                  >
                    <CircleUserRound strokeWidth={1} size={20} />
                    <span className="pt-[10px] pb-[6px]">
                      {user?.role === "guest" ? "Profile" : "Dashboard"}
                    </span>
                  </Link>

                  <Link
                    href="/upgrade-plan"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="rounded-[5px] w-[280px] h-9 flex gap-[14px] px-[10px] items-center hover:bg-[#EAEAEA]"
                  >
                    <Crown strokeWidth={1} size={20} />
                    <div className="pt-[10px] pb-[6px]">Upgrade plan</div>
                  </Link>

                  <button
                    onClick={logout}
                    className="rounded-[5px] w-[280px] h-9 flex gap-[14px] px-[10px] items-center hover:bg-[#EAEAEA]"
                  >
                    <LogOut strokeWidth={1} size={20} />
                    <div>Logout</div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            !loading && (
              <Link href="/login">
                <button
                  className="flex items-center justify-center gap-1 text-white px-4 w-fit min-h-[33px] rounded-[5px] text-[13px] bg-[#6F4E37] hover:opacity-75"
                  type="submit"
                >
                  <CircleUserRound strokeWidth={1.5} />
                  <span className="pt-[5px] pb-[3px] whitespace-nowrap">
                    Sign in
                  </span>
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  )
}
