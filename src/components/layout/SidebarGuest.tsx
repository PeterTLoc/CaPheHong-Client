"use client"

import Link from "next/link"

const SidebarGuest = () => {
  return (
    <>
      <Link className="sidebar-link" href="/profile">Overview</Link>
      <Link className="sidebar-link" href="/profile/orders">Orders</Link>
      <Link className="sidebar-link" href="/profile/favorites">Favorites</Link>
      <Link className="sidebar-link" href="/profile/reviews">Reviews</Link>
      <Link className="sidebar-link" href="/profile/settings">Account Settings</Link>
    </>
  )
}

export default SidebarGuest
