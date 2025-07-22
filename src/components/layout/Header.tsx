"user client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CircleUserRound, Crown, LogOut, Menu, Search, Home, Store, Pencil, User, Star } from "lucide-react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"
import { fetchShops } from "@/services/shopService"
import { Shop } from "@/types/shop"

export const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading, logout } = useAuth()
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [shopResults, setShopResults] = useState<Shop[]>([])
  const [allShops, setAllShops] = useState<Shop[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isMobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  // Fetch all shops on mount or when search is focused
  useEffect(() => {
    if (allShops.length === 0) {
      fetchShops().then(setAllShops)
    }
  }, [])

  // Filter shops as user types
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setShopResults([])
      setShowDropdown(false)
      return
    }
    const results = allShops.filter(shop =>
      shop.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setShopResults(results)
    setShowDropdown(results.length > 0)
  }, [searchTerm, allShops])

  const handleShopSelect = (id: number) => {
    setSearchTerm("")
    setShowDropdown(false)
    setMobileSearchOpen(false)
    router.push(`/shops/${id}`)
  }

  const links = [
    { href: "/", label: "Home", icon: <Home size={18} strokeWidth={1.5} /> },
    { href: "/shops", label: "Shops", icon: <Store size={18} strokeWidth={1.5} /> },
    { href: "/posts", label: "Posts", icon: <Pencil size={18} strokeWidth={1.5} /> },
    { href: "/upgrade-plan", label: "Plans", icon: <Crown size={18} strokeWidth={1.5} /> },
  ];
  const mainLinks = links.slice(0, 4); // Home, Shops, Posts

  const handleMobileNavClick = (href: string) => {
    setMobileMenuOpen(false)
    router.push(href)
  }

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        isMobileSearchOpen
      ) {
        setMobileSearchOpen(false)
      }
    }
    if (isMobileSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileSearchOpen])

  // Click outside for both dropdowns
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!showDropdown) return
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      if (
        inputRef.current &&
        !inputRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setShowDropdown(false)
        setHighlightedIndex(-1)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showDropdown])

  // Keyboard navigation for both dropdowns
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || shopResults.length === 0) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex(idx => (idx + 1) % shopResults.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex(idx => (idx - 1 + shopResults.length) % shopResults.length)
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && highlightedIndex < shopResults.length) {
        handleShopSelect(shopResults[highlightedIndex].id)
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false)
      setHighlightedIndex(-1)
    }
  }

  // Reset highlight on search change
  useEffect(() => { setHighlightedIndex(-1) }, [searchTerm, showDropdown])

  return (
    <>
      {/* Overlay search bar for mobile search */}
      {isMobileSearchOpen && (
        <div className="fixed top-0 left-0 w-full h-[84px] bg-[#FBFBFB] border-b border-b-[#E5E5E5] z-[100] flex items-center justify-center px-4">
          <div className="relative w-full max-w-[400px] flex items-center justify-center">
            <input
              ref={inputRef}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onFocus={() => setShowDropdown(shopResults.length > 0)}
              onKeyDown={handleKeyDown}
              placeholder="Search shops..."
              className="input border-brown-700 border focus:border-brown-700 w-full text-[13px] bg-[#FBFBFB] rounded-[5px] shadow pr-10"
              autoFocus
              style={{ height: 33 }}
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer focus:outline-none rounded-[5px] transition-colors hover:bg-gray-200 flex items-center justify-center"
              aria-label="Close search"
              onClick={() => setMobileSearchOpen(false)}
              style={{ height: 20, width: 20, padding: 0 }}
            >
              <span style={{ fontSize: 14, width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 400 }}>
                ×
              </span>
            </button>
            {/* Dropdown below input, relative to input */}
            {showDropdown && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute left-0 top-full max-w-[400px] w-full bg-white border border-[#E5E5E5] rounded-[5px] shadow max-h-60 overflow-auto overflow-x-hidden z-[110] flex flex-col"
              >
                {shopResults.map((shop, i) => (
                  <button
                    key={shop.id}
                    className={`block w-full text-left px-3 py-2 rounded-[5px] cursor-pointer text-[13px] ${highlightedIndex === i ? 'bg-[#F3F3F3]' : 'hover:bg-[#F3F3F3]'}`}
                    onClick={() => handleShopSelect(shop.id)}
                    onMouseEnter={() => setHighlightedIndex(i)}
                  >
                    {shop.title}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      )}

      <nav className="fixed top-0 left-0 w-full z-50 h-[84px] bg-[#FBFBFB] border-b border-b-[#E5E5E5]">
        <div className="flex justify-between items-center h-full px-4 sm:px-8 lg:px-9">
          <div className="flex gap-4 items-center">
            {/* Burger/menu icon for mobile nav */}
            <div className="relative flex items-center lg:hidden">
              <button
                className="flex items-center cursor-pointer"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
              >
                <Menu />
              </button>
              {/* Mobile menu dropdown as full-height sidebar */}
              <AnimatePresence>
                {isMobileMenuOpen && (
                  <>
                    {/* Overlay with blur */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="fixed inset-0 bg-white/40 backdrop-blur-sm z-[99]"
                      onClick={() => setMobileMenuOpen(false)}
                    />
                    {/* Sidebar */}
                    <motion.div
                      ref={mobileMenuRef}
                      initial={{ x: '-100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '-100%' }}
                      transition={{ type: 'tween', duration: 0.25 }}
                      className="fixed top-0 left-0 h-full w-[80vw] max-w-[320px] bg-[#FBFBFB] border-r border-[#E5E5E5] rounded-r-[5px] shadow z-[100] flex flex-col"
                    >
                      <div className="flex items-center justify-between px-4 py-4 border-b border-[#E5E5E5]">
                        <span className="font-bold text-lg">Menu</span>
                        <button
                          className="text-2xl text-gray-700 hover:text-black cursor-pointer rounded-[5px] px-2 py-1"
                          onClick={() => setMobileMenuOpen(false)}
                          aria-label="Close menu"
                        >
                          ×
                        </button>
                      </div>
                      <div className="flex flex-col p-1 gap-1 flex-1">
                        {links.map(({ href, label, icon }) => (
                          <button
                            key={href}
                            onClick={() => handleMobileNavClick(href)}
                            className={`sidebar-link w-full flex gap-[14px] items-center text-left cursor-pointer ${
                              pathname === href
                                ? "text-[#6F4E37] font-semibold"
                                : ""
                            }`}
                          >
                            {icon}
                            <span className="sidebar-link-text">{label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            {/* Logo and nav: always visible */}
            <div className="flex pr-7 items-center">
              <Link href="/" className="flex items-center cursor-pointer">
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
              {mainLinks.map(({ href, label }) => (
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
            {/* Desktop search input only visible on lg and up */}
            <div className="hidden lg:flex items-center w-full max-w-[320px] relative justify-center">
              <input
                ref={inputRef}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onFocus={() => setShowDropdown(shopResults.length > 0)}
                onKeyDown={handleKeyDown}
                placeholder="Search shops..."
                className="input border-brown-700 border focus:border-brown-700 w-full text-[13px] bg-[#FBFBFB] rounded-[5px] shadow"
              />
              <Search
                size={16}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6F4E37]"
              />
              {showDropdown && (
                <motion.div
                  ref={dropdownRef}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute left-0 top-full w-full bg-white border border-[#E5E5E5] rounded-[5px] shadow max-h-60 overflow-auto overflow-x-hidden z-[110] flex flex-col"
                >
                  {shopResults.map((shop, i) => (
                    <button
                      key={shop.id}
                      className={`block w-full text-left px-3 py-2 rounded-[5px] cursor-pointer text-[13px] ${highlightedIndex === i ? 'bg-[#F3F3F3]' : 'hover:bg-[#F3F3F3]'}`}
                      onClick={() => handleShopSelect(shop.id)}
                      onMouseEnter={() => setHighlightedIndex(i)}
                    >
                      {shop.title}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            {/* Mobile search icon/input next to profile/login, only visible on mobile */}
            <div className="flex items-center gap-2 block lg:hidden relative">
              <button
                className="cursor-pointer flex items-center"
                onClick={() => setMobileSearchOpen((prev) => !prev)}
                style={{ height: 33 }}
              >
                <Search strokeWidth={1} size={20} />
              </button>
            </div>

            {!loading && user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  className="flex items-center cursor-pointer"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover border border-[#E5E5E5] bg-white"
                    />
                  ) : (
                    <CircleUserRound strokeWidth={0.75} size={32} />
                  )}
                </button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      ref={profileDropdownRef}
                      initial={{
                        y: -4,
                        opacity: 0.8,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                      }}
                      exit={{
                        y: -4,
                        opacity: 0.8,
                      }}
                      transition={{
                        duration: 0.15,
                        ease: "easeOut",
                      }}
                      className="text-[13px] absolute right-0 mt-2 p-1 bg-[#FBFBFB] border border-[#E5E5E5] rounded-[5px] shadow-lg z-50"
                    >
                      <Link
                        href={user?.role === "guest" ? "/profile" : "/dashboard/shops"}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="rounded-[5px] w-[280px] h-9 flex gap-[14px] px-[10px] items-center hover:bg-[#EAEAEA]"
                      >
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt="Avatar"
                            className="w-5 h-5 rounded-full object-cover border border-[#E5E5E5] bg-white"
                          />
                        ) : (
                          <CircleUserRound strokeWidth={1} size={20} />
                        )}
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
                        <div className="pt-[10px] pb-[6px]">Upgrade Plans</div>
                      </Link>

                      <button
                        onClick={logout}
                        className="rounded-[5px] w-[280px] h-9 flex gap-[14px] px-[10px] items-center hover:bg-[#EAEAEA]"
                      >
                        <LogOut strokeWidth={1} size={20} />
                        <div>Logout</div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              !loading && (
                <Link href="/login">
                  <button
                    className="cursor-pointer flex items-center justify-center gap-1 text-white px-4 w-fit min-h-[33px] rounded-[5px] text-[13px] bg-[#6F4E37] hover:opacity-75"
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
    </>
  )
}
