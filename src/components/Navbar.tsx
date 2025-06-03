import React from "react"
import Link from "next/link"
import { CircleUserRound, Search } from "lucide-react"
import { usePathname } from "next/navigation"

export const Navbar = () => {
  const pathname = usePathname()
  const links = [
    { href: "/", label: "Home" },
    { href: "/link1", label: "Link1" },
    { href: "/link2", label: "Link2" },
  ]

  return (
    <nav className="sticky top-0 z-50 h-[5.25rem] bg-[#FBFBFB] border-b border-b-[#E5E5E5]">
      <div className="flex justify-between items-center h-full px-12">
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

        <div className="flex text-sm">
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
          <div>
            {/* <button className="block lg:hidden">
              <Search size={20}/>
            </button> */}

            {/* <input className="input hidden lg:block" placeholder="Enter a shop"></input> */}
            <div className="relative">
              <input
                placeholder="Enter a shop"
                className="input"
              />
              <Search
                size={14}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              />
            </div>
          </div>

          <Link href="/signin">
            <button
              className="flex items-center justify-center gap-1 text-white px-4 w-fit min-h-[33px] rounded-[5px] text-[13px] bg-[#6F4E37] hover:opacity-75"
              type="submit"
            >
              <CircleUserRound strokeWidth={1.5} />
              <span className="pt-[5px] pb-[3px] whitespace-nowrap">Sign in</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
