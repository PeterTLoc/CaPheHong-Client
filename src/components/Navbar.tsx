"user client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { CircleUserRound, Crown, LogOut, Menu, Search } from "lucide-react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

type ProfileDropdownProps = {
  logout: () => void
}

export const Navbar = () => {
  const pathname = usePathname()
  const { user, loading, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const links = [
    { href: "/", label: "Home" },
    { href: "/link1", label: "Link1" },
    { href: "/link2", label: "Link2" },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-50 h-[5.25rem] bg-[#FBFBFB] border-b border-b-[#E5E5E5]">
      <div className="flex justify-between items-center h-full px-4 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center">
          <img
            src="/images/logoCaPhe.png"
            alt="Ca Phe Hong Logo"
            className="h-10 w-auto"
          />
          <div className="flex items-end gap-3">
            <span className="text-xl font-bold">CaPheHong</span>
            <span>|</span>
            <span>Site</span>
          </div>
        </Link>

        <div className="hidden lg:flex text-sm">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:underline px-5 ${
                pathname === href
                  ? "text-[#6F4E37] font-semibold underline"
                  : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="lg:hidden">
            <Menu size={22} />
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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center"
              >
                {/* Replace with <Image /> or actual image URL */}
                <CircleUserRound strokeWidth={0.75} size={32} />
              </button>

              {isOpen && (
                <div className="text-[13px] absolute right-0 mt-2 p-1 bg-[#FBFBFB] border border-[#E5E5E5] rounded-[5px] shadow-lg z-50">
                  <Link
                    href="/profile"
                    className="rounded-[5px] w-[280px] h-9 flex gap-[14px] px-[10px] items-center  hover:bg-[#EAEAEA]"
                  >
                    <CircleUserRound strokeWidth={1} size={20} />
                    <div className="pt-[10px] pb-[6px]">Profile</div>
                  </Link>

                  <Link
                    href="/upgrade-plan"
                    className="rounded-[5px] w-[280px] h-9 flex gap-[14px] px-[10px] items-center  hover:bg-[#EAEAEA]"
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
              <Link href="/signin">
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
