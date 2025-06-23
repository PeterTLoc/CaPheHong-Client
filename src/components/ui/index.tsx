"use client"

import Link from "next/link"

const SidebarOwner = () => {
  return (
    <>
      <Link className="sidebar-link" href="/dashboard">Dashboard Overview</Link>
      <Link className="sidebar-link" href="/dashboard/shops">Manage Shops</Link>
      <Link className="sidebar-link" href="/dashboard/shops/new">Create New Shop</Link>
      <Link className="sidebar-link" href="/dashboard/orders">View Orders</Link>
      <Link className="sidebar-link" href="/dashboard/settings">Business Settings</Link>
    </>
  )
}

export default SidebarOwner
