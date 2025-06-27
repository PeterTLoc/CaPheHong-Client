"use client"

import Link from "next/link"

const SidebarOwner = () => {
  return (
    <>
      <Link className="sidebar-link" href="/dashboard">Dashboard</Link>
      <Link className="sidebar-link" href="/dashboard/shops">Shops</Link>
      <Link className="sidebar-link" href="/dashboard/shops/new">Add Shop</Link>
      <Link className="sidebar-link" href="/dashboard/orders">Orders</Link>
      <Link className="sidebar-link" href="/dashboard/settings">Business Settings</Link>
    </>
  )
}

export default SidebarOwner
