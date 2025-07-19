"use client"

import Link from "next/link"

interface BreadcrumbProps {
  items: { label: string; href?: string }[]
}

const Breadcrumb = ({ items }: BreadcrumbProps) => (
  <nav className="flex items-center title mb-4" aria-label="Breadcrumb">
    {items.map((item, idx) => (
      <span key={idx} className="flex items-center">
        {item.href ? (
          <Link
            href={item.href}
            className="text-[#5F5F5F] hover:cursor-pointer hover:text-black"
          >
            {item.label}
          </Link>
        ) : (
          <span className="font-semibold text-[#222]">{item.label}</span>
        )}
        {idx < items.length - 1 && <span className="mx-4">›</span>}
      </span>
    ))}
  </nav>
)

export default Breadcrumb
